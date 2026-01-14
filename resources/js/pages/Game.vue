<template>
    <div class="top">
        <div class="greeting">
            <h2 id="greeting">Hello, {{ name }}</h2>
            <button @click="logout">Log out</button>
        </div>

        <div class="resources">
            <div class="resource"><p>Coins: {{ money }}</p></div>
            <div class="resource"><p>Wood: {{ wood }}</p></div>
            <div class="resource"><p>Stone: {{ stone }}</p></div>
            <div class="resource"><p>Food: {{ food }}</p></div>
        </div>
    </div>

    <button @click="showLeaderboard" class="btn">Show Leaderboard</button> <br>
    <button @click="showInfo" class="btn">Game INFO</button>

    <div class="buildings">
        <div class="building building1">
            <img src="../assets/lumbermill.png" alt="" >
            <p id="lumbermill">Lumbermill level: {{ lumber_mill_level }}</p>
            <button @click="upgrade('lumber_mill')">{{ lumber_mill_price }}</button> 
        </div>
        <div class="building building2">
            <img src="../assets/quarry.png" alt="">
            <p id="quarry">Quarry level: {{ quarry_level }}</p>
            <button @click="upgrade('quarry')">{{quarry_price}}</button>
        </div>

        <div class="building building3">
            <img src="../assets/farm.png" alt=""> 
            <p id="farm">Farm level: {{ farm_level }}</p>
            <button @click="upgrade('farm')">{{ farm_price }}</button>
        </div>
    </div>

    <div class="resourcesCollection">
        <div class="collectedResources">
            <p>Coins: {{ collected_money }}<br>Wood: {{ collected_wood }}<br>Stone: {{ collected_stone }}<br>Food: {{ collected_food }}</p>
        </div>
        
        <button @click="collectResources">Collect</button>
    </div>

    <div id="achievments" class="achievments"></div>

    <div id="leaderboardPopup" class="popup">
        <div class="popup-content">
            <span @click="closeLeaderboard" class="close">&times;</span>
            <h2>Leaderboard</h2>
            <div class="leaderboardContainers">
                <div id="leaderboardContainer1"></div>
                <div id="leaderboardContainer2"></div>
            </div>
            
        </div>
    </div>

    <div id="infoPopup" class="info">
        <div class="info-content">
            <span @click="closeInfo" class="close">&times;</span>
            <ul>
                <li>For each building level you get 2 coins</li>
                <li>Every total 10 levels of buldings you get additional 1000 cap for each resource before collecting</li>
            </ul>
        </div>
        
    </div>

</template>

<script src="../game.js"></script>