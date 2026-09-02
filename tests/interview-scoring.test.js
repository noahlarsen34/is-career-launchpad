const assert = require("node:assert/strict");

global.window = global;
require("../js/data.js");
require("../js/interview-data.js");
require("../js/interview-scoring.js");

function question(id) {
    return launchpadData.roleInterviewQuestions.find((item) => item.id === id);
}

const studentStyleResponses = [
    {
        name: "strong debugging response with natural synonyms",
        questionId: "software-debugging",
        response: "First I would recreate the failure and narrow down whether it is the browser or server. I would check the network tab, status code, console, and production telemetry. Then I would compare configuration, environment variables, URLs, and CORS. After correcting it, I would verify the success and error paths, deploy carefully, and monitor for the issue returning.",
        minimum: 75
    },
    {
        name: "solid requirements response using client language",
        questionId: "business-requirements",
        response: "I would ask the client what decision and objective the dashboard supports. I would interview the users about metrics, filters, security, and constraints. Then I would write functional requirements and acceptance criteria, sketch a prototype, and confirm it with the customer before the team builds it.",
        minimum: 70
    },
    {
        name: "data response with common student phrasing",
        questionId: "data-dashboard",
        response: "I would first make sure finance and the dashboard define the number the same way. Then I would check the source for nulls and duplicates. I would review filters, joins, transformations, and aggregations. Finally I would compare a sample and validate the corrected total with finance.",
        minimum: 70
    },
    {
        name: "security response recognizes containment",
        questionId: "security-incident",
        response: "I would inspect the login audit evidence including the time, IP, device, and other alerts. I would contact the user and determine the scope. If it looks compromised, I would disable access, reset credentials, revoke sessions, turn on MFA, document the incident, escalate it, and monitor the account.",
        minimum: 75
    },
    {
        name: "minor technical typo still receives concept credit",
        questionId: "business-requirements",
        response: "I would identify the business goal, interview each stakeholder, and document functional requrements with acceptance criteria. I would build a prototype and validate it with the client so the team agrees before development begins.",
        minimum: 60
    },
    {
        name: "brief answer receives constructive low score",
        questionId: "pm-risk",
        response: "I would make a risk list and talk to the team.",
        maximum: 45
    },
    {
        name: "nonsense cannot earn points from length",
        questionId: "ux-usability",
        response: "I like design a lot and would work very hard because products are important and teamwork is important too.",
        maximum: 30
    }
];

studentStyleResponses.forEach((testCase) => {
    const result = interviewScoring.scoreAnswer(question(testCase.questionId), testCase.response);

    if (testCase.minimum !== undefined) {
        assert.ok(result.score >= testCase.minimum, `${testCase.name}: expected >= ${testCase.minimum}, received ${result.score}`);
    }

    if (testCase.maximum !== undefined) {
        assert.ok(result.score <= testCase.maximum, `${testCase.name}: expected <= ${testCase.maximum}, received ${result.score}`);
    }

    console.log(`${testCase.name}: ${result.score}/100`);
});

console.log("All representative student-response scoring checks passed.");
