// For test configuration:
// Either Default use port 5500
// Either please enter the url of your server in parameter:
// example for port 8080  : replace "AppUrl: (port = 5500)" by "AppUrl: (port = 8080)" 
module.exports = {
    AppUrl: (port = 5500)=>{
        return `http://127.0.0.1:${port}/`
    }
}