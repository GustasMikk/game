<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <link rel="stylesheet" href="{{ asset('css/welcome.css') }}">
</head>
<body>
    <h1>Clicker Game</h1>
    <form id="loginForm" class="form">
        @csrf
        <input type="text" id="name" name="name" placeholder="Username" required>
        <input type="password" id="password" name="password" placeholder="Password" required>
        <button type="submit">Login</button>
        <div class="g-recaptcha"
            data-sitekey="{{ env('RECAPTCHA_SITE_KEY') }}">
        </div>
    </form>

    <p id="message"></p>
    <p>
        Don’t have an account? <a href="{{ route('register') }}">Register here</a>
    </p>
    
    <script src="{{ asset('js/login.js') }}"></script>
</body>
</html>