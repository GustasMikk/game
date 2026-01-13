import { createApp } from 'vue';
import LoginPage from './pages/Login.vue'; // adjust path

// Only mount if the element exists (so you can use Blade elsewhere)
const loginElement = document.getElementById('login-app');
if (loginElement) {
    createApp(LoginPage).mount('#login-app');
}
