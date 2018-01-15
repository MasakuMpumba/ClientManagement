/**
 * This handles the db connection
 * @database name: customerApp
 * @secret: appsecret
 */

module.exports = {
    // the database url
    database: 'mongodb://localhost:27017/customerApp', 
    secret: 'appsecret' // used for token auth
}