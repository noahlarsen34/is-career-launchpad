(function () {
    const params = new URLSearchParams(window.location.search);
    const roles = window.launchpadData?.interviewRoles || [];
    const roleId = params.get("role") || roles[0]?.id;
    const role = roles.find((item) => item.id === roleId) || roles[0];
    const questions = window.interviewScoring?.questionsForRole(role?.id, "all").slice(0, 3) || [];
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const meetingTitle = document.querySelector("#meetingTitle");
    const questionStatus = document.querySelector("#questionStatus");
    const connectionStatus = document.querySelector("#connectionStatus");
    const mainVideo = document.querySelector("#mainVideo");
    const mainNameLabel = document.querySelector("#mainNameLabel");
    const speakerContent = document.querySelector("#speakerContent");
    const speakerLine = document.querySelector("#speakerLine");
    const characterFace = document.querySelector("#characterFace");
    const mainCandidateAvatar = document.querySelector("#mainCandidateAvatar");
    const screenSharePreview = document.querySelector("#screenSharePreview");
    const participantTile = document.querySelector("#participantTile");
    const participantStatus = document.querySelector("#participantStatus");
    const tileAvatar = document.querySelector("#tileAvatar");
    const tileNameLabel = document.querySelector("#tileNameLabel");
    const mockQuestion = document.querySelector("#mockQuestion");
    const mockAnswer = document.querySelector("#mockAnswer");
    const submitAnswer = document.querySelector("#submitAnswer");
    const micStatus = document.querySelector("#micStatus");
    const muteButton = document.querySelector("#muteButton");
    const cameraButton = document.querySelector("#cameraButton");
    const participantsButton = document.querySelector("#participantsButton");
    const chatButton = document.querySelector("#chatButton");
    const shareButton = document.querySelector("#shareButton");
    const chatPanel = document.querySelector("#chatPanel");
    const chatLog = document.querySelector("#chatLog");
    const chatForm = document.querySelector("#chatForm");
    const chatInput = document.querySelector("#chatInput");
    const chatCount = document.querySelector("#chatCount");
    const finalFeedback = document.querySelector("#finalFeedback");

    let questionIndex = 0;
    let results = [];
    let recognition = null;
    let isMuted = true;
    let isListening = false;
    let isCameraOff = false;
    let isSharing = false;
    let isComplete = false;
    let chatMessages = 2;

    if (!role || !questions.length || !window.interviewScoring) {
        return;
    }

    function setSpeaker(person, message) {
        const isCandidate = person === "candidate";

        mainVideo.classList.toggle("is-candidate", isCandidate);
        mainNameLabel.textContent = isCandidate ? "You" : "Professor Parker";
        characterFace.hidden = isCandidate;
        mainCandidateAvatar.hidden = !isCandidate;
        mainCandidateAvatar.classList.toggle("is-off", isCandidate && isCameraOff);
        speakerLine.textContent = message;
        tileNameLabel.textContent = isCandidate ? "Professor Parker" : "You";
        tileAvatar.textContent = isCandidate ? "PP" : "You";
        tileAvatar.classList.toggle("candidate-avatar", !isCandidate);
        tileAvatar.classList.toggle("interviewer-avatar", isCandidate);
        tileAvatar.classList.toggle("is-off", !isCandidate && isCameraOff);
        participantStatus.textContent = isCandidate
            ? "Listening"
            : isCameraOff ? "Camera off" : "Camera on";
    }

    function setMood(score) {
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
    }

    function reactionForScore(score) {
        if (score >= 76) {
            return "Strong answer. Specific, confident, and nicely tied to the role.";
        }

        if (score >= 45) {
            return "Good start. Add a clearer result and one more role-specific detail.";
        }

        return "Try again with a full STAR structure: situation, task, action, result.";
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

    function renderQuestion() {
        const question = questions[questionIndex];

        questionStatus.textContent = `Question ${questionIndex + 1} of ${questions.length}`;
        mockQuestion.textContent = question.question;
        mockAnswer.value = "";
        submitAnswer.textContent = questionIndex === questions.length - 1 ? "Finish Interview" : "Submit Answer";
        setMood(null);
        setSpeaker("interviewer", question.question);
        postChat("Professor Parker", question.question, false);
        mockAnswer.focus();
    }

    function finalMarkup() {
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
            <h2>Interview feedback</h2>
            <span class="score-pill">${average}/100 average</span>
            <p><strong>Best response:</strong> ${strongest.question.question}</p>
            <p><strong>What worked:</strong> ${strongest.result.strengths.join(" ")}</p>
            <p><strong>Improve next:</strong> ${
                missing.length
                    ? `Work in stronger evidence for ${missing.join(", ")}.`
                    : "Keep connecting your examples directly to the job."
            }</p>
        `;
    }

    function finishInterview() {
        isComplete = true;
        finalFeedback.innerHTML = finalMarkup();
        finalFeedback.hidden = false;
        questionStatus.textContent = "Interview complete";
        submitAnswer.textContent = "Restart Interview";
        setMood(90);
        setSpeaker("interviewer", "Interview complete. I put your real feedback below the meeting.");
        postChat("Professor Parker", "Interview complete. Review your feedback below the meeting.", false);
    }

    function submitResponse() {
        if (isComplete) {
            questionIndex = 0;
            results = [];
            isComplete = false;
            finalFeedback.hidden = true;
            renderQuestion();
            return;
        }

        const question = questions[questionIndex];
        const result = window.interviewScoring.scoreAnswer(question, mockAnswer.value);

        results.push({ question, result });
        setSpeaker("candidate", mockAnswer.value || "I need a moment to build a fuller answer.");
        postChat("You", mockAnswer.value || "I need a moment to build a fuller answer.", true);

        window.setTimeout(() => {
            setMood(result.score);
            setSpeaker("interviewer", reactionForScore(result.score));
            postChat("Professor Parker", reactionForScore(result.score), false);

            if (questionIndex >= questions.length - 1) {
                window.setTimeout(finishInterview, 900);
                return;
            }

            questionIndex += 1;
            window.setTimeout(renderQuestion, 1100);
        }, 600);
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
            mockAnswer.value = Array.from(event.results)
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

        if (recognition && isListening) {
            recognition.stop();
        }
    }

    function toggleCamera() {
        isCameraOff = !isCameraOff;
        mainCandidateAvatar.classList.toggle("is-off", isCameraOff && mainNameLabel.textContent === "You");
        tileAvatar.classList.toggle("is-off", isCameraOff && mainNameLabel.textContent !== "You");
        participantTile.classList.toggle("is-camera-off", isCameraOff);
        participantStatus.textContent = mainNameLabel.textContent === "You"
            ? "Listening"
            : isCameraOff ? "Camera off" : "Camera on";
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

    function toggleChat() {
        chatPanel.classList.toggle("is-hidden");
        chatButton.classList.toggle("is-active", !chatPanel.classList.contains("is-hidden"));
    }

    function toggleParticipants() {
        participantTile.hidden = !participantTile.hidden;
        participantsButton.classList.toggle("is-active", !participantTile.hidden);
    }

    chatForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const message = chatInput.value.trim();

        if (!message) {
            return;
        }

        postChat("You", message, true);
        chatInput.value = "";
    });

    submitAnswer.addEventListener("click", submitResponse);
    muteButton.addEventListener("click", toggleMute);
    cameraButton.addEventListener("click", toggleCamera);
    participantsButton.addEventListener("click", toggleParticipants);
    chatButton.addEventListener("click", toggleChat);
    shareButton.addEventListener("click", toggleShare);

    meetingTitle.textContent = `${role.title} Mock Interview`;
    participantsButton.classList.add("is-active");
    muteButton.textContent = "Unmute";
    muteButton.classList.add("is-danger");
    setupSpeechRecognition();
    renderQuestion();
})();
