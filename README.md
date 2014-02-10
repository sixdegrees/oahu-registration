# Oahu Quiz

This is a minimal version of a packaged Oahu Registration App.

The project is a self contained, written in PHP, with no database.
The PHP script is only used to prebuild the Javascript templates for the app, which are located in the `/templates` directory, and insert your App's configuration in the `config.php` file. It should run as is.


## Customizing Templates

All templates are in the `templates` directory and ready to be customized.

## Registration fields

Fields for the registration form can be edited in the `application.js` file

## Sharing

Change the `share_hash` values to your needs in `application.js`.

## Deploying

* Deploy the directory in on the host of your choice.
* Note the public URL
* To host this on Facebook, create an empty Facebook App, and point it's canvas and Tab url to the public URL of this project.
