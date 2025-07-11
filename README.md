



## Notes

Live Demo URL http://138.68.171.131/

Supplier User:

Seeded Customer 

Email : testcustomer@test.com 
password : password

Seeded Supplier

email:testsupplier@test.com
password: password


## About myshop

## build using reactjs, vite, inertia, primereact, Spatie permissions, Sanctum, TailWind

Installation and Setup Instructions

## Requirements

Make sure the following are installed and properly configured:

- PHP 8.3+
- Composer
- MySQL Server (on the same machine)
- Nginx
- Node.js & npm

## Installation Instructions

- Assuming a default installation using php8.3+ nginx & mysql server installed on the same server.
- clone to working dir and setup as usual
- copy the .env.example to .env and change vars according your system
- composer install
- Create a new Mysql Database  
- copy variables from .env.example and create .env in the same directory
- Replace the values for the DB with your Mysql Database credentials
  - DB_DATABASE=your_database_name
  - DB_USERNAME=your_mysql_username
  - DB_PASSWORD=your_mysql_password
  
- php artisan key:generate
- php artisan optimize
- php artisan migrate
- php artisan db:seed

Install Front end Dependencies
- npm install
- npm run build (or npm run dev on local)
