(function () {
    const grid = document.querySelector("#careerGrid");
    const search = document.querySelector("#careerSearch");
    const careers = window.launchpadData?.careers || [];

    if (!grid) {
        return;
    }

    function careerMatches(career, query) {
        const searchableText = [
            career.title,
            career.summary,
            career.setting,
            career.timeline,
            career.skills.join(" ")
        ].join(" ").toLowerCase();

        return searchableText.includes(query);
    }

    function renderCareers(query = "") {
        const normalizedQuery = query.trim().toLowerCase();
        const filteredCareers = careers.filter((career) => careerMatches(career, normalizedQuery));

        if (filteredCareers.length === 0) {
            grid.innerHTML = '<p class="empty-state">No matching career paths yet. Try another keyword.</p>';
            return;
        }

        grid.innerHTML = filteredCareers.map((career) => `
            <article class="career-card">
                <div>
                    <p class="eyebrow">${career.setting}</p>
                    <h2>${career.title}</h2>
                </div>
                <p>${career.summary}</p>
                <div class="career-meta">
                    <span>${career.timeline}</span>
                </div>
                <div class="skill-list" aria-label="Important skills for ${career.title}">
                    ${career.skills.map((skill) => `<span class="skill-pill">${skill}</span>`).join("")}
                </div>
            </article>
        `).join("");
    }

    search?.addEventListener("input", (event) => {
        renderCareers(event.target.value);
    });

    renderCareers();
})();
