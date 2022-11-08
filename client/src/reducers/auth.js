
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null,
    role:1,//login as user 1, driver 2
    admin:false,
}

export default function(state = initialState,action){
    const {type,payload} = action;
    switch(type){
        case "LOAD_USER_DATA":
            console.log(state);

            return {
                ...state,
                isAuthenticated : true,
                loading: false,
                user:payload,
            };
        case "LOGIN_SUCCESS":
            localStorage.setItem('token',payload.token);
            
            return {
                ...state,
                ...payload,
                isAuthenticated :true,
                loading: false}
        case "REGISTER_SUCCESS":
            localStorage.setItem('token',payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated :false,
                loading: false}

        case "LOGOUT":
        case "LOGIN_FAIL":
        case "REGISTER_FAIL":
            localStorage.removeItem('token');
            return {
                ...state,
                token : null,
                isAuthenticated :false,
                user:null,
                loading: false}
        case "AUTH_ERROR":
            console.log("AUTH FAIL");
            
            localStorage.removeItem('token');
            return {
                        ...state,
                        token : null,
                        isAuthenticated :false,
                        loading: false}
  
        default :
            return state;
    }
}