# notify
  A [dribbble inspired](https://dribbble.com/shots/1463784-Notifications-Dropdown) notification menu with a RESTful API server in node.js
  
##[Live demo here](https://agile-springs-96399.herokuapp.com/)

### Setup

* To being development run `npm install` first thing.
* Add `export NODE_ENV=development` to your bashrc/zshrc file.
* Run `npm start` and you'll be live!

### Development

* Globally install nodemon by `npm install nodemon -g`
* Run `npm run dev` and hack! :)

### Screenshot
![](screenshots/1.png?raw=true)
![](screenshots/2.png?raw=true)

### Architecture
The backend is written in node.js/express.js which releases a REST api.
All CURD operations are possible via the REST Api.

The frontend fetches data from the api and uses Html5 <template> tags for
templating the newly generated notifications.
