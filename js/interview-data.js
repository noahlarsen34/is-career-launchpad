window.launchpadData = window.launchpadData || {};

window.launchpadData.interviewRoles = [
    { id: "software-developer", title: "Software / Application Developer" },
    { id: "business-analyst", title: "Business / Systems Analyst" },
    { id: "data-analyst", title: "Data Analyst / Data Scientist" },
    { id: "cybersecurity-analyst", title: "Cybersecurity Analyst" },
    { id: "it-project-manager", title: "IT Project Manager" },
    { id: "ux-product", title: "UX Designer / Product Manager" },
    { id: "erp-consultant", title: "ERP / Systems Consultant" },
    { id: "cloud-engineer", title: "Cloud / Infrastructure Engineer" }
];

window.launchpadData.roleInterviewQuestions = [
    {
        id: "shared-elevator-pitch",
        roleId: "all",
        type: "behavioral",
        question: "Tell me about yourself.",
        tip: "Give a 30–60 second elevator pitch: present direction, relevant experience, evidence of your strengths, and why this role is the logical next step.",
        durationSeconds: { minimum: 30, maximum: 60 },
        concepts: [
            { label: "present direction", terms: ["student", "studying", "major", "currently", "focus"] },
            { label: "relevant experience", terms: ["project", "internship", "work", "experience", "built"] },
            { label: "evidence of strengths", terms: ["result", "improved", "delivered", "increased", "reduced", "learned"] },
            { label: "connection to the role", terms: ["role", "position", "opportunity", "interested", "because", "next step"] }
        ],
        strongAnswer: "I am an Information Systems student who enjoys turning business problems into practical technology solutions. In a recent team project, I built a dashboard that cleaned and organized sales data, which helped our client identify its strongest customer segment. That experience strengthened my SQL, communication, and problem-solving skills. I am now looking for an internship where I can contribute those skills, learn from an experienced team, and keep building solutions that help people make better decisions."
    },
    {
        id: "shared-learning",
        roleId: "all",
        type: "behavioral",
        question: "Tell me about a time you had to learn a new technical tool quickly.",
        tip: "Use STAR and explain how you chose what to learn first, applied it, and measured the outcome.",
        concepts: [
            { label: "specific situation", terms: ["project", "deadline", "needed", "task"] },
            { label: "learning approach", terms: ["documentation", "tutorial", "asked", "practiced", "learned"] },
            { label: "application", terms: ["built", "used", "applied", "implemented"] },
            { label: "result", terms: ["result", "saved", "completed", "improved", "delivered"] }
        ],
        strongAnswer: "During a two-week analytics project, I needed to use Power Query for the first time. I identified the three transformations required, worked through the official documentation, and tested each step on a small copy of the data. I then applied the process to the full dataset and documented it for my team. We delivered on time and reduced manual cleanup from an hour to about ten minutes."
    },
    {
        id: "shared-feedback",
        roleId: "all",
        type: "behavioral",
        question: "Tell me about a time you received difficult feedback and used it to improve your work.",
        tip: "Show that you listened, clarified the feedback, changed something concrete, and verified improvement.",
        concepts: [
            { label: "specific feedback", terms: ["feedback", "review", "critique", "told me"] },
            { label: "listening and clarification", terms: ["listened", "asked", "clarified", "understand"] },
            { label: "specific action", terms: ["changed", "revised", "practiced", "implemented"] },
            { label: "result", terms: ["result", "improved", "accepted", "delivered", "measured"] }
        ],
        strongAnswer: "After a project presentation, my teammate said my technical explanation was accurate but difficult for the client to follow. I asked which sections caused confusion and learned I was introducing details before the business problem. I reorganized the next presentation around the decision, evidence, and recommendation, then practiced it with the teammate. The client understood the recommendation and approved our proposed next step without additional clarification."
    },
    {
        id: "software-debugging",
        roleId: "software-developer",
        type: "technical",
        question: "A web page works locally but its API request fails in production. How would you debug it?",
        tip: "Explain a repeatable process and name the evidence you would inspect before changing code.",
        concepts: [
            { label: "reproduce and isolate", terms: ["reproduce", "isolate", "narrow down"] },
            { label: "browser and server evidence", terms: ["console", "network tab", "logs", "status code"] },
            { label: "environment differences", terms: ["environment variable", "configuration", "cors", "url"] },
            { label: "verify the fix", terms: ["test", "regression", "deploy", "monitor"] }
        ],
        strongAnswer: "I would reproduce the failure and inspect the browser network request, console, response status, and server logs. I would compare production configuration with local settings, including the API URL, credentials, CORS rules, and environment variables. After isolating the cause, I would make the smallest fix, test success and failure paths in a production-like environment, deploy it, and monitor the logs for regression."
    },
    {
        id: "software-data-structure",
        roleId: "software-developer",
        type: "technical",
        question: "When would you use an array instead of a hash map, and what tradeoffs would you explain?",
        tip: "Compare access patterns, ordering, memory, and time complexity rather than only defining each structure.",
        concepts: [
            { label: "array characteristics", terms: ["array", "ordered", "index", "contiguous"] },
            { label: "hash map characteristics", terms: ["hash map", "dictionary", "key value", "key-value"] },
            { label: "complexity", terms: ["o(1)", "constant time", "linear", "o(n)"] },
            { label: "tradeoff or use case", terms: ["tradeoff", "lookup", "iteration", "memory"] }
        ],
        strongAnswer: "I would use an array when order matters, I access items by position, or I need efficient iteration with low overhead. I would use a hash map when I repeatedly look up values by a meaningful key. Indexed array access and average hash-map lookup are both O(1), but searching an unsorted array is O(n). Hash maps usually use more memory and do not always provide the ordering behavior I need."
    },
    {
        id: "software-behavioral",
        roleId: "software-developer",
        type: "behavioral",
        question: "Tell me about a bug you found and fixed. How did you know your fix was correct?",
        tip: "Use STAR and emphasize diagnosis, testing, and the result.",
        concepts: [
            { label: "specific situation", terms: ["project", "application", "system", "team"] },
            { label: "diagnostic action", terms: ["debug", "log", "reproduce", "isolate"] },
            { label: "verification", terms: ["test", "edge case", "review", "monitor"] },
            { label: "result", terms: ["result", "reduced", "improved", "fixed"] }
        ],
        strongAnswer: "In a class scheduling app, users occasionally received duplicate reservations. I reproduced the bug with simultaneous requests and traced it to a non-atomic availability check. I added a database constraint and handled the conflict in the application. I wrote a concurrency test plus regression tests for normal booking. Duplicate reservations stopped, and the team adopted the test for future releases."
    },
    {
        id: "business-requirements",
        roleId: "business-analyst",
        type: "technical",
        question: "A stakeholder asks you to 'build a dashboard.' How would you turn that request into usable requirements?",
        tip: "Start with the business need, then discuss stakeholders, measures, constraints, and validation.",
        concepts: [
            { label: "business need", terms: ["business need", "goal", "decision", "value"] },
            { label: "elicitation", terms: ["stakeholder", "interview", "workshop", "observe"] },
            { label: "requirements", terms: ["functional", "nonfunctional", "acceptance criteria", "constraint"] },
            { label: "confirmation", terms: ["validate", "confirm", "prototype", "sign off"] }
        ],
        strongAnswer: "I would first ask what decision the dashboard must support and how success will be measured. I would identify users and data owners, then use interviews or a workshop to learn required metrics, filters, refresh timing, security, and performance constraints. I would document prioritized functional and nonfunctional requirements with acceptance criteria, create a low-fidelity prototype, and confirm it with stakeholders before development."
    },
    {
        id: "business-conflict",
        roleId: "business-analyst",
        type: "technical",
        question: "Two departments give you conflicting requirements. What do you do?",
        tip: "Show how you trace each request to value and reach an explicit, documented decision.",
        concepts: [
            { label: "clarify the conflict", terms: ["clarify", "assumption", "root", "need"] },
            { label: "shared criteria", terms: ["business value", "goal", "priority", "risk"] },
            { label: "facilitation", terms: ["workshop", "facilitate", "stakeholder", "tradeoff"] },
            { label: "decision record", terms: ["document", "decision", "approval", "trace"] }
        ],
        strongAnswer: "I would clarify the underlying need behind each requirement and check whether the conflict comes from different assumptions. I would bring the decision owners together, compare options using agreed criteria such as customer value, risk, cost, and strategic goals, and explain the tradeoffs. I would document the chosen requirement, rationale, approver, and traceability so the issue does not silently return later."
    },
    {
        id: "business-behavioral",
        roleId: "business-analyst",
        type: "behavioral",
        question: "Tell me about a time you clarified an ambiguous request for a team.",
        tip: "Describe what was unclear, the questions you asked, and how the clarification changed the outcome.",
        concepts: [
            { label: "ambiguity", terms: ["unclear", "ambiguous", "assumption", "confusion"] },
            { label: "stakeholder action", terms: ["asked", "interviewed", "meeting", "listened"] },
            { label: "artifact or agreement", terms: ["requirement", "criteria", "prototype", "documented"] },
            { label: "result", terms: ["result", "saved", "reduced", "delivered"] }
        ],
        strongAnswer: "During a student consulting project, the client asked for a 'more useful' report without defining useful. I interviewed the two primary users and learned they made different weekly decisions. I converted those decisions into three metrics and acceptance criteria, then confirmed a wireframe with both users. The team avoided building unused charts and delivered the report two days early."
    },
    {
        id: "data-dashboard",
        roleId: "data-analyst",
        type: "technical",
        question: "A dashboard total does not match the finance system. How would you investigate the discrepancy?",
        tip: "Walk from the metric definition and source data through transformations, joins, filters, and validation.",
        concepts: [
            { label: "metric definition", terms: ["definition", "business rule", "grain", "time period"] },
            { label: "source quality", terms: ["source", "null", "duplicate", "data type"] },
            { label: "transformation logic", terms: ["join", "filter", "aggregation", "transformation"] },
            { label: "reconciliation", terms: ["reconcile", "sample", "validate", "finance"] }
        ],
        strongAnswer: "I would confirm that both systems use the same metric definition, date range, grain, and accounting rules. I would trace a small sample from the finance source through extraction and transformation, checking nulls, duplicates, data types, joins, filters, and aggregation. I would reconcile totals at each stage, correct the earliest divergence, and have the metric owner validate the result before refreshing the report."
    },
    {
        id: "data-sql",
        roleId: "data-analyst",
        type: "technical",
        question: "Explain the difference between an INNER JOIN and a LEFT JOIN and when a LEFT JOIN can inflate totals.",
        tip: "Discuss unmatched rows and the cardinality of the join keys.",
        concepts: [
            { label: "inner join", terms: ["inner join", "matching rows", "matches"] },
            { label: "left join", terms: ["left join", "all left", "unmatched", "null"] },
            { label: "cardinality", terms: ["one-to-many", "many-to-many", "duplicate", "cardinality"] },
            { label: "validation", terms: ["unique key", "count", "group by", "validate"] }
        ],
        strongAnswer: "An INNER JOIN returns only rows whose keys match in both tables. A LEFT JOIN keeps every row from the left table and adds nulls when no right-side match exists. Totals can inflate when a left-side row matches multiple right-side rows, especially with non-unique or many-to-many keys. I would inspect key uniqueness and compare row counts before and after the join."
    },
    {
        id: "data-behavioral",
        roleId: "data-analyst",
        type: "behavioral",
        question: "Tell me about a time data challenged your original assumption.",
        tip: "Show intellectual honesty, validation, and how the evidence changed your recommendation.",
        concepts: [
            { label: "initial assumption", terms: ["assumed", "hypothesis", "expected", "believed"] },
            { label: "analysis", terms: ["analyzed", "queried", "tested", "compared"] },
            { label: "validation", terms: ["validated", "checked", "sample", "stakeholder"] },
            { label: "decision impact", terms: ["recommendation", "decision", "changed", "result"] }
        ],
        strongAnswer: "I expected low event attendance to come from weak advertising. I joined registration and survey data, segmented it by commute time, and found transportation was the stronger predictor. I checked missing values and confirmed the pattern with event staff. We shifted part of the promotion budget to a shuttle pilot, and attendance increased at the next event."
    },
    {
        id: "security-incident",
        roleId: "cybersecurity-analyst",
        type: "technical",
        question: "You see repeated failed logins followed by a successful login from a new location. How would you respond?",
        tip: "Balance evidence preservation, containment, user impact, and escalation.",
        concepts: [
            { label: "triage evidence", terms: ["logs", "timestamp", "ip", "device"] },
            { label: "scope and validate", terms: ["baseline", "user", "correlate", "scope"] },
            { label: "containment", terms: ["disable", "reset", "revoke", "mfa", "contain"] },
            { label: "process and recovery", terms: ["escalate", "incident plan", "document", "monitor"] }
        ],
        strongAnswer: "I would preserve and correlate authentication logs, timestamps, IP reputation, device data, and related alerts, then contact the user through a trusted channel. If compromise is likely, I would follow the incident plan to revoke sessions, reset credentials, require MFA, and temporarily restrict the account while checking for lateral activity. I would document and escalate the incident, restore access safely, and monitor for recurrence."
    },
    {
        id: "security-access",
        roleId: "cybersecurity-analyst",
        type: "technical",
        question: "Explain least privilege and how you would review access for a finance application.",
        tip: "Connect the principle to roles, evidence, approvals, and recurring review.",
        concepts: [
            { label: "least privilege", terms: ["least privilege", "minimum access", "need to know"] },
            { label: "role design", terms: ["role", "job function", "rbac", "segregation of duties"] },
            { label: "review evidence", terms: ["access list", "logs", "manager", "owner"] },
            { label: "remediation", terms: ["remove", "revoke", "approve", "periodic review"] }
        ],
        strongAnswer: "Least privilege means granting only the access required for a job and only as long as it is needed. I would inventory accounts and entitlements, map them to approved job roles, and ask managers and the application owner to certify access. I would flag dormant accounts, excessive privileges, and segregation-of-duties conflicts, remove or approve exceptions, and schedule recurring reviews with logged evidence."
    },
    {
        id: "security-behavioral",
        roleId: "cybersecurity-analyst",
        type: "behavioral",
        question: "Tell me about a time you noticed a risk others had overlooked.",
        tip: "Explain the evidence, how you communicated without creating panic, and the resulting improvement.",
        concepts: [
            { label: "specific risk", terms: ["risk", "vulnerability", "exposure", "threat"] },
            { label: "evidence", terms: ["tested", "log", "scan", "observed"] },
            { label: "communication", terms: ["explained", "reported", "team", "owner"] },
            { label: "mitigation and result", terms: ["fixed", "mitigated", "control", "result"] }
        ],
        strongAnswer: "While reviewing a class application, I noticed its storage bucket allowed public reads. I verified the exposure using a non-sensitive test file, documented the affected setting, and privately notified the team lead. We changed the policy, rotated a test credential, and added a deployment check. The check later caught the same configuration mistake before another release."
    },
    {
        id: "pm-scope",
        roleId: "it-project-manager",
        type: "technical",
        question: "A sponsor asks for a major feature halfway through a fixed-date project. How would you handle it?",
        tip: "Do not simply accept or reject it; describe change control and visible tradeoffs.",
        concepts: [
            { label: "clarify value", terms: ["business value", "need", "priority", "sponsor"] },
            { label: "impact analysis", terms: ["scope", "schedule", "cost", "quality", "risk"] },
            { label: "options", terms: ["tradeoff", "defer", "replace", "phase"] },
            { label: "decision control", terms: ["approve", "change request", "baseline", "document"] }
        ],
        strongAnswer: "I would clarify the feature's value and urgency, then have the team estimate its effect on scope, schedule, cost, quality, dependencies, and risk. I would present options such as replacing lower-priority scope, moving the date, adding resources if realistic, or phasing the feature. The authorized sponsor would approve the change, and I would update the baseline, risks, owners, and stakeholder communication."
    },
    {
        id: "pm-risk",
        roleId: "it-project-manager",
        type: "technical",
        question: "How would you identify and manage risks at the beginning of an IT project?",
        tip: "Distinguish a possible risk from an active issue and explain ownership and monitoring.",
        concepts: [
            { label: "identify", terms: ["workshop", "lessons learned", "assumption", "dependency"] },
            { label: "assess", terms: ["probability", "impact", "priority", "score"] },
            { label: "response", terms: ["avoid", "mitigate", "transfer", "accept", "contingency"] },
            { label: "ownership and review", terms: ["owner", "risk register", "trigger", "review"] }
        ],
        strongAnswer: "I would review scope, assumptions, dependencies, architecture, and lessons learned, then facilitate a risk workshop with technical and business stakeholders. We would score probability and impact, assign an owner, define triggers, and choose a response such as avoid, mitigate, transfer, or accept with contingency. I would keep a risk register and review it regularly; once a risk occurs, I would manage it as an issue."
    },
    {
        id: "pm-behavioral",
        roleId: "it-project-manager",
        type: "behavioral",
        question: "Tell me about a time a team was at risk of missing a deadline.",
        tip: "Show how you found the constraint, involved the team, and protected the most important outcome.",
        concepts: [
            { label: "deadline risk", terms: ["deadline", "behind", "delay", "blocked"] },
            { label: "diagnosis", terms: ["dependency", "constraint", "critical", "cause"] },
            { label: "action", terms: ["prioritized", "reassigned", "communicated", "escalated"] },
            { label: "result", terms: ["delivered", "result", "on time", "learned"] }
        ],
        strongAnswer: "A four-person project fell behind when an API dependency arrived late. I mapped the remaining critical work with the team, moved two people to tasks that did not require the API, and told the sponsor which lower-value report we proposed deferring. We delivered the core workflow on time and added an integration checkpoint to future schedules."
    },
    {
        id: "ux-usability",
        roleId: "ux-product",
        type: "technical",
        question: "How would you plan a usability test for a new internship-search feature?",
        tip: "Define the research question, representative participants, realistic tasks, evidence, and next decision.",
        concepts: [
            { label: "research objective", terms: ["research question", "objective", "hypothesis", "decision"] },
            { label: "participants", terms: ["representative", "participant", "recruit", "target user"] },
            { label: "tasks and moderation", terms: ["task", "scenario", "think aloud", "avoid leading"] },
            { label: "evidence and iteration", terms: ["observation", "success rate", "synthesize", "iterate"] }
        ],
        strongAnswer: "I would define the decision the test must inform, such as whether students can find and save a relevant internship. I would recruit representative students, give them realistic goal-based tasks, and use a consistent script without leading them. I would observe errors, comments, completion, and time, synthesize patterns by severity, recommend changes, and retest the riskiest parts."
    },
    {
        id: "ux-prioritization",
        roleId: "ux-product",
        type: "technical",
        question: "Users request five features, but the team can build only one. How would you prioritize?",
        tip: "Combine user evidence, product goals, impact, effort, risk, and validation.",
        concepts: [
            { label: "user problem", terms: ["user need", "research", "pain point", "frequency"] },
            { label: "business outcome", terms: ["goal", "metric", "value", "strategy"] },
            { label: "tradeoff framework", terms: ["impact", "effort", "risk", "rice"] },
            { label: "validate", terms: ["prototype", "experiment", "test", "measure"] }
        ],
        strongAnswer: "I would translate each request into the user problem it solves and check the strength and frequency of the evidence. I would compare expected impact on a product goal with effort, risk, dependencies, and strategic fit using a consistent framework. For the leading option, I would test the riskiest assumption with a prototype or small experiment and define a metric before committing the full build."
    },
    {
        id: "ux-behavioral",
        roleId: "ux-product",
        type: "behavioral",
        question: "Tell me about a time user feedback caused you to change a design or product decision.",
        tip: "Explain the original reasoning, evidence from users, iteration, and outcome.",
        concepts: [
            { label: "original decision", terms: ["original", "designed", "assumed", "proposal"] },
            { label: "user evidence", terms: ["user", "feedback", "test", "observed"] },
            { label: "iteration", terms: ["changed", "iterated", "prototype", "revised"] },
            { label: "result", terms: ["result", "improved", "success", "measured"] }
        ],
        strongAnswer: "I designed a course filter around department codes because they matched the catalog. In testing, new students searched by interests and did not understand the codes. I changed the first filter to plain-language topics while keeping department under advanced filters. In the next test, completion improved from three of six participants to six of six."
    },
    {
        id: "erp-fit-gap",
        roleId: "erp-consultant",
        type: "technical",
        question: "A client says its approval process is unique and wants heavy ERP customization. How would you respond?",
        tip: "Discuss current-state discovery, fit-to-standard, gaps, value, upgrade cost, and decision governance.",
        concepts: [
            { label: "process discovery", terms: ["current process", "requirement", "workshop", "why"] },
            { label: "fit to standard", terms: ["standard", "best practice", "configure", "fit"] },
            { label: "gap tradeoffs", terms: ["gap", "customization", "maintenance", "upgrade"] },
            { label: "decision and validation", terms: ["decision", "owner", "prototype", "test"] }
        ],
        strongAnswer: "I would map the current process and ask what business or regulatory need makes each step necessary. In a fit-to-standard workshop, I would demonstrate the ERP's standard workflow and identify true gaps. For each gap, I would compare configuration, process change, extension, and customization based on value, risk, maintenance, and upgrade impact. The process owner would approve the documented choice, which we would prototype and test."
    },
    {
        id: "erp-data-migration",
        roleId: "erp-consultant",
        type: "technical",
        question: "What steps would you take to prepare customer data for an ERP migration?",
        tip: "Cover ownership, mapping, quality, security, testing, reconciliation, and cutover.",
        concepts: [
            { label: "scope and ownership", terms: ["owner", "scope", "source", "master data"] },
            { label: "mapping and quality", terms: ["map", "clean", "duplicate", "transform"] },
            { label: "test migration", terms: ["test load", "mock", "validate", "error"] },
            { label: "reconcile and cutover", terms: ["reconcile", "count", "cutover", "rollback"] }
        ],
        strongAnswer: "I would identify in-scope master and transaction data, assign business owners, profile quality, and define source-to-target mappings and transformation rules. We would clean duplicates and invalid values while protecting sensitive data. I would run repeatable test migrations, resolve errors, and have owners reconcile counts, totals, and samples. The cutover plan would include a freeze window, final validation, backup, and rollback criteria."
    },
    {
        id: "erp-behavioral",
        roleId: "erp-consultant",
        type: "behavioral",
        question: "Tell me about a time you explained a technical limitation to a nontechnical stakeholder.",
        tip: "Focus on business impact, options, and how you gained agreement.",
        concepts: [
            { label: "specific limitation", terms: ["limitation", "constraint", "could not", "technical"] },
            { label: "plain language", terms: ["example", "plain", "business impact", "explained"] },
            { label: "options", terms: ["option", "tradeoff", "alternative", "recommend"] },
            { label: "agreement and result", terms: ["agreed", "decision", "result", "delivered"] }
        ],
        strongAnswer: "A client wanted a report to update instantly, but the source synchronized nightly. I explained the limitation using their morning planning process rather than database terminology. I presented the cost and risk of real-time integration versus an hourly export and recommended the export for the pilot. They agreed, and we delivered the needed visibility within budget."
    },
    {
        id: "cloud-responsibility",
        roleId: "cloud-engineer",
        type: "technical",
        question: "Explain the cloud shared responsibility model using a hosted virtual machine as an example.",
        tip: "Separate security of the cloud from the customer's security in the cloud.",
        concepts: [
            { label: "provider responsibility", terms: ["provider", "physical", "facility", "hypervisor"] },
            { label: "customer responsibility", terms: ["customer", "operating system", "patch", "application"] },
            { label: "identity and data", terms: ["iam", "identity", "access", "encrypt", "data"] },
            { label: "service-dependent boundary", terms: ["service", "iaas", "managed", "depends"] }
        ],
        strongAnswer: "The provider secures the facilities, physical hardware, networking foundation, and virtualization layer. For a hosted virtual machine, the customer still configures identities and network rules, patches the guest operating system, secures applications, and protects and backs up data. The boundary changes with the service: a managed database shifts more platform work to the provider, but customer access and data responsibilities remain."
    },
    {
        id: "cloud-resilience",
        roleId: "cloud-engineer",
        type: "technical",
        question: "How would you design a small web application to remain available if one server fails?",
        tip: "Start with failure assumptions, then cover redundancy, health checks, data, and testing.",
        concepts: [
            { label: "redundancy", terms: ["multiple", "redundant", "availability zone", "instance"] },
            { label: "traffic and health", terms: ["load balancer", "health check", "failover", "routing"] },
            { label: "state and data", terms: ["stateless", "replication", "backup", "database"] },
            { label: "monitor and test", terms: ["monitor", "alert", "failure test", "recovery"] }
        ],
        strongAnswer: "I would run at least two application instances across separate failure zones behind a load balancer with health checks. I would keep the application tier stateless and place sessions and data in resilient managed stores with replication and tested backups. Monitoring would alert on errors and capacity. I would deliberately stop an instance to verify traffic fails over and document recovery objectives."
    },
    {
        id: "cloud-behavioral",
        roleId: "cloud-engineer",
        type: "behavioral",
        question: "Tell me about a time you automated a repetitive technical task.",
        tip: "Quantify the old process, explain safeguards, and show the improvement.",
        concepts: [
            { label: "repetitive problem", terms: ["manual", "repetitive", "hours", "error"] },
            { label: "automation", terms: ["script", "automated", "pipeline", "code"] },
            { label: "safeguards", terms: ["test", "validation", "rollback", "review"] },
            { label: "measured result", terms: ["saved", "reduced", "faster", "result"] }
        ],
        strongAnswer: "Our team manually renamed and checked deployment files every week, taking about 40 minutes and causing occasional mistakes. I wrote a small script that validated names, created the package, and produced a summary for review. I tested it on archived releases and kept the previous package for rollback. Preparation dropped to five minutes with no naming errors during the project."
    }
];
