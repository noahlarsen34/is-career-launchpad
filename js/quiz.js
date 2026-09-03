(function () {
    const checklist = document.querySelector("#prepChecklist");
    const items = window.launchpadData?.checklist || [];

    if (!checklist) {
        return;
    }

    checklist.innerHTML = items.map((item, index) => `
        <label class="quiz-item">
            <input type="checkbox" name="prep-check-${index}">
            <span>${item}</span>
        </label>
    `).join("");
})();
