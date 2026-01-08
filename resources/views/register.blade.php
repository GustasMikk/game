<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <link rel="stylesheet" href="{{ asset('css/register.css') }}">
</head>
<body>
    <h1>Register</h1>
    <form id="registerForm" class="form">
        @csrf
        <input name="name" type="text" placeholder="Username" required>
        <input name="email" type="email" placeholder="Email" required>
        <input name="password" type="password" placeholder="Password" required>
        <button type="submit">Register</button>
        <div class="g-recaptcha"
            data-sitekey="{{ env('RECAPTCHA_SITE_KEY') }}">
        </div>
    </form>
    <p id="message"></p>
    <p>Already have an account?<a href="{{ route('welcome') }}">Go back</a><p>

    <script src="{{ asset('js/register.js') }}"></script>
</body>
</html>