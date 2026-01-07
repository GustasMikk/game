<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <link rel="stylesheet" href="{{ asset('css/game.css') }}">
</head>
<body>
    <div class="top">
        <div class="greeting">
            <h2 id="greeting">Hello, x</h2>
            <button id="logoutBtn">Log out</button>
        </div>

        <div class="resources">
            <div class="resource"><p id="money">Coins: 0</p></div>
            <div class="resource"><p id="wood">Coins: 0</p></div>
            <div class="resource"><p id="stone">Coins: 0</p></div>
            <div class="resource"><p id="food">Coins: 0</p></div>
        </div>
    </div>

    <div class="buildings">
        <div class="building">
            <p id="lumbermill">Lumbermill level: 0</p>
            <button id="upgradeLumbermill">Upgrade cost: x</button> 
        </div>
        <div class="building">
            <p id="quarry">Quarry level: 0</p>
            <button id="upgradeQuarry">Upgrade cost: x</button>
        </div>

        <div class="building">
            <p id="farm">Farm level: 0</p>
            <button id="upgradeFarm">Upgrade cost: x</button>
        </div>
    </div>

    <button id="collectMoney">Collect money</button>

    <div id="achievments"></div>

    <!-- Leaderboard Popup -->
    <div id="leaderboardPopup" class="popup">
    <div class="popup-content">
        <span id="closeLeaderboard" class="close">&times;</span>
        <h2>Leaderboard</h2>
        <div id="leaderboardContainer"></div>
    </div>
    </div>

    <!-- Button to open leaderboard -->
    <button id="showLeaderboard">Show Leaderboard</button>


    <script src="{{ asset('js/game.js') }}"></script>
</body>
</html>