export default {
    name: "GamePage",
    data() {
        return {
            token: null,
            formatter: null,
            interval: null,

            name: "",
            money: "",
            wood: "",
            stone: "",
            food: "",

            lumber_mill_level: "",
            quarry_level: "",
            farm_level: "",

            lumber_mill_price: "",
            quarry_price: "",
            farm_price: "",

            collected_money: "",
            collected_wood: "",
            collected_stone: "",
            collected_food: "",
        };
    },
    mounted() {
        // storing token and checking if user is logged in
        this.token = localStorage.getItem('token');
        if (!this.token) {
            alert('You need to log in first!');
            window.location.href = '/';
        }

        // number formatter
        this.formatter = new Intl.NumberFormat('en', {
            notation: 'compact',
            compactDisplay: 'short'
        });

        // call function to load needed stats every 2 secconds
        this.intervalId = setInterval(() => {
            this.checkCollectables();
        }, 2000);

        // load everything on page load
        this.loadStats();
        this.loadPrices();
        this.checkCollectables();
        this.getAchievments();
    },
    beforeUnmount() {
        clearInterval(this.interval);
    },
    methods: {
        // log out the user
        async logout(){
            await fetch('/api/logout', {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + this.token }
            });
            localStorage.removeItem('token');
            window.location.href = '/';
        },

        loadStats(){
            fetch('/api/loadStats',{
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            })
            .then(res => {
                if(!res.ok) throw new Error("Not Auth");
                return res.json();
            })
            .then(data => {
                this.name = data.name;

                this.money = this.formatter.format(data.money);
                this.wood = this.formatter.format(data.wood);
                this.stone = this.formatter.format(data.stone);
                this.food = this.formatter.format(data.food);

                this.lumber_mill_level = data.lumber_mill_level;
                this.quarry_level = data.quarry_level;
                this.farm_level = data.farm_level;
            })
            .catch(err => console.error(err));
        },

        // load costs of upgrades
        loadPrices(){
            fetch('/api/loadPrices',{
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                }
            })
            .then(res => {
                if(!res.ok) throw new Error("Not Auth");
                return res.json();
            })
            .then(data => {
                this.lumber_mill_price = "Upgrade cost: " + data.lumber_mill.money + " coins";
                this.quarry_price = "Upgrade cost: " + data.quarry.money + " coins, " + data.quarry.wood + " wood";
                this.farm_price = "Upgrade cost: " + data.farm.money + " coins, " + data.farm.wood + " wood, " + data.farm.stone + " stone";
            })
            .catch(err => console.error(err));
        },

        // upgrade building
        upgrade(building){
            fetch('/api/upgrade', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                },
                body: JSON.stringify({building: building})
            })
            .catch(err => console.error(err));

            this.loadStats();
            this.loadPrices();
        },

        // check what is collected
        checkCollectables(){
            fetch('/api/checkCollectable',{
                method: 'get',
                headers: {
                    credentials: 'same-origin',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                }
            })
            .then(res => {
                if(!res.ok) throw new Error("Not Auth");
                return res.json();
            })
            .then(data => {
                this.collected_money = data.money;
                this.collected_wood = data.wood;
                this.collected_stone = data.stone;
                this.collected_food = data.food;
            })
            .catch(err => console.error(err));
        },

        // collect the resources
        collectResources(){
            fetch('/api/collectResources',{
                method: 'get',
                headers: {
                    credentials: 'same-origin',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                }
            })
            .then(res => {
                if(!res.ok) throw new Error("Not Auth");
                return res.json();
            })
            .then(data => {
                this.checkCollectables();
                this.loadStats();
                this.getAchievments();
            })
            .catch(err => console.error(err));
        },

        // get and render achievments
        getAchievments(){
            fetch('/api/getAchievments',{
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                }
            })
            .then(res => {
                if(!res.ok) throw new Error("Not Auth");
                return res.json();
            })
            .then(data => {
                const container = document.getElementById('achievments');
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
        },

        // leaderboard functions
        async showLeaderboard(){
            document.getElementById('leaderboardPopup').style.display = 'block';

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
        },

        closeLeaderboard(){
            document.getElementById('leaderboardPopup').style.display = 'none';
        },

        // info pop up functions
        showInfo(){
            document.getElementById('infoPopup').style.display = 'block';
        },

        closeInfo(){
            document.getElementById('infoPopup').style.display = 'none';
        }
    }
}