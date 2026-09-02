(function () {
    const list = document.querySelector("#questionList");
    const typeFilter = document.querySelector("#questionType");
    const questions = window.launchpadData?.interviewQuestions || [];

    if (!list) {
        return;
    }

    function renderQuestions(type = "all") {
        const filteredQuestions = questions.filter((item) => type === "all" || item.type === type);

        list.innerHTML = filteredQuestions.map((item) => `
            <article class="question-card">
                <span class="question-type">${item.type}</span>
                <h2>${item.question}</h2>
                <p>${item.tip}</p>
            </article>
        `).join("");
    }

    typeFilter?.addEventListener("change", (event) => {
        renderQuestions(event.target.value);
    });

    renderQuestions();
})();
