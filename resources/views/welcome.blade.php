<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <form id="loginForm">
        @csrf
        <input type="text" id="name" name="name" placeholder="Username" required>
        <input type="password" id="password" name="password" placeholder="Password" required>
        <button type="submit">Login</button>
    </form>

    <p id="message"></p>
    <p>
        Don’t have an account? <a href="{{ route('register') }}">Register here</a>
    </p>

    <script src="{{ asset('js/login.js') }}"></script>
</body>
</html>