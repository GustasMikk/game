document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;

    const token = grecaptcha.getResponse();
    if (!token) {
        document.getElementById('message').textContent = "Please complete the CAPTCHA";
        return;
    }

    const data = {
        name: form.name.value,
        password: form.password.value,
        'g-recaptcha-response': token
    };

    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const json = await res.json();
    const message = document.getElementById('message');

    if (res.ok) {
        localStorage.setItem('token', json.token);
        message.textContent = 'Login successful';
        setTimeout(() => window.location.href = '/game', 1000);
    } else {
        message.textContent = json.message;
        grecaptcha.reset();
    }
});