<template>
  <div class="login-page">
    <h1>Clicker Game</h1>

    <form @submit.prevent="handleLogin" class="form">
      <input
        type="text"
        v-model="name"
        placeholder="Username"
        required
      />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />

      <button type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>

      <div
        class="g-recaptcha"
        :data-sitekey="recaptchaSiteKey"
      ></div>
    </form>

    <p id="message">{{ message }}</p>

    <p>
      Don’t have an account?
      <a :href="registerUrl">Register here</a>
    </p>
  </div>
</template>

<script src="../login.js"></script>
