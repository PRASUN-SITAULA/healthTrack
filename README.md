<h1 align="center">Health Track</h1>
<p align="center">
  <img src="https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white">
  <img src="https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=fff">
  <img src="https://github.com/PRASUN-SITAULA/carbonWise/assets/89672957/106f3a07-d14a-4ee9-9e0c-c8cfbc635a79">
</p>

## Description
Health Track is a web application designed to help users track their health metrics like height, weight and blood sugar and
monitor their progress towards their health goals.
The application provides users with a user-friendly interface to input their health metrics and
view their progress.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation Guide](#installation-guide)
- [License](#license)

## Features

**Tracking Health Metrics**: The application allows users to input their health metrics such as weight, height, blood glucose level, and sleep duration. The user can also view their progress towards their health goals.

**Water Intake Tracker**: The application provides a water intake tracker that allows users to input their daily water intake and monitor their progress towards their daily water intake goal.

**Charts**: The application provides charts that visualize the user's health metrics and progress towards their health goals.

## Technologies

This project is built using the following technologies:

- Next.js: Frontend framework for building user interfaces.
- Supabase: Database for storing user data.
- Shadcn UI: UI library for styling.
- Authentication: User authentication using lucia-auth.

## Installation Guide

### Clone this repository
```bash
git clone https://github.com/PRASUN-SITAULA/healthTrack.git
```
### Go into the repository
```bash
cd healthTrack
```
### Install packages
```bash
npm install
```
### Configuration
- Create a .env file and add the following:
```bash
DATABASE_URL=[INSERT SUPABASE Database URL]
DIRECT_URL=[INSERT SUPABASE Database DIRECT URL]
```
### Prisma Setup
```bash
npx prisma db push
npx prisma generate
```
### Run the Development Server
```bash
npm run dev
```
### Visit the Page
```bash
Open your browser and navigate to http://localhost:3000.
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
