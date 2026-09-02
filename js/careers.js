// --- 1. DATA REPOSITORY: 4 REQUIRED IS TRACKS ---
const careerData = [
  {
    id: "swe",
    title: "Software / Application Developer",
    category: "development",
    badgeClass: "badge-dev",
    dayToDay: "Designs, writes, debugs, and deploys full-stack web applications and microservices. Collaborates in sprints, conducts code reviews, and maintains CI/CD build pipelines.",
    skills: ["C# / .NET", "TypeScript / React", "PostgreSQL", "Git / GitHub Actions", "Docker"],
    internExpectations: "Solid grasp of OOP, relational schema design, basic REST API development, and the ability to explain time complexity (Big-O).",
    salary: "$78,000 - $115,000 entry-level base (BYU IS avg. ~$88k). Senior/Lead paths exceed $165k+.",
    strongCandidate: "Has deployed personal side-projects on GitHub, commits clean code, learns framework updates fast, and can debug calmly under pressure.",
    avatar: `
      <svg viewBox="0 0 100 120" width="100%" height="100%">
        <rect x="25" y="30" width="50" height="50" rx="10" fill="#2563eb"/>
        <circle cx="50" cy="30" r="18" fill="#fdba74"/>
        <rect x="40" y="26" width="9" height="6" rx="1" fill="#0f172a"/>
        <rect x="52" y="26" width="9" height="6" rx="1" fill="#0f172a"/>
        <line x1="49" y1="29" x2="52" y2="29" stroke="#0f172a" stroke-width="2"/>
        <path d="M 32 25 Q 50 10 68 25" stroke="#1d4ed8" stroke-width="6" fill="none"/>
        <rect x="20" y="70" width="45" height="30" rx="3" fill="#94a3b8"/>
        <polygon points="15,100 70,100 65,105 20,105" fill="#64748b"/>
        <rect x="24" y="74" width="37" height="22" fill="#0f172a"/>
        <line x1="28" y1="80" x2="42" y2="80" stroke="#38bdf8" stroke-width="2"/>
        <line x1="28" y1="85" x2="50" y2="85" stroke="#34d399" stroke-width="2"/>
        <circle cx="75" cy="75" r="9" fill="#fdba74"/>
      </svg>
    `
  },
  {
    id: "ba",
    title: "Business / Systems Analyst",
    category: "analysis",
    badgeClass: "badge-ba",
    dayToDay: "Bridges executive business teams and technical engineering units. Gathers user stories, models business processes (BPMN), validates edge cases, and creates Jira sprint roadmaps.",
    skills: ["SQL Data Queries", "Process Flow (Visio/Lucid)", "Agile / Scrum / Jira", "Tableau / Power BI", "Requirements Spec"],
    internExpectations: "Fluent in converting vague human ambiguity into structured functional specs; can query relational DBs to back statements with data.",
    salary: "$70,000 - $92,000 starting base. Management consulting and VP Product/Ops roles scale to $150k+.",
    strongCandidate: "Exceptional active listening, runs crisp stakeholder interviews, builds clear wireframes, and prevents feature creep.",
    avatar: `
      <svg viewBox="0 0 100 120" width="100%" height="100%">
        <rect x="25" y="32" width="50" height="50" rx="8" fill="#475569"/>
        <polygon points="48,40 52,40 55,65 50,72 45,65" fill="#f59e0b"/>
        <circle cx="50" cy="26" r="16" fill="#fed7aa"/>
        <path d="M 34 22 Q 50 12 66 22" fill="#451a03"/>
        <rect x="15" y="65" width="22" height="34" rx="2" fill="#b45309"/>
        <rect x="18" y="70" width="16" height="24" fill="#ffffff"/>
        <rect x="70" y="68" width="6" height="24" rx="2" fill="#94a3b8" transform="rotate(25 70 68)"/>
        <circle cx="68" cy="74" r="8" fill="#fed7aa"/>
      </svg>
    `
  },
  {
    id: "sec",
    title: "Cybersecurity Analyst",
    category: "security",
    badgeClass: "badge-sec",
    dayToDay: "Monitors SIEM telemetry, flags anomalies, implements zero-trust access controls, performs vulnerability scans, and patches compliance issues.",
    skills: ["Splunk / Sentinel SIEM", "Wireshark / Network Sec", "Linux CLI / Bash", "IAM & Zero-Trust", "CIS / NIST Frameworks"],
    internExpectations: "Thorough understanding of TCP/IP handshakes, common attack vectors (SQLi, XSS, phishing), and log auditing fundamentals.",
    salary: "$75,000 - $105,000 entry-level base. High ceiling in incident response and CISO tracks ($170k+).",
    strongCandidate: "Holds foundational certs (Security+, CySA+), participates in Capture The Flag (CTF) challenges, and has relentless investigative curiosity.",
    avatar: `
      <svg viewBox="0 0 100 120" width="100%" height="100%">
        <rect x="25" y="35" width="50" height="50" rx="8" fill="#1e293b"/>
        <circle cx="50" cy="28" r="17" fill="#090d16"/>
        <rect x="38" y="24" width="24" height="6" rx="2" fill="#ef4444"/>
        <polygon points="12,50 34,50 30,95 23,105 16,95" fill="#dc2626" stroke="#fecaca" stroke-width="2"/>
        <line x1="18" y1="65" x2="28" y2="65" stroke="white" stroke-width="2"/>
        <line x1="23" y1="60" x2="23" y2="70" stroke="white" stroke-width="2"/>
        <circle cx="72" cy="65" r="9" fill="#64748b"/>
      </svg>
    `
  },
  {
    id: "data",
    title: "Data Analyst / Analytics Engineer",
    category: "analysis",
    badgeClass: "badge-data",
    dayToDay: "Builds clean dbt data transformations, creates executive decision dashboards, optimizes data warehouse models, and explains metric movements.",
    skills: ["Advanced SQL (Window functions)", "Python (Pandas)", "Snowflake / BigQuery", "Power BI / Tableau", "dbt Data Modeling"],
    internExpectations: "Write multi-table SQL joins and aggregation queries comfortably; know the difference between OLTP schemas and Star Schemas.",
    salary: "$72,000 - $98,000 starting base. Progresses to Data Engineering or Data Science leads ($145k+).",
    strongCandidate: "Transforms messy data into actionable stories, spots misleading trends, and demonstrates disciplined data modeling hygiene.",
    avatar: `
      <svg viewBox="0 0 100 120" width="100%" height="100%">
        <rect x="25" y="32" width="50" height="50" rx="8" fill="#047857"/>
        <circle cx="50" cy="28" r="17" fill="#fed7aa"/>
        <path d="M 33 28 A 17 17 0 0 1 67 28" stroke="#334155" stroke-width="3" fill="none"/>
        <rect x="31" y="25" width="5" height="10" rx="2" fill="#0f172a"/>
        <rect x="68" y="55" width="24" height="28" rx="4" fill="#064e3b" stroke="#34d399" stroke-width="1.5"/>
        <rect x="72" y="70" width="3" height="9" fill="#34d399"/>
        <rect x="78" y="65" width="3" height="14" fill="#34d399"/>
        <rect x="84" y="60" width="3" height="19" fill="#34d399"/>
        <circle cx="24" cy="70" r="8" fill="#fed7aa"/>
      </svg>
    `
  }
];

