import { createApp } from 'vue';
import LoginPage from './pages/Login.vue'; // adjust path
import RegisterPage from './pages/Register.vue';
import GamePage from './pages/Game.vue';

// Only mount if the element exists (so you can use Blade elsewhere)
const loginElement = document.getElementById('login-app');
if (loginElement) {
    createApp(LoginPage).mount('#login-app');
}

const registerElement = document.getElementById('register-app');
if (registerElement){
    createApp(RegisterPage).mount('#register-app')
}

const gameElement = document.getElementById('game-app');
if (gameElement){
    createApp(GamePage).mount('#game-app')
}
