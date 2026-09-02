(function () {
    const params = new URLSearchParams(window.location.search);
    const roles = window.launchpadData?.interviewRoles || [];
    const roleId = params.get("role") || roles[0]?.id;
    const role = roles.find((item) => item.id === roleId) || roles[0];
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const meetingTitle = document.querySelector("#meetingTitle");
    const questionStatus = document.querySelector("#questionStatus");
    const connectionStatus = document.querySelector("#connectionStatus");
    const mainVideo = document.querySelector("#mainVideo");
    const speakerContent = document.querySelector("#speakerContent");
    const speakerLine = document.querySelector("#speakerLine");
    const feedbackZone = document.querySelector("#feedbackZone");
    const characterFace = document.querySelector("#characterFace");
    const screenSharePreview = document.querySelector("#screenSharePreview");
    const participantTile = document.querySelector("#participantTile");
    const participantStatus = document.querySelector("#participantStatus");
    const tileAvatar = document.querySelector("#tileAvatar");
    const chatPanel = document.querySelector("#chatPanel");
    const chatLog = document.querySelector("#chatLog");
    const chatForm = document.querySelector("#chatForm");
    const chatInput = document.querySelector("#chatInput");
    const submitAnswer = document.querySelector("#submitAnswer");
    const chatCount = document.querySelector("#chatCount");
    const micStatus = document.querySelector("#micStatus");
    const muteButton = document.querySelector("#muteButton");
    const cameraButton = document.querySelector("#cameraButton");
    const participantsButton = document.querySelector("#participantsButton");
    const chatButton = document.querySelector("#chatButton");
    const shareButton = document.querySelector("#shareButton");

    let questionIndex = 0;
    let results = [];
    let recognition = null;
    let isMuted = true;
    let isListening = false;
    let isCameraOff = false;
    let isSharing = false;
    let isComplete = false;
    let awaitingNext = false;
    let chatMessages = 2;
    let moodTimer = null;

    function shuffled(items) {
        const copy = [...items];

        for (let index = copy.length - 1; index > 0; index -= 1) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
        }

        return copy;
    }

    function buildSession() {
        const allQuestions = window.launchpadData?.roleInterviewQuestions || [];
        const technical = allQuestions.filter((item) => item.roleId === role?.id && item.type === "technical");
        const roleBehavioral = allQuestions.filter((item) => item.roleId === role?.id && item.type === "behavioral");
        const sharedBehavioral = allQuestions.filter((item) => item.roleId === "all");

        return shuffled([
            ...shuffled(technical).slice(0, 2),
            ...shuffled(roleBehavioral).slice(0, 1),
            ...shuffled(sharedBehavioral).slice(0, 1)
        ]);
    }

    let questions = buildSession();

    if (!role || questions.length !== 4 || !window.interviewScoring) {
        return;
    }

    function postChat(author, message, isUser) {
        const item = document.createElement("div");
        const name = document.createElement("strong");
        const text = document.createElement("p");

        item.className = isUser ? "chat-message you" : "chat-message";
        name.textContent = author;
        text.textContent = message;
        item.append(name, text);
        chatLog.appendChild(item);
        chatLog.scrollTop = chatLog.scrollHeight;
        chatMessages += 1;
        chatCount.textContent = chatMessages;
    }

    function setMood(score) {
        window.clearTimeout(moodTimer);
        characterFace.classList.remove("is-happy", "is-thinking", "is-concerned");

        if (typeof score !== "number") {
            return;
        }

        if (score >= 76) {
            characterFace.classList.add("is-happy");
        } else if (score >= 45) {
            characterFace.classList.add("is-thinking");
        } else {
            characterFace.classList.add("is-concerned");
        }

        moodTimer = window.setTimeout(() => {
            characterFace.classList.remove("is-happy", "is-thinking", "is-concerned");
        }, 2200);
    }

    function setComposerEnabled(enabled) {
        chatInput.disabled = !enabled;
        submitAnswer.disabled = !enabled;
    }

    function renderQuestion() {
        const question = questions[questionIndex];

        awaitingNext = false;
        mainVideo.classList.remove("has-feedback", "has-summary");
        questionStatus.textContent = `Question ${questionIndex + 1} of ${questions.length}`;
        speakerLine.textContent = question.question;
        feedbackZone.hidden = true;
        feedbackZone.innerHTML = "";
        characterFace.hidden = false;
        chatInput.value = "";
        submitAnswer.textContent = "Submit Answer";
        setComposerEnabled(true);
        setMood(null);
        postChat("Professor Parker", question.question, false);
        chatInput.focus();
    }

    function renderFeedback(result) {
        mainVideo.classList.add("has-feedback");
        speakerLine.textContent = "Interview feedback";
        feedbackZone.innerHTML = `
            <div class="feedback-heading">
                <span class="feedback-label">Question ${questionIndex + 1}</span>
                <strong class="feedback-score">${result.score}/100</strong>
            </div>
            <p class="feedback-disclaimer">Automated practice feedback—not AI analysis or a hiring prediction.</p>
            <p><strong>What worked</strong><br>${result.strengths.join(" ")}</p>
            <p><strong>Improve next</strong><br>${result.improvements.join(" ")}</p>
            <details>
                <summary>See a strong response</summary>
                <p>${result.strongAnswer}</p>
            </details>
            <button class="next-question" type="button" id="nextQuestion">
                ${questionIndex === questions.length - 1 ? "View summary" : "Next question"}
            </button>
        `;
        feedbackZone.hidden = false;
        feedbackZone.focus();
    }

    function summaryMarkup() {
        const average = Math.round(
            results.reduce((total, item) => total + item.result.score, 0) / results.length
        );
        const strongest = results.reduce((best, item) =>
            item.result.score > best.result.score ? item : best
        );
        const missing = results
            .flatMap((item) => item.result.missingConcepts)
            .filter((item, index, list) => list.indexOf(item) === index)
            .slice(0, 5);

        return `
            <div class="summary-score">
                <span>${average}</span>
                <small>average score</small>
            </div>
            <h2>${role.title} interview complete</h2>
            <p class="feedback-disclaimer">Scores are automated practice guidance, not AI analysis or a hiring prediction.</p>
            <p><strong>Strongest response</strong><br>${strongest.question.question} (${strongest.result.score}/100)</p>
            <p><strong>Practice next</strong><br>${missing.length ? missing.join(", ") : "Keep adding measurable outcomes and role-specific detail."}</p>
            <div class="question-results">
                ${results.map((item, index) => `
                    <span>Q${index + 1}<strong>${item.result.score}</strong></span>
                `).join("")}
            </div>
            <div class="summary-actions">
                <button class="next-question" type="button" id="restartInterview">Practice again</button>
                <a href="interviews.html">Choose another career</a>
            </div>
        `;
    }

    function finishInterview() {
        isComplete = true;
        awaitingNext = false;
        questionStatus.textContent = "Interview complete";
        mainVideo.classList.remove("has-feedback");
        mainVideo.classList.add("has-summary");
        speakerLine.textContent = "Session summary";
        characterFace.hidden = true;
        feedbackZone.innerHTML = summaryMarkup();
        feedbackZone.hidden = false;
        postChat("Professor Parker", "Interview complete. Your summary is in the feedback zone.", false);
        setComposerEnabled(false);
    }

    function submitResponse() {
        const response = chatInput.value.trim();

        if (!response || awaitingNext || isComplete) {
            return;
        }

        const question = questions[questionIndex];
        const result = window.interviewScoring.scoreAnswer(question, response);

        results.push({ question, result });
        postChat("You", response, true);
        postChat("Professor Parker", "I added detailed feedback to the main panel.", false);
        setComposerEnabled(false);
        setMood(result.score);
        renderFeedback(result);
        awaitingNext = true;
    }

    function nextQuestion() {
        if (!awaitingNext) {
            return;
        }

        if (questionIndex >= questions.length - 1) {
            finishInterview();
            return;
        }

        questionIndex += 1;
        renderQuestion();
    }

    function restartInterview() {
        questions = buildSession();
        questionIndex = 0;
        results = [];
        isComplete = false;
        mainVideo.classList.remove("has-summary");
        characterFace.hidden = false;
        renderQuestion();
    }

    function setupSpeechRecognition() {
        if (!SpeechRecognition) {
            micStatus.textContent = "Speech input is not available in this browser.";
            return;
        }

        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.addEventListener("start", () => {
            isListening = true;
            micStatus.textContent = "Listening...";
            muteButton.textContent = "Mute";
            isMuted = false;
        });

        recognition.addEventListener("end", () => {
            isListening = false;
            micStatus.textContent = "";
            isMuted = true;
            muteButton.textContent = "Unmute";
            muteButton.classList.add("is-danger");
        });

        recognition.addEventListener("result", (event) => {
            chatInput.value = Array.from(event.results)
                .map((result) => result[0].transcript)
                .join(" ");
        });
    }

    function toggleMute() {
        if (isMuted) {
            isMuted = false;
            muteButton.textContent = "Mute";
            muteButton.classList.remove("is-danger");

            if (recognition && !isListening) {
                try {
                    recognition.start();
                } catch (error) {
                    micStatus.textContent = "Speech input could not start in this browser.";
                }
            }
            return;
        }

        isMuted = true;
        muteButton.textContent = "Unmute";
        muteButton.classList.add("is-danger");
        if (recognition && isListening) recognition.stop();
    }

    function toggleCamera() {
        isCameraOff = !isCameraOff;
        tileAvatar.classList.toggle("is-off", isCameraOff);
        participantTile.classList.toggle("is-camera-off", isCameraOff);
        participantStatus.textContent = isCameraOff ? "Camera off" : "Camera on";
        cameraButton.textContent = isCameraOff ? "Start Video" : "Stop Video";
        cameraButton.classList.toggle("is-danger", isCameraOff);
    }

    function toggleShare() {
        isSharing = !isSharing;
        screenSharePreview.hidden = !isSharing;
        speakerContent.hidden = isSharing;
        shareButton.textContent = isSharing ? "Stop Share" : "Share Screen";
        shareButton.classList.toggle("is-active", isSharing);
        connectionStatus.textContent = isSharing ? "Sharing screen" : "Connected";
    }

    chatForm.addEventListener("submit", (event) => {
        event.preventDefault();
        submitResponse();
    });
    chatInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            submitResponse();
        }
    });
    feedbackZone.addEventListener("click", (event) => {
        if (event.target.closest("#nextQuestion")) nextQuestion();
        if (event.target.closest("#restartInterview")) restartInterview();
    });
    muteButton.addEventListener("click", toggleMute);
    cameraButton.addEventListener("click", toggleCamera);
    participantsButton.addEventListener("click", () => {
        participantTile.hidden = !participantTile.hidden;
        participantsButton.classList.toggle("is-active", !participantTile.hidden);
    });
    chatButton.addEventListener("click", () => {
        chatPanel.classList.toggle("is-hidden");
        chatButton.classList.toggle("is-active", !chatPanel.classList.contains("is-hidden"));
    });
    shareButton.addEventListener("click", toggleShare);

    meetingTitle.textContent = `${role.title} Mock Interview`;
    participantsButton.classList.add("is-active");
    muteButton.textContent = "Unmute";
    muteButton.classList.add("is-danger");
    setupSpeechRecognition();
    renderQuestion();
})();
