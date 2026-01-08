const token = localStorage.getItem('token');
if (!token) {
    alert('You need to log in first!');
    window.location.href = '/';
}


// logout
document.getElementById('logoutBtn').addEventListener('click', async () => {
    await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token }
    });
    localStorage.removeItem('token');
    window.location.href = '/';
});

// buttons
document.getElementById('upgradeLumbermill').addEventListener('click', () => upgrade('lumber_mill'));
document.getElementById('upgradeQuarry').addEventListener('click', () => upgrade('quarry'));
document.getElementById('upgradeFarm').addEventListener('click', () => upgrade('farm'));

document.getElementById('collectMoney').addEventListener('click', () => collectResources());

const openBtn = document.getElementById('showLeaderboard');
const closeBtn = document.getElementById('closeLeaderboard');

const infoBtn = document.getElementById('showInfo');
const infoCloseBtn = document.getElementById('closeInfo');

//
const container = document.getElementById('achievments');
const popup = document.getElementById('leaderboardPopup');
const infoPopup = document.getElementById('infoPopup');

// load stats

function loadStats(){
    fetch('/api/loadStats',{
        method: 'get',
        headers: {
            credentials: 'same-origin',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(res => {
        if(!res.ok) throw new Error("Not Auth");
        return res.json();
    })
    .then(data => {
        document.getElementById('greeting').textContent = "Hello, " + data.name;

        document.getElementById('money').textContent = "Coins: " + data.money;
        document.getElementById('wood').textContent = "Wood: " + data.wood;
        document.getElementById('stone').textContent = "Stone: " + data.stone;
        document.getElementById('food').textContent = "Food: " + data.food;

        document.getElementById('lumbermill').textContent = "Lumber mill level : " + data.lumber_mill_level;
        document.getElementById('quarry').textContent = "Quarry level:  " + data.quarry_level;
        document.getElementById('farm').textContent = "Farm level: " + data.farm_level;
    })
    .catch(err => console.error(err));
}

// collect resources

function collectResources(){
    fetch('/api/collectResources',{
        method: 'get',
        headers: {
            credentials: 'same-origin',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(res => {
        if(!res.ok) throw new Error("Not Auth");
        return res.json();
    })
    .then(data => {
        checkCollectable();
        loadStats();
        getAchievments();
    })
    .catch(err => console.error(err));
}

// check what resources are collected

function checkCollectable(){
    fetch('/api/checkCollectable',{
        method: 'get',
        headers: {
            credentials: 'same-origin',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(res => {
        if(!res.ok) throw new Error("Not Auth");
        return res.json();
    })
    .then(data => {
        document.getElementById('collectedResources').innerHTML = `Coins: ${data.money}<br>Wood: ${data.wood}<br>Stone: ${data.stone}<br>Food: ${data.food}<br>`;
    })
    .catch(err => console.error(err));
}

// load prices

function loadPrices(){
    fetch('/api/loadPrices',{
        method: 'get',
        headers: {
            credentials: 'same-origin',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(res => {
        if(!res.ok) throw new Error("Not Auth");
        return res.json();
    })
    .then(data => {
        document.getElementById('upgradeLumbermill').textContent = "Upgrade cost: " + data.lumber_mill.money + " coins";
        document.getElementById('upgradeQuarry').textContent = "Upgrade cost: " + data.quarry.money + " coins, " + data.quarry.wood + " wood";
        document.getElementById('upgradeFarm').textContent = "Upgrade cost: " + data.farm.money + " coins, " + data.farm.wood + " wood, " + data.farm.stone + " stone";
    })
    .catch(err => console.error(err));
}

//upgrade

function upgrade(building){
    fetch('/api/upgrade', {
        method: 'POST',
        headers: {
            //credentials: 'same-origin',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({building: building})
    })
    .then(res => res.json())
    .then(data => {
        //alert(data.message);

        //document.getElementById('money').textContent = "Money: " + data.money;
        //document.getElementById(data.building + '_level').textContent = data.building + ": " + data[data.building + '_level'];
    })
    .catch(err => console.error(err));

    loadStats();
    loadPrices();
}

// get and render achievements

function getAchievments(){
    fetch('/api/getAchievments',{
        method: 'get',
        headers: {
            credentials: 'same-origin',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(res => {
        if(!res.ok) throw new Error("Not Auth");
        return res.json();
    })
    .then(data => {
        container.innerHTML = '<h1>Achievements</h1>';

        data.forEach(a => {
            const unlocked = a.achieved === 'true';
            container.innerHTML += `
                <div class="achievement${unlocked ? 'Unlocked' : 'Locked'}">
                    <strong>${a.name}</strong>
                    <span>${unlocked ? '✓ Achieved' : '❌ Locked'}</span>
                </div>
             `;
        });
    })
    .catch(err => console.error(err));
}

// leaderboard functions

async function getLeaderboard(){
    const response = await fetch('/api/getLeaderboard');
    const data = await response.json();

    const container1 = document.getElementById('leaderboardContainer1');
    const container2 = document.getElementById('leaderboardContainer2');

    container1.innerHTML = '';
    container2.innerHTML = '';

    data.forEach((player, index) =>{
        if(index <25){
            const div = document.createElement('div');

            div.className = 'players';
            div.innerHTML = `
            <span>#${index + 1}</span>
            <span>${player.name}</span>
            <span>Total building levels: ${player.total_level}</span>
            `;
            container1.appendChild(div);
        }
        else{
            const div = document.createElement('div');

            div.className = 'players';
            div.innerHTML = `
            <span>#${index + 1}</span>
            <span>${player.name}</span>
            <span>Total building levels: ${player.total_level}</span>
            `;
            container2.appendChild(div);
        }
    });
}

openBtn.addEventListener('click', () => {
    popup.style.display = 'block';
    getLeaderboard();
});

closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

// open and close info

infoBtn.addEventListener('click', () => {
    infoPopup.style.display = 'block';
    getLeaderboard();
});

infoCloseBtn.addEventListener('click', () => {
    infoPopup.style.display = 'none';
});

// load data every 2s
setInterval(checkCollectable, 2000);

// load on page load
getAchievments();
loadStats();
loadPrices();