// --- 2. BATTLE SCENARIOS ---
const battleScenarios = [
  {
    question: "Scenario 1: You discover a major discrepancy 48 hours before an executive product launch. What is your immediate instinct?",
    options: [
      {
        label: "Open DevTools/Terminal, trace down the underlying commit, replicate it locally, and start drafting a patch.",
        pointsTo: ["swe", "sec"]
      },
      {
        label: "Schedule a triage sync with the department lead to assess business impact, scope out workarounds, and align user messaging.",
        pointsTo: ["ba", "data"]
      }
    ]
  },
  {
    question: "Scenario 2: How do you prefer to measure the concrete success of your daily work?",
    options: [
      {
        label: "When a query produces clean analytical metrics that validate or debunk an expensive strategic hypothesis.",
        pointsTo: ["data", "ba"]
      },
      {
        label: "When tests pass without warnings, vulnerability scanners clear the repo, and the deploy pipeline turns solid green.",
        pointsTo: ["swe", "sec"]
      }
    ]
  },
  {
    question: "Scenario 3: An ambiguous problem surfaces: 'Our checkout drop-off rate jumped by 14% this week.' Where do you dig first?",
    options: [
      {
        label: "Inspect log aggregators and access records to verify there isn't a malicious DDoS attempt, expired token bug, or 500 error flood.",
        pointsTo: ["sec", "swe"]
      },
      {
        label: "Segment user funnels by customer segment and build a root-cause breakdown to see which demographic was blocked.",
        pointsTo: ["data", "ba"]
      }
    ]
  },
  {
    question: "Scenario 4: Which workday frustration drains you the quickest?",
    options: [
      {
        label: "Unclear business requirements, moving scope targets, and endless alignment meetings with no tangible technical output.",
        pointsTo: ["swe", "sec"]
      },
      {
        label: "Writing code in total isolation without understanding who needs this feature, why it matters, or its bottom-line ROI.",
        pointsTo: ["ba", "data"]
      }
    ]
  }
];

let selectedCareerId = "swe";
let fighterL = null;
let fighterR = null;
let currentRound = 0;
let scoreL = 0;
let scoreR = 0;

