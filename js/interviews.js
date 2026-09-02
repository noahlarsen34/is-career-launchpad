(function () {
    const list = document.querySelector("#questionList");
    const roleFilter = document.querySelector("#careerRole");
    const typeFilter = document.querySelector("#questionType");
    const roles = window.launchpadData?.interviewRoles || [];

    if (!list || !roleFilter || !typeFilter || !window.interviewScoring) {
        return;
    }

    function renderRoleOptions() {
        roleFilter.innerHTML = roles.map((role) =>
            `<option value="${role.id}">${role.title}</option>`
        ).join("");
    }

    function feedbackMarkup(result) {
        return `
            <div class="feedback-heading">
                <h3>Practice score</h3>
                <span class="score-badge">${result.score}/100</span>
            </div>
            <p><strong>What worked:</strong> ${result.strengths.join(" ")}</p>
            <p><strong>Try next:</strong> ${result.improvements.join(" ")}</p>
            <details>
                <summary>Compare with a strong response</summary>
                <p>${result.strongAnswer}</p>
            </details>
        `;
    }

    function scoreResponse(event) {
        const button = event.target.closest("[data-score-question]");

        if (!button) {
            return;
        }

        const questionId = button.dataset.scoreQuestion;
        const question = window.launchpadData.roleInterviewQuestions.find((item) => item.id === questionId);
        const card = button.closest(".question-card");
        const response = card.querySelector("textarea").value;
        const feedback = card.querySelector(".answer-feedback");

        feedback.innerHTML = feedbackMarkup(window.interviewScoring.scoreAnswer(question, response));
        feedback.hidden = false;
        feedback.focus();
    }

    function renderQuestions() {
        const filteredQuestions = window.interviewScoring.questionsForRole(
            roleFilter.value,
            typeFilter.value
        );

        list.innerHTML = filteredQuestions.map((item) => `
            <article class="question-card">
                <span class="question-type">${item.type}</span>
                <h2>${item.question}</h2>
                <p>${item.tip}</p>
                <label class="answer-label" for="answer-${item.id}">Your response</label>
                <textarea id="answer-${item.id}" rows="6" placeholder="Type your interview answer here..."></textarea>
                <button class="button button-primary score-button" type="button" data-score-question="${item.id}">
                    Get practice feedback
                </button>
                <div class="answer-feedback" tabindex="-1" aria-live="polite" hidden></div>
            </article>
        `).join("");
    }

    roleFilter.addEventListener("change", renderQuestions);
    typeFilter.addEventListener("change", renderQuestions);
    list.addEventListener("click", scoreResponse);

    renderRoleOptions();
    renderQuestions();
})();
