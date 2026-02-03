# ShopProject: Demo Laravel/React E-Commerce Platform

A full-stack demo e-commerce application built with **Laravel 12**, **Inertia.js**, **Typescript** and **React**. 

##  Overview

ShopProject is a multi-role marketplace where:
- **Customers** can browse products, manage a shopping cart (session/database persistent), checkout, and track orders.
- **Suppliers** can manage their inventory, import products via CSV, and monitor sales performance through a dedicated dashboard.

## Tech Stack

- **Backend**: PHP 8.3+, Laravel 12
- **Frontend**: React (with TypeScript/JSX mix), Inertia.js (v2.0), Tailwind CSS
- **Database**: MySQL 8.0
- **Analysis & Quality**: PHPStan (Level 5+), Laravel Pint, ESLint
- **Infrastructure**: Docker & Docker Compose support

## Key Features

### Customer Experience
- **Persistent Cart**: Seamless transition between guest and authenticated sessions.
- **Product Discovery**: Category filtering, featured carousels, and "deal of the day" highlights.
- **Order Management**: Real-time order status tracking and history.

### Supplier Management
- **Bulk Import**: Highly scalable CSV import engine with row-level validation and error reporting.
- **Inventory Control**: Real-time stock management and product performance metrics.
- **Sales Analytics**: Overview of orders and revenue generated.

##  Installation

### Using Docker (Recommended)
1. Clone the repository.
2. Run `docker-compose up -d`.
3. Run migrations and seeders:
   ```bash
   docker-compose exec app php artisan migrate --seed
   ```

### Manual Setup
1. **Requirements**: PHP 8.3+, Node.js 20+, MySQL.
2. **Environment**:
   ```bash
   cp .env.example .env
   # Update database credentials in .env
   ```
3. **Dependencies**:
   ```bash
   composer install
   npm install
   ```
4. **Initialization**:
   ```bash
   php artisan key:generate
   php artisan migrate --seed
   npm run build
   ```

##  Testing & Quality

- **Static Analysis**: `vendor/bin/phpstan analyse`
- **Automated Tests**: `php artisan test`
- **Code Style**: `vendor/bin/pint`

---

##  Credentials (Seeded Data)

| Role | Email | Password |
| :--- | :--- | :--- |
| **Customer** | `testcustomer@test.com` | `password` |
| **Supplier** | `testsupplier@test.com` | `password` |

