
import instance from './api'
import * as BASE from './const';
const setAuthToken = token => {
    instance.defaults.baseURL = BASE.SERVER;
    if(token){
        console.log("set token");
        instance.defaults.headers.common['x-auth-token'] = token;
       
    }else {
        console.log("delete token");
        
        delete instance.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;