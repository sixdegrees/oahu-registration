# Oahu Quiz

This is a minimal version of a packaged Oahu Quiz.

The project is a self contained, written in PHP, with no database.
The PHP script is only used to prebuild the Javascript templates for the app, which are located in the `/templates` directory, and insert the Key and Quiz ID in the right place. It should run as is.


## Configuration

This app comes configured on a dummy quiz with a few questions.
You need to get the following values from an Administrator and change them in the config.php file : 

    define("OAHU_APP_ID", "528f8aff873b0c5a18001145");
    define("OAHU_QUIZ_ID","528f8b38873b0c5a18001146");


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
