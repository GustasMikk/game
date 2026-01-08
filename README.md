# How to start the project

1. **Download or copy** the project.

2. **Open Command Prompt** and cd into the project:
```
cd to/project/
```

3. **Install composer** inside the project:
```
composer install
```

4. **Copy .env file**:
```
copy .env.example .env
```

5. **Generate key**:
```
php artisan key:generate
```

6. **Create database** and update these lines in .env according to your database:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=game
DB_USERNAME=root
DB_PASSWORD= 
``` 

7. **Run migrations and seeders** to create tables with users for leaderboard:
```
php artisan migrate --seed
```


6. **Run the project** and open it in web browser http://127.0.0.1:8000:
```
php artisan serve
```
