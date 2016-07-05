[![Build Status](https://travis-ci.org/w3c/Eunomia.svg?branch=master)](https://travis-ci.org/w3c/Eunomia)

# Eunomia

A tool to manage recurrent WebEx meetings

1. [Introduction](#1-introduction)
1. [Screenshots](#2-screenshots)
1. [Getting started](#3-getting-started)
1. [Testing](#4-testing)
1. [Documentation](#5-documentation)
1. [Credits](#6-credits)

## 1. Introduction

This is a [Geek Week](https://www.w3.org/blog/2015/10/geek-week-at-w3c/) 2016 project at the [World Wide Web Consortium (W3C)](https://www.w3.org/).

The goal is to manage all recurrent [WebEx](https://www.webex.com/) teleconferences with their details, times and associates timezones; and to let users view
them according to their own timezone.

## 2. Screenshots

![Front page (not logged in)](https://w3c.github.io/Eunomia/screenshots/front-page-not-logged-in.png)
![Sign up](https://w3c.github.io/Eunomia/screenshots/sign-up.png)
![Log in](https://w3c.github.io/Eunomia/screenshots/log-in.png)
![Front page (logged in)](https://w3c.github.io/Eunomia/screenshots/front-page-logged-in.png)
![All people](https://w3c.github.io/Eunomia/screenshots/people.png)
![One person](https://w3c.github.io/Eunomia/screenshots/person.png)
![All meetings](https://w3c.github.io/Eunomia/screenshots/meetings.png)
![One meeting](https://w3c.github.io/Eunomia/screenshots/meeting.png)
![All locations](https://w3c.github.io/Eunomia/screenshots/locations.png)
![One location](https://w3c.github.io/Eunomia/screenshots/location.png)
![All timezones](https://w3c.github.io/Eunomia/screenshots/timezones.png)
![One timezone](https://w3c.github.io/Eunomia/screenshots/timezone.png)

## 2. Getting started

```bash
$ git clone https://github.com/w3c/Eunomia.git
$ cd Eunomia
$ sqlite3 -echo -bail eunomia.db < sql/create-db.sql
$ sqlite3 -echo -bail eunomia.db < sql/populate-db.sql
$ npm install
$ npm start
```

## 3. Testing

```bash
$ npm test
```

## 4. Documentation

Documentation for all JS files is generated using [JSDoc](http://usejsdoc.org/):

```bash
$ npm run jsdoc
```

See the documentation [on GitHub pages](https://w3c.github.io/Eunomia/doc/).

## 5. Credits

Copyright &copy; 2016 [World Wide Web Consortium (W3C)](https://www.w3.org/).

This project is licenced [under the terms of the MIT licence](LICENSE.md).
