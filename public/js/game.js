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

// buttons for upgrading
document.getElementById('upgradeLumbermill').addEventListener('click', () => upgrade('lumber_mill'));
document.getElementById('upgradeQuarry').addEventListener('click', () => upgrade('quarry'));
document.getElementById('upgradeFarm').addEventListener('click', () => upgrade('farm'));

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
        document.getElementById('upgradeLumbermill').textContent = "Upgrade cost: " + data.lumber_mill + " coins";
        document.getElementById('upgradeQuarry').textContent = "Upgrade cost: " + data.quarry + " coins";
        document.getElementById('upgradeFarm').textContent = "Upgrade cost: " + data.farm + " coins";
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

// load data every 2s
setInterval(loadStats, 2000);

loadStats();
loadPrices();