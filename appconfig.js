var config = {};

// Database connection
config.pghost = 'localhost';
config.pguser = 'postgres';
config.pgpw = 'mazzofab';
config.pgdatabase = 'gctl';
config.pgport = '5432';

// Company Details
config.applogo = 'logotext.png'; // Logo for main application has to be stored in /public/images
config.full_logo = 'logo.png'; // Logo for index page
config.company_name = 'Greencity'; // Comany Name

module.exports = config;