(function () {
    const MINIMUM_WORDS = 20;
    const STRONG_WORDS = 70;
    const SYNONYM_GROUPS = [
        ["test", "check", "verify", "validate", "confirm"],
        ["result", "outcome", "impact", "improvement"],
        ["stakeholder", "client", "customer", "user", "owner"],
        ["log", "telemetry", "audit", "evidence"],
        ["problem", "issue", "failure", "error", "bug"],
        ["document", "record", "write", "capture"],
        ["remove", "revoke", "disable", "restrict"],
        ["risk", "threat", "exposure", "vulnerability"],
        ["goal", "objective", "purpose", "need"],
        ["measure", "metric", "number", "quantify"]
    ];

    function normalize(text) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9()\-\s]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    function stem(token) {
        if (token.length > 6 && token.endsWith("ing")) return token.slice(0, -3);
        if (token.length > 5 && token.endsWith("ed")) return token.slice(0, -2);
        if (token.length > 5 && token.endsWith("es")) return token.slice(0, -2);
        if (token.length > 4 && token.endsWith("s")) return token.slice(0, -1);
        return token;
    }

    function editDistance(left, right) {
        const row = Array.from({ length: right.length + 1 }, (_, index) => index);

        for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
            let diagonal = row[0];
            row[0] = leftIndex;

            for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
                const previous = row[rightIndex];
                row[rightIndex] = Math.min(
                    row[rightIndex] + 1,
                    row[rightIndex - 1] + 1,
                    diagonal + (left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1)
                );
                diagonal = previous;
            }
        }

        return row[right.length];
    }

    function equivalentToken(answerToken, termToken) {
        const answerStem = stem(answerToken);
        const termStem = stem(termToken);

        if (answerStem === termStem) return true;

        const synonymGroup = SYNONYM_GROUPS.find((group) => group.includes(termStem));
        if (synonymGroup?.includes(answerStem)) return true;

        return answerStem.length >= 5 && termStem.length >= 5 && editDistance(answerStem, termStem) <= 1;
    }

    function containsTerm(answer, term) {
        const normalizedTerm = normalize(term);

        if (answer.includes(normalizedTerm)) return true;

        const answerTokens = answer.split(" ").filter(Boolean);
        const termTokens = normalizedTerm.split(" ").filter(Boolean);

        return termTokens.every((termToken) =>
            answerTokens.some((answerToken) => equivalentToken(answerToken, termToken))
        );
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
        const durationTarget = question?.durationSeconds || null;
        const estimatedDurationSeconds = durationTarget && words.length
            ? Math.round(words.length / 2.17)
            : null;
        const durationPenalty = estimatedDurationSeconds &&
            (estimatedDurationSeconds < durationTarget.minimum || estimatedDurationSeconds > durationTarget.maximum)
            ? 10
            : 0;
        const score = isModelAnswer
            ? 100
            : Math.max(0, Math.min(100, conceptScore + detailScore + clarityScore - durationPenalty));

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

        if (estimatedDurationSeconds !== null) {
            if (estimatedDurationSeconds >= durationTarget.minimum && estimatedDurationSeconds <= durationTarget.maximum) {
                strengths.push("Your estimated speaking time is within the 30–60 second elevator-pitch target.");
            } else if (estimatedDurationSeconds < durationTarget.minimum) {
                improvements.push("Your pitch may be under 30 seconds. Add one relevant example and connect it to the role.");
            } else {
                improvements.push("Your pitch may exceed 60 seconds. Keep only the experience and strengths most relevant to the role.");
            }
        }

        if (!strengths.length) {
            strengths.push("You attempted the question; use the criteria below to make the next version stronger.");
        }

        return {
            score,
            label: "Automated practice score",
            disclaimer: "This score uses concept and answer-structure rules. It is not AI analysis or a hiring prediction.",
            estimatedDurationSeconds,
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
            (question.roleId === roleId || question.roleId === "all") &&
            (type === "all" || question.type === type)
        );
    }

    window.interviewScoring = {
        questionsForRole,
        scoreAnswer
    };
})();
