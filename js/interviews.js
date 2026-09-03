(function () {
    const list = document.querySelector("#questionList");
    const roleFilter = document.querySelector("#careerRole");
    const typeFilter = document.querySelector("#questionType");
    const enterMockButton = document.querySelector("#enterMockInterview");
    const roleFocus = document.querySelector("#roleFocus");
    const studyProgress = document.querySelector("#studyProgress");
    const studyProgressBar = document.querySelector("#studyProgressBar");
    const roles = window.launchpadData?.interviewRoles || [];
    const careers = window.launchpadData?.careers || [];
    const reviewedQuestions = new Set();

    if (!list || !roleFilter || !typeFilter || !window.interviewScoring) {
        return;
    }

    function renderRoleOptions() {
        roleFilter.innerHTML = roles.map((role) =>
            `<option value="${role.id}">${role.title}</option>`
        ).join("");
    }

    function renderRoleFocus() {
        const selectedRole = roles.find((role) => role.id === roleFilter.value);
        const selectedCareer = careers.find((career) => career.title === selectedRole?.title);
        const skills = selectedCareer?.skills || [];

        roleFocus.textContent = skills.length
            ? `Focus on ${skills.slice(0, 3).join(", ")}.`
            : "Focus on role-specific decisions and measurable outcomes.";
    }

    function renderProgress(total) {
        const reviewed = [...reviewedQuestions].filter((id) =>
            list.querySelector(`[data-question-id="${id}"]`)
        ).length;
        const percent = total ? Math.round((reviewed / total) * 100) : 0;

        studyProgress.textContent = `${reviewed} of ${total} reviewed`;
        studyProgressBar.style.width = `${percent}%`;
    }

    function renderQuestions() {
        const filteredQuestions = window.interviewScoring.questionsForRole(
            roleFilter.value,
            typeFilter.value
        );

        list.innerHTML = `
            <div class="study-section-heading">
                <div>
                    <p class="eyebrow">Question playbook</p>
                    <h2>Know what a strong answer needs.</h2>
                </div>
                <span>${filteredQuestions.length} study prompts</span>
            </div>
            ${filteredQuestions.map((item, index) => `
                <article class="question-card study-card" data-question-id="${item.id}">
                    <div class="study-card-heading">
                        <div>
                            <span class="question-type">${item.type}</span>
                            <span class="question-number">Prompt ${index + 1}</span>
                        </div>
                        <label class="review-toggle">
                            <input type="checkbox" data-reviewed="${item.id}" ${reviewedQuestions.has(item.id) ? "checked" : ""}>
                            Reviewed
                        </label>
                    </div>
                    <h2>${item.question}</h2>
                    ${item.durationSeconds ? `<p class="duration-target">30–60 second elevator pitch</p>` : ""}
                    <p class="coach-tip"><strong>How to approach it:</strong> ${item.tip}</p>
                    <div class="concept-block">
                        <h3>Concepts to include</h3>
                        <div class="concept-list">
                            ${item.concepts.map((concept) => `<span>${concept.label}</span>`).join("")}
                        </div>
                    </div>
                    <details class="model-answer">
                        <summary>Reveal a strong example answer</summary>
                        <p>${item.strongAnswer}</p>
                    </details>
                </article>
            `).join("")}
        `;

        renderProgress(filteredQuestions.length);
    }

    function updateReviewed(event) {
        const checkbox = event.target.closest("[data-reviewed]");

        if (!checkbox) {
            return;
        }

        if (checkbox.checked) {
            reviewedQuestions.add(checkbox.dataset.reviewed);
        } else {
            reviewedQuestions.delete(checkbox.dataset.reviewed);
        }

        renderProgress(list.querySelectorAll("[data-question-id]").length);
    }

    function changeRole() {
        reviewedQuestions.clear();
        renderRoleFocus();
        renderQuestions();
    }

    function openMockInterview() {
        window.location.href = `mock-interview.html?role=${encodeURIComponent(roleFilter.value)}`;
    }

    roleFilter.addEventListener("change", changeRole);
    typeFilter.addEventListener("change", renderQuestions);
    list.addEventListener("change", updateReviewed);
    enterMockButton?.addEventListener("click", openMockInterview);

    renderRoleOptions();
    renderRoleFocus();
    renderQuestions();
})();
