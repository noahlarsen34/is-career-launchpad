(function () {
    const MINIMUM_WORDS = 20;
    const STRONG_WORDS = 70;

    function normalize(text) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9()\-\s]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    function containsTerm(answer, term) {
        return answer.includes(normalize(term));
    }

    function scoreAnswer(question, response) {
        const normalizedAnswer = normalize(response || "");
        const isModelAnswer = normalizedAnswer === normalize(question?.strongAnswer || "");
        const words = normalizedAnswer ? normalizedAnswer.split(" ") : [];
        const concepts = question?.concepts || [];
        const matchedConcepts = concepts.filter((concept) =>
            concept.terms.some((term) => containsTerm(normalizedAnswer, term))
        );
        const missingConcepts = concepts.filter((concept) => !matchedConcepts.includes(concept));

        const conceptScore = concepts.length
            ? Math.round((matchedConcepts.length / concepts.length) * 70)
            : 0;
        const detailScore = Math.min(15, Math.round((words.length / STRONG_WORDS) * 15));
        const explanationSignals = ["because", "for example", "so that", "then", "after", "result"];
        const explanationCount = explanationSignals.filter((signal) => normalizedAnswer.includes(signal)).length;
        const clarityScore = Math.min(15, explanationCount * 4 + (words.length >= MINIMUM_WORDS ? 3 : 0));
        const score = isModelAnswer ? 100 : Math.min(100, conceptScore + detailScore + clarityScore);

        const strengths = [];
        const improvements = [];

        if (matchedConcepts.length) {
            strengths.push(`You addressed ${matchedConcepts.map((item) => item.label).join(", ")}.`);
        }

        if (words.length >= STRONG_WORDS) {
            strengths.push("Your answer included enough detail to show your reasoning.");
        } else if (words.length < MINIMUM_WORDS) {
            improvements.push("Develop the answer further; aim for at least a few complete sentences.");
        } else {
            improvements.push("Add one concrete example, decision, or outcome to make the answer more specific.");
        }

        if (missingConcepts.length && !isModelAnswer) {
            improvements.push(`Address these important ideas: ${missingConcepts.map((item) => item.label).join(", ")}.`);
        }

        if (explanationCount < 2) {
            improvements.push("Explain why you would take each major step and what you would verify afterward.");
        }

        if (!strengths.length) {
            strengths.push("You attempted the question; use the criteria below to make the next version stronger.");
        }

        return {
            score,
            matchedConcepts: matchedConcepts.map((item) => item.label),
            missingConcepts: missingConcepts.map((item) => item.label),
            strengths,
            improvements,
            strongAnswer: question?.strongAnswer || ""
        };
    }

    function questionsForRole(roleId, type = "all") {
        const questions = window.launchpadData?.roleInterviewQuestions || [];

        return questions.filter((question) =>
            question.roleId === roleId && (type === "all" || question.type === type)
        );
    }

    window.interviewScoring = {
        questionsForRole,
        scoreAnswer
    };
})();
