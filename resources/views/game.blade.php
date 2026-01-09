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

    <button id="showLeaderboard" class="btn">Show Leaderboard</button> <br>
    <button id="showInfo" class="btn">Game INFO</button>

    <div class="buildings">
        <div class="building" style="rotate: 0.5 1 0 10deg; box-shadow: -4px 4px 3px rgb(85, 85, 85)">
            <img src="{{ asset('photos/lumbermill.png') }}" alt="" style="box-shadow: -4px 4px 3px rgb(85, 85, 85)">
            <p id="lumbermill">Lumbermill level: 0</p>
            <button id="upgradeLumbermill" style="box-shadow: -4px 4px 3px rgb(85, 85, 85)">Upgrade cost: x</button> 
        </div>
        <div class="building" style="box-shadow: 0px 4px 3px rgb(85, 85, 85)">
            <img src="{{ asset('photos/quarry.png') }}" alt="" style="box-shadow: 0px 4px 3px rgb(85, 85, 85)">
            <p id="quarry">Quarry level: 0</p>
            <button id="upgradeQuarry" style="box-shadow: 0px 4px 3px rgb(85, 85, 85)">Upgrade cost: x</button>
        </div>

        <div class="building" style="rotate: -0.5 1 0 10deg; box-shadow: 4px 4px 3px rgb(85, 85, 85)">
            <img src="{{ asset('photos/farm.png') }}" alt="" style="box-shadow: 4px 4px 3px rgb(85, 85, 85)"> 
            <p id="farm">Farm level: 0</p>
            <button id="upgradeFarm" style="box-shadow: 4px 4px 3px rgb(85, 85, 85)">Upgrade cost: x</button>
        </div>
    </div>

    <div class="resourcesCollection">
        <div class="collectedResources">
            <p id="collectedResources">Coins: 1000<br>Wood: 1000<br>Stone: 1000<br>Food: 1000</p>
        </div>
        
        <button id="collectMoney">Collect</button>
    </div>

    <div id="achievments" class="achievments"></div>

    <div id="leaderboardPopup" class="popup">
        <div class="popup-content">
            <span id="closeLeaderboard" class="close">&times;</span>
            <h2>Leaderboard</h2>
            <div class="leaderboardContainers">
                <div id="leaderboardContainer1"></div>
                <div id="leaderboardContainer2"></div>
            </div>
            
        </div>
    </div>

    <div id="infoPopup" class="info">
        <div class="info-content">
            <span id="closeInfo" class="close">&times;</span>
            <ul>
                <li>For each building level you get 2 coins</li>
                <li>Every total 10 levels of buldings you get additional 1000 cap for each resource before collecting</li>
            </ul>
        </div>
        
    </div>

    <script src="{{ asset('js/game.js') }}"></script>
</body>
</html>