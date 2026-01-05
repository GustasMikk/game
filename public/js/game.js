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

// load stats

function loadStats(){
    

    fetch('/api/loadStats',{
        headers: {
            method: 'get',
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

        document.getElementById('money').textContent = "Money : " + data.money;
        document.getElementById('wood').textContent = "Wood: " + data.wood;
        document.getElementById('stone').textContent = "Stone : " + data.stone;
        document.getElementById('food').textContent = "Food: " + data.food;

        document.getElementById('lumbermill').textContent = "Lumber mill level : " + data.lumber_mill_level;
        document.getElementById('quarry').textContent = "Quarry level:  " + data.quarry_level;
        document.getElementById('farm').textContent = "Farm level: " + data.farm_level;
    })
    .catch(err => console.Error(err))
}

// load data every 2s
//setInterval(loadStats, 2000);
loadStats();