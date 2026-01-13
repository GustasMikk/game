import { createApp } from 'vue'

createApp({
    data() {
        return {
            name: '',
            password: '',
            message: '',
        }
    },
    methods: {
        async submit() {
            const token = grecaptcha.getResponse()
            if (!token) {
                this.message = 'Please complete the CAPTCHA'
                return
            }

            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    name: this.name,
                    password: this.password,
                    'g-recaptcha-response': token,
                })
            })

            const json = await res.json()

            if (res.ok) {
                localStorage.setItem('token', json.token)
                this.message = 'Login successful'
                setTimeout(() => window.location.href = '/game', 1000)
            } else {
                this.message = json.message
                grecaptcha.reset()
            }
        }
    }
}).mount('#login-app')
