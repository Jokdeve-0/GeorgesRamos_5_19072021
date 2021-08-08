const {get_var_url} = require('./getVarUrl')
module.exports = {
    // récuprer la variable page ( par défault "page=home" )
    get_current_page(){
        return get_var_url("page") ? get_var_url("page") : "home"
    }
}