[![Build Status](https://travis-ci.org/w3c/Eunomia.svg?branch=master)](https://travis-ci.org/w3c/Eunomia)

# Eunomia

:warning: This project is discontinued, and not being actively maintained.

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

Front page (not logged in):

<img src="https://w3c.github.io/Eunomia/screenshots/front-page-not-logged-in.png"
alt="Front page (not logged in)" width="256" />

Sign up:

<img src="https://w3c.github.io/Eunomia/screenshots/sign-up.png"
alt="Sign up" width="256" />

Log in:

<img src="https://w3c.github.io/Eunomia/screenshots/log-in.png"
alt="Log in" width="256" />

Front page (logged in):

<img src="https://w3c.github.io/Eunomia/screenshots/front-page-logged-in.png"
alt="Front page (logged in)" width="256" />

All people:

<img src="https://w3c.github.io/Eunomia/screenshots/people.png"
alt="All people" width="256" />

One person:

<img src="https://w3c.github.io/Eunomia/screenshots/person.png"
alt="One person" width="256" />

All meetings:

<img src="https://w3c.github.io/Eunomia/screenshots/meetings.png"
alt="All meetings" width="256" />

One meeting:

<img src="https://w3c.github.io/Eunomia/screenshots/meeting.png"
alt="One meeting" width="256" />

All locations:

<img src="https://w3c.github.io/Eunomia/screenshots/locations.png"
alt="All locations" width="256" />

One location:

<img src="https://w3c.github.io/Eunomia/screenshots/location.png"
alt="One location" width="256" />

All timezones:

<img src="https://w3c.github.io/Eunomia/screenshots/timezones.png"
alt="All timezones" width="256" />

One timezone:

<img src="https://w3c.github.io/Eunomia/screenshots/timezone.png"
alt="One timezone" width="256" />

## 3. Getting started

```bash
$ git clone https://github.com/w3c/Eunomia.git
$ cd Eunomia
$ sqlite3 -echo -bail eunomia.db < sql/create-db.sql
$ sqlite3 -echo -bail eunomia.db < sql/populate-db.sql
$ npm install
$ npm start
```

## 4. Testing

```bash
$ npm test
```

## 5. Documentation

Documentation for all JS files is generated using [JSDoc](http://usejsdoc.org/):

```bash
$ npm run jsdoc
```

See the documentation [on GitHub pages](https://w3c.github.io/Eunomia/doc/).

## 6. Credits

Copyright &copy; 2016&ndash;2019 [World Wide Web Consortium (W3C)](https://www.w3.org/).

This project is licenced [under the terms of the MIT licence](LICENSE.md).