// --- PART A RENDERING ---
function renderCareers(filter = "all") {
  const grid = document.getElementById("careerGrid");
  if (!grid) return;
  grid.innerHTML = "";
  careerData.forEach(c => {
    if (filter !== "all" && c.category !== filter) return;
    const card = document.createElement("div");
    card.className = `career-summary-card ${c.id === selectedCareerId ? "selected" : ""}`;
    card.onclick = () => selectCareer(c.id);
    card.innerHTML = `
      <span class="badge ${c.badgeClass}">${c.category}</span>
      <h3 style="font-size:1.15rem; margin-bottom:6px;">${c.title}</h3>
      <p style="font-size:0.85rem; color:#64748b; line-height:1.4;">${c.dayToDay.substring(0, 95)}...</p>
    `;
    grid.appendChild(card);
  });
  renderDetailPanel();
}

function selectCareer(id) {
  selectedCareerId = id;
  document.querySelectorAll(".career-summary-card").forEach(card => card.classList.remove("selected"));
  const activeBtn = document.querySelector(".filter-btn.active");
  renderCareers(activeBtn ? activeBtn.getAttribute("data-category") || "all" : "all");
}

function renderDetailPanel() {
  const c = careerData.find(item => item.id === selectedCareerId);
  const panel = document.getElementById("detailPanel");
  if (!panel || !c) return;

  panel.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px;">
      <div>
        <span class="badge ${c.badgeClass}">${c.category}</span>
        <h2 style="font-size:1.5rem; color:var(--byu-navy);">${c.title}</h2>
      </div>
      <button class="btn-action" style="padding:8px 16px; font-size:0.85rem;" onclick="queueBattleFromExplore('${c.id}')">Battle With This Role &darr;</button>
    </div>

    <div class="detail-grid">
      <div class="detail-section">
        <h4>Day-to-Day Responsibilities</h4>
        <p>${c.dayToDay}</p>
      </div>
      <div class="detail-section">
        <h4>Core Tech Stack & Tools</h4>
        <ul>${c.skills.map(s => `<li><strong>${s}</strong></li>`).join("")}</ul>
      </div>
      <div class="detail-section">
        <h4>Entry-Level & Internship Expectations</h4>
        <p>${c.internExpectations}</p>
      </div>
      <div class="detail-section">
        <h4>Realistic Salary & Growth Trajectory</h4>
        <p>${c.salary}</p>
      </div>
    </div>

    <div class="detail-section" style="margin-top:20px; border-left-color: var(--accent-gold);">
      <h4>What Makes a Standout Candidate?</h4>
      <p>${c.strongCandidate}</p>
    </div>
  `;
}

function filterCards(category, btn) {
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  btn.setAttribute("data-category", category);
  renderCareers(category);
}

// --- SMOOTH SCROLLING ---
function scrollToBattle() {
  const battleSection = document.getElementById("battle-section");
  if (battleSection) {
    battleSection.scrollIntoView({ behavior: "smooth" });
  }
}

// --- PART B: BATTLE ENGINE ---
function populateBattleSelectors() {
  const s1 = document.getElementById("fighter1Select");
  const s2 = document.getElementById("fighter2Select");
  if (!s1 || !s2) return;
  s1.innerHTML = "";
  s2.innerHTML = "";

  careerData.forEach((c, idx) => {
    s1.innerHTML += `<option value="${c.id}" ${idx === 0 ? "selected" : ""}>${c.title}</option>`;
    s2.innerHTML += `<option value="${c.id}" ${idx === 1 ? "selected" : ""}>${c.title}</option>`;
  });
}

function queueBattleFromExplore(id) {
  document.getElementById("fighter1Select").value = id;
  const other = careerData.find(c => c.id !== id);
  if (other) document.getElementById("fighter2Select").value = other.id;
  initBattle();
  scrollToBattle();
}

function initBattle() {
  const id1 = document.getElementById("fighter1Select").value;
  const id2 = document.getElementById("fighter2Select").value;

  if (id1 === id2) {
    alert("Select two distinct careers to duel!");
    return;
  }

  fighterL = careerData.find(c => c.id === id1);
  fighterR = careerData.find(c => c.id === id2);

  currentRound = 0;
  scoreL = 0;
  scoreR = 0;

  document.getElementById("arenaTitleL").innerText = fighterL.title;
  document.getElementById("arenaTitleR").innerText = fighterR.title;
  document.getElementById("nameFighter1").innerText = fighterL.title.split("/")[0];
  document.getElementById("nameFighter2").innerText = fighterR.title.split("/")[0];

  document.getElementById("avatar1").innerHTML = fighterL.avatar;
  document.getElementById("avatar2").innerHTML = fighterR.avatar;

  updateHpDisplays();
  document.getElementById("resultBanner").style.display = "none";
  loadRound(0);
}

function updateHpDisplays() {
  const totalRounds = battleScenarios.length;
  const hpPercent1 = Math.max(15, 100 - (scoreR * (100 / totalRounds)));
  const hpPercent2 = Math.max(15, 100 - (scoreL * (100 / totalRounds)));

  const hpBar1 = document.getElementById("hp1");
  const hpBar2 = document.getElementById("hp2");

  hpBar1.style.width = hpPercent1 + "%";
  hpBar2.style.width = hpPercent2 + "%";

  hpBar1.style.backgroundColor = hpPercent1 < 40 ? "var(--accent-red)" : "var(--accent-green)";
  hpBar2.style.backgroundColor = hpPercent2 < 40 ? "var(--accent-red)" : "var(--accent-green)";
}

function loadRound(idx) {
  if (idx >= battleScenarios.length) {
    finishBattle();
    return;
  }

  document.getElementById("roundIndicator").innerText = `ROUND ${idx + 1} / ${battleScenarios.length}`;
  const scen = battleScenarios[idx];
  document.getElementById("battleQuestionText").innerText = scen.question;

  const optsGrid = document.getElementById("battleOptionsGrid");
  optsGrid.innerHTML = "";

  scen.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "prompt-btn";
    btn.innerText = opt.label;
    btn.onclick = () => handleChoice(opt);
    optsGrid.appendChild(btn);
  });
}

function handleChoice(option) {
  const favorsL = option.pointsTo.includes(fighterL.id);
  const favorsR = option.pointsTo.includes(fighterR.id);

  const f1Wrap = document.getElementById("fighter1Wrap");
  const f2Wrap = document.getElementById("fighter2Wrap");
  const impact1 = document.getElementById("impact1");
  const impact2 = document.getElementById("impact2");

  if (favorsL && !favorsR) {
    scoreL++;
    f1Wrap.classList.add("punch-right");
    setTimeout(() => {
      f2Wrap.classList.add("hit-react");
      impact2.classList.add("show");
    }, 150);
  } else if (favorsR && !favorsL) {
    scoreR++;
    f2Wrap.classList.add("punch-left");
    setTimeout(() => {
      f1Wrap.classList.add("hit-react");
      impact1.classList.add("show");
    }, 150);
  } else {
    scoreL += 0.5;
    scoreR += 0.5;
    f1Wrap.classList.add("punch-right");
    f2Wrap.classList.add("punch-left");
    setTimeout(() => {
      impact1.classList.add("show");
      impact2.classList.add("show");
    }, 150);
  }

  setTimeout(() => {
    f1Wrap.classList.remove("punch-right", "hit-react");
    f2Wrap.classList.remove("punch-left", "hit-react");
    impact1.classList.remove("show");
    impact2.classList.remove("show");
    updateHpDisplays();
    currentRound++;
    loadRound(currentRound);
  }, 700);
}

function finishBattle() {
  document.getElementById("battleQuestionBox").innerHTML = `
    <div style="text-align:center; padding:10px;">
      <h3 style="margin-bottom:6px;">Showdown Concluded!</h3>
      <p style="font-size:0.9rem; color:var(--text-muted);">See your calculated alignment breakdown below.</p>
    </div>
  `;

  const banner = document.getElementById("resultBanner");
  banner.style.display = "block";

  let winner = null;
  let runnerUp = null;

  if (scoreL > scoreR) {
    winner = fighterL;
    runnerUp = fighterR;
  } else if (scoreR > scoreL) {
    winner = fighterR;
    runnerUp = fighterL;
  }

  if (winner) {
    document.getElementById("winnerText").innerText = `Winner: ${winner.title}`;
    document.getElementById("winnerSummary").innerHTML = `
      Based on your choices regarding daily ambiguity, problem-solving habits, and technical versus strategic preferences, 
      you lean noticeably toward <strong>${winner.title}</strong> over <strong>${runnerUp.title}</strong>.<br><br>
      <em>Next Recommended Action:</em> Head over to Part 2 (Interview Prep Module) to practice mock interview technical prompts for <strong>${winner.title}</strong> prior to the STEM Fair.
    `;
  } else {
    document.getElementById("winnerText").innerText = `Draw: Hybrid Career Alignment!`;
    document.getElementById("winnerSummary").innerHTML = `
      You scored an even split between <strong>${fighterL.title}</strong> and <strong>${fighterR.title}</strong>. 
      This is common for versatile roles like Product Managers or Technical Solutions Consultants who bridge both engineering and business operations.
    `;
  }

  banner.scrollIntoView({ behavior: "smooth" });
}

function resetBattle() {
  initBattle();
}

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  renderCareers();
  populateBattleSelectors();
  initBattle();
});