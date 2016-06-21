# notify
A [dribbble inspired](https://dribbble.com/shots/1463784-Notifications-Dropdown) notification menu with a RESTful API server in node.js


##[Live demo here](https://agile-springs-96399.herokuapp.com/)
[![Website](https://img.shields.io/website-up-down-green-red/http/shields.io.svg?maxAge=2592000)](https://agile-springs-96399.herokuapp.com/) [![license](https://img.shields.io/github/license/mashape/apistatus.svg?maxAge=2592000)](http://mit-license.org/)


### Setup

* To being development run `npm install` first thing.
* Add `export NODE_ENV=development` to your bashrc/zshrc file.
* Run `npm start` and you'll be live!

### Development

* Globally install nodemon by `npm install nodemon -g`
* Run `npm run dev` and hack! :)


![](screenshots/1.png?raw=true)
![](screenshots/2.png?raw=true)

### Architecture

* The backend is written in node.js/express.js which releases a RESTful api.
* All CURD operations are possible via the RESTful api.
* The frontend fetches data from the api and uses Html5 `<template>` tags for
  templating the newly generated notifications.
* Design is too cute

### Credits
Wallpaper can be found at [Unsplash.com](https://unsplash.com/photos/lz5lokpqNJM)

### Contribution
Well this is kind of a learning project, feel free to fork it and happy hacking :)

### License
[MIT License](http://mit-license.org/)

Copyright (c) 2016 Shashank Srivastav
