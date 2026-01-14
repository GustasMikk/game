<template>
    <h1>Register</h1>
    <form @submit.prevent="handleRegister" class="form ">
        <input type="text" v-model="name" placeholder="Username" required>
        <input type="email" v-model="email" placeholder="Email@email" required>
        <input type="password" v-model="password" placeholder="Password" required>
        <button type="submit" :disabled="loading">{{ loading ? 'Registering...' : 'Register' }}</button>

        <div class="g-recaptcha" :data-sitekey="recaptchaSiteKey"></div>
    </form>

    <p id="message">{{ message }}</p>
    <p>
        Already have an account? 
        <a :href="loginUrl">Go back</a>
    </p>
</template>

<script src="../register.js"></script>