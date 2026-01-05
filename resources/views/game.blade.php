<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h2 id="greeting">Hello, x</h2>
    <button id="logoutBtn">Log out</button>

    <div class="resources">
        <p id="money">Money: 0</p>
        <p id="wood">Wood: 0</p>
        <p id="stone">Stone: 0</p>
        <p id="food">Food: 0</p>
    </div>

    <div class="buildings">
        <p id="lumbermill">Lumber mill level: 0</p>
        <button id="upgradeLumbermill">Upgrade cost: x</button>
        <p id="quarry">Quarry level: 0</p>
        <button id="upgradeQuarry">Upgrade cost: x</button>
        <p id="farm">Farm level: 0</p>
        <button id="upgradeFarm">Upgrade cost: x</button>
    </div>



    <script src="{{ asset('js/game.js') }}"></script>
</body>
</html>