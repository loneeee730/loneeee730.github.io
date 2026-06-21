<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BMHL 4v4 - 28-0 Challenge</title>
  <style>
    :root {
      --primary: #00ccff;
      --bg: #0a0a1f;
      --card: #112233;
    }
    body {
      font-family: 'Arial', sans-serif;
      background: var(--bg);
      color: #ddd;
      padding: 20px;
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
    }
    .header { text-align: center; margin-bottom: 25px; }
    h1 {
      color: var(--primary);
      font-size: 2.8em;
      margin: 0;
      text-shadow: 0 0 15px rgba(0, 204, 255, 0.5);
    }
    .container {
      display: flex;
      gap: 25px;
      max-width: 1400px;
      width: 100%;
      flex-wrap: wrap;
      justify-content: center;
    }
    .main {
      flex: 1;
      min-width: 380px;
      max-width: 520px;
    }
    .roster-container {
      max-height: 65vh;
      overflow-y: auto;
      padding-right: 10px;
    }
    .player {
      background: #223344;
      margin: 8px 0;
      padding: 12px;
      border-radius: 10px;
      border: 2px solid #00ccff22;
      transition: all 0.2s;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .player:hover {
      border-color: var(--primary);
      box-shadow: 0 0 12px rgba(0, 204, 255, 0.4);
      transform: translateX(5px);
    }
    .player img {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      border: 3px solid #00ccff;
      object-fit: cover;
    }
    .sidebar {
      background: var(--card);
      padding: 25px;
      border-radius: 16px;
      border: 2px solid #00ccff33;
      width: 340px;
      height: fit-content;
    }
    .lines-container {
      width: 460px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .line {
      background: #1a2233;
      padding: 20px;
      border-radius: 16px;
      border: 2px solid #00ccff44;
    }
    .line h3 {
      color: var(--primary);
      margin: 0 0 18px 0;
      text-align: center;
    }
    .formation {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
    }
    .slot {
      width: 130px;
      background: #223344;
      border: 2px dashed #00ccff44;
      border-radius: 12px;
      padding: 12px 8px;
      text-align: center;
      transition: all 0.2s;
    }
    .slot.filled {
      border-style: solid;
      border-color: #00ffcc;
      background: #1f2a44;
    }
    .slot .pos {
      color: #00ffcc;
      font-size: 0.95em;
      font-weight: bold;
      margin-bottom: 6px;
    }
    .slot img {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      border: 2px solid #00ccff;
      object-fit: cover;
      margin-bottom: 6px;
    }
    .slot button {
      background: #c00;
      color: white;
      border: none;
      padding: 3px 8px;
      font-size: 12px;
      border-radius: 4px;
      cursor: pointer;
    }
    button {
      padding: 14px 28px;
      font-size: 18px;
      background: var(--primary);
      color: black;
      font-weight: bold;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      margin: 8px 4px;
      transition: 0.2s;
    }
    button:hover { background: #00ffcc; }
    button:disabled { background: #555; cursor: not-allowed; }

    #spinResult {
      font-size: 1.4em;
      min-height: 110px;
      margin: 15px 0;
      padding: 16px;
      background: #1a2233;
      border-radius: 12px;
      border-left: 6px solid var(--primary);
      text-align: center;
    }
    .highlight { color: #00ffaa; font-weight: bold; }

    #assignModal {
      display: none;
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.85);
      z-index: 1000;
      align-items: center;
      justify-content: center;
    }
    .modal-content {
      background: #112233;
      padding: 25px;
      border-radius: 16px;
      border: 2px solid var(--primary);
      max-width: 420px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🏒 BMHL 4v4 - 28-0 CHALLENGE 🏒</h1>
    <h2 id="teamNameDisplay" style="color:#00ccff;">Your Dynasty</h2>
  </div>

  <div class="container">
    <div class="main">
      <input type="text" id="teamNameInput" placeholder="Enter your team name" style="padding:12px; width:90%; font-size:16px; margin-bottom:10px;">
      <button onclick="setTeamName()">Set Team Name</button>
      <button onclick="clearRoster()" style="background:#c00;">Clear Roster</button><br><br>
      
      <button id="spinBtn" onclick="spin()">🎰 SPIN FOR PLAYER</button>
      <button onclick="simulateSeason()">🏒 SIMULATE 28 GAME SEASON</button>
      
      <div id="spinResult"></div>
      
      <div class="roster-container">
        <div id="team"></div>
      </div>
    </div>

    <div class="lines-container">
      <div class="line" id="line1">
        <h3>🔥 LINE 1 (4 Players)</h3>
        <div class="formation" id="line1-formation"></div>
      </div>
      <div class="line" id="line2">
        <h3>🔥 LINE 2 (4 Players)</h3>
        <div class="formation" id="line2-formation"></div>
      </div>
      <div class="line" id="goalies">
        <h3>🥅 GOALIES (2)</h3>
        <div class="formation" id="goalies-formation"></div>
      </div>
    </div>

    <div class="sidebar">
      <h3 style="color:var(--primary); margin-top:0;">📊 Season Results</h3>
      <div id="seasonResults" style="color:#aaa; line-height:1.6;">
        Click players in roster to assign them!
      </div>
    </div>
  </div>

  <!-- Assignment Modal -->
  <div id="assignModal">
    <div class="modal-content">
      <h3 id="modalPlayerName" style="color:var(--primary);"></h3>
      <p id="modalMessage" style="color:#aaa;"></p>
      <div id="slotOptions" style="display:flex; flex-direction:column; gap:8px; margin:20px 0;"></div>
      <button onclick="closeModal()" style="background:#555;">Cancel</button>
    </div>
  </div>

<script>
// ================== PLAYERS ==================
const playersPool = [ /* your full player list */ 
  { name: "2gapes", position: "LW", rating: 85, team: "Sacramento Sabretooths", image: "images/2gapes.png" },
  { name: "438zack", position: "FWD", rating: 95, team: "Sacramento Sabretooths", image: "images/438zack.png" },
  { name: "CoolBray000", position: "FWD", rating: 96, team: "Sacramento Sabretooths", image: "images/coolbray000.png" },
  { name: "Fullthrottlecaleb", position: "LW", rating: 90, team: "Sacramento Sabretooths", image: "images/fullthrottlecaleb.png" },
  { name: "GummyBlocks", position: "D", rating: 88, team: "Sacramento Sabretooths", image: "images/gummyblocks.png" },
  { name: "OhGodRun", position: "GK", rating: 86, team: "Sacramento Sabretooths", image: "images/ohgodrun.png" },
  { name: "qugl", position: "D", rating: 82, team: "Sacramento Sabretooths", image: "images/qugl.png" },
  { name: "RichPrinceNate", position: "FWD", rating: 87, team: "Sacramento Sabretooths", image: "images/richprincenate.png" },
  { name: "Sammyyy5028", position: "D", rating: 84, team: "Sacramento Sabretooths", image: "images/sammyyy5028.png" },
  { name: "vivaclog", position: "FWD", rating: 99, team: "Sacramento Sabretooths", image: "images/vivaclog.png" },
  { name: "zoticaz", position: "D", rating: 86, team: "Sacramento Sabretooths", image: "images/zoticaz.png" },

  { name: "305tobbydog", position: "G", rating: 92, team: "Montauk Mariners", image: "images/305tobbydog.png" },
  { name: "alexnickjr", position: "C", rating: 89, team: "Montauk Mariners", image: "images/alexnickjr.png" },
  { name: "AReasonableMike", position: "G", rating: 86, team: "Montauk Mariners", image: "images/areasonablemike.png" },
  { name: "bknackprod", position: "LW", rating: 90, team: "Montauk Mariners", image: "images/bknackprod.png" },
  { name: "bongoImao", position: "C", rating: 85, team: "Montauk Mariners", image: "images/bongolmao.png" },
  { name: "crownnprod", position: "LD", rating: 87, team: "Montauk Mariners", image: "images/crownnprod.png" },
  { name: "DidntAskNeverWiII", position: "RW", rating: 89, team: "Montauk Mariners", image: "images/didntaskneverwill.png" },
  { name: "Drizzzzzzzzzzy93", position: "LW", rating: 88, team: "Montauk Mariners", image: "images/drizzzzzzzzzzy93.png" },
  { name: "Gibbletoot", position: "RD", rating: 86, team: "Montauk Mariners", image: "images/gibbletoot.png" },
  { name: "Grizo", position: "LD", rating: 88, team: "Montauk Mariners", image: "images/grizo.png" },
  { name: "MiddleManChaos", position: "RD", rating: 87, team: "Montauk Mariners", image: "images/middlemanchaos.png" },
  { name: "rylanplaysfootball", position: "C", rating: 88, team: "Montauk Mariners", image: "images/rylanplaysfootball.png" },
  { name: "swashaprod", position: "RW", rating: 92, team: "Montauk Mariners", image: "images/swashaprod.png" },
  { name: "TrojanHorseAttack", position: "LD", rating: 90, team: "Montauk Mariners", image: "images/trojanhorseattack.png" },
  { name: "wnorya", position: "RD", rating: 86, team: "Montauk Mariners", image: "images/wnorya.png" },
  { name: "yvlcrimson", position: "G", rating: 84, team: "Montauk Mariners", image: "images/yvlcrimson.png" }
];

let myTeam = [];
let lines = { line1: [], line2: [], goalies: [] };
let teamName = "Your Dynasty";
const teamsList = ["Sacramento Sabretooths", "Montauk Mariners"];
const ROSTER_MAX = 10;

let spinInterval = null;
let selectedPlayerIndex = null;

function setTeamName() {
  const input = document.getElementById("teamNameInput").value.trim();
  if (input) {
    teamName = input;
    document.getElementById("teamNameDisplay").textContent = teamName;
  }
}

// ================== STRICT ASSIGNMENT ==================
function showAssignModal(index) {
  selectedPlayerIndex = index;
  const player = myTeam[index];
  const isGoalie = ["G", "GK"].includes(player.position);
  const isForward = ["LW", "RW", "FWD", "C"].includes(player.position);
  const isDefender = ["D", "LD", "RD"].includes(player.position);

  document.getElementById("modalPlayerName").textContent = `Assign ${player.name} (${player.position})`;
  const optionsDiv = document.getElementById("slotOptions");
  optionsDiv.innerHTML = "";

  if (isGoalie) {
    for (let i = 0; i < 2; i++) {
      if (!lines.goalies[i]) {
        const btn = document.createElement("button");
        btn.textContent = `Goalie Slot ${i+1}`;
        btn.onclick = () => assignToSlot('goalies', i);
        optionsDiv.appendChild(btn);
      }
    }
  } else if (isForward) {
    ["line1", "line2"].forEach(lineKey => {
      const current = lines[lineKey];
      if (current.length < 4) {
        const btn = document.createElement("button");
        btn.textContent = `${lineKey.toUpperCase()} - Forward Slot`;
        btn.onclick = () => assignToSlot(lineKey, current.length);
        optionsDiv.appendChild(btn);
      }
    });
  } else if (isDefender) {
    ["line1", "line2"].forEach(lineKey => {
      const current = lines[lineKey];
      if (current.length < 4) {
        const btn = document.createElement("button");
        btn.textContent = `${lineKey.toUpperCase()} - Defense Slot`;
        btn.onclick = () => assignToSlot(lineKey, current.length);
        optionsDiv.appendChild(btn);
      }
    });
  }

  if (optionsDiv.children.length === 0) {
    optionsDiv.innerHTML = "<p style='color:#ff6666;'>No valid open slots available for this player.</p>";
  }

  document.getElementById("assignModal").style.display = "flex";
}

function assignToSlot(lineKey, slotIndex) {
  const player = myTeam[selectedPlayerIndex];

  // Duplicate check
  let alreadyUsed = false;
  Object.keys(lines).forEach(key => {
    if (lines[key].some(p => p && p.name === player.name)) alreadyUsed = true;
  });
  if (alreadyUsed) {
    alert("This player is already assigned!");
    closeModal();
    return;
  }

  lines[lineKey][slotIndex] = player;
  closeModal();
  renderRoster();
  renderLines();
}

function closeModal() {
  document.getElementById("assignModal").style.display = "none";
  selectedPlayerIndex = null;
}

// Spin function
function spin() {
  const btn = document.getElementById("spinBtn");
  const resultDiv = document.getElementById("spinResult");
  
  if (myTeam.length >= ROSTER_MAX) {
    alert(`Roster full (${ROSTER_MAX}/${ROSTER_MAX})!`);
    return;
  }

  const draftedNames = myTeam.map(p => p.name);
  let available = playersPool.filter(p => !draftedNames.includes(p.name));

  if (available.length === 0) {
    alert("No players left!");
    return;
  }

  btn.disabled = true;
  btn.textContent = "🎰 SPINNING...";

  let spinCount = 0;
  const maxSpins = 28;

  if (spinInterval) clearInterval(spinInterval);

  spinInterval = setInterval(() => {
    spinCount++;
    const randomPlayer = available[Math.floor(Math.random() * available.length)];
    
    resultDiv.innerHTML = `
      <span style="opacity:0.7;">🎰 Spinning...</span><br>
      <strong>${randomPlayer.name}</strong><br>
      ${randomPlayer.position} • ${randomPlayer.rating} OVR
    `;

    if (spinCount >= maxSpins) {
      clearInterval(spinInterval);
      
      const randomTeam = teamsList[Math.floor(Math.random() * teamsList.length)];
      const teamAvailable = available.filter(p => p.team === randomTeam);
      const finalPool = teamAvailable.length > 0 ? teamAvailable : available;
      const player = finalPool[Math.floor(Math.random() * finalPool.length)];

      myTeam.push(player);

      resultDiv.innerHTML = `
        <span style="color:#ffd700; font-size:1.6em;">✅ DRAFTED!</span><br>
        <strong>${player.name}</strong><br>
        ${player.position} • ${player.rating} OVR<br>
        <small>from ${randomTeam}</small>
      `;

      renderRoster();
      btn.disabled = false;
      btn.textContent = "🎰 SPIN FOR PLAYER";
    }
  }, 85);
}

function renderRoster() {
  const teamDiv = document.getElementById("team");
  teamDiv.innerHTML = `<h3 style="color:var(--primary);">Roster: ${myTeam.length}/${ROSTER_MAX} (Click to assign)</h3>`;

  myTeam.forEach((player, index) => {
    const div = document.createElement("div");
    div.className = "player";
    div.onclick = () => showAssignModal(index);
    div.innerHTML = `
      <img src="${player.image}" alt="${player.name}" onerror="this.src='https://via.placeholder.com/60/00ccff/000?text=${player.name[0]}'">
      <div style="flex:1; text-align:left;">
        <strong>${player.name}</strong><br>
        ${player.position} — ${player.rating} OVR<br>
        <small>${player.team}</small>
      </div>
      <button onclick="removePlayer(${index}); event.stopImmediatePropagation()" style="background:#c00; color:white; padding:6px 10px; font-size:14px;">X</button>
    `;
    teamDiv.appendChild(div);
  });
}

function renderLines() {
  renderLine("line1", "line1-formation");
  renderLine("line2", "line2-formation");
  renderGoalies();
}

function renderLine(lineKey, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  const positions = ["LW", "C", "RW", "D"];
  const players = lines[lineKey] || [];

  positions.forEach((pos, i) => {
    const slot = document.createElement("div");
    slot.className = "slot" + (players[i] ? " filled" : "");

    if (players[i]) {
      slot.innerHTML = `
        <div class="pos">${pos}</div>
        <img src="${players[i].image}" onerror="this.src='https://via.placeholder.com/52/00ccff/000?text=${players[i].name[0]}'">
        <strong>${players[i].name}</strong><br>
        <small>${players[i].rating} OVR</small>
        <button onclick="removeFromLine('${lineKey}', ${i}); event.stopImmediatePropagation()">X</button>
      `;
    } else {
      slot.innerHTML = `<div