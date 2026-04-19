# Hostinger PHP + MySQL API (CredSkill)

This folder contains a Hostinger-native PHP + MySQL backend for:
- Signup
- Login
- Save profile + score
- Interested users lead capture

## Files
- config.php
- signup.php
- login.php
- saveProfile.php
- interested.php
- schema.sql

## Hostinger setup
1. In hPanel, create a MySQL database and user.
2. Open phpMyAdmin and run schema.sql.
3. If your users table already exists without a role column, run migrations/001_add_role_to_users.sql.
4. Upload this php-api folder to public_html/php-api.
5. Set DB credentials in config.php, or set environment vars if your host supports them:
   - DB_HOST
   - DB_USER
   - DB_PASS
   - DB_NAME

## Frontend env
Set this in your frontend deployment:
NEXT_PUBLIC_PHP_API_BASE=https://yourdomain.com/php-api

## Quick endpoint checks
- POST /php-api/signup.php
- POST /php-api/login.php
- POST /php-api/saveProfile.php
- POST /php-api/interested.php

Use application/x-www-form-urlencoded request bodies.
