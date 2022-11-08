
import setAuthToken from '../utils/token';
import API from '../utils/api';

//Load User
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    console.log(localStorage.token);
    
    try {
        const res = await API.post('api/users/get_user');
        console.log(res);

        if (res.data){

            
            if(res.data.admin){
                dispatch({type:'server/join_admin', data:res.data});
            }
            else{
                dispatch({type:'server/join', data:res.data});
            }
            dispatch({
                type:"LOAD_USER_DATA",
                payload:res.data
            });
        }
       
    } catch (error) {
        dispatch({
            type:"AUTH_ERROR",
            error:error.message
        });
    }
}
// Login User
export const login = ({ email, password }) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
   
    const body = JSON.stringify({ email, password });

    try {
        const res = await API.post('api/auth', body, config);
        console.log('===>');
        console.log(res.data);
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: res.data
        })
        dispatch(loadUser());
        return { success: 1 };
    } catch (error) {
        console.log(error.response);

        dispatch({
            type: "LOGIN_FAIL"
        })
        return { success: 0, msg: error.response ? error.response.data : 'unknow error' };
    }
};// reset password
export const reset_password = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/auth/reset_password', body, config);
        console.log('===>');
        console.log(res.data);
        return { success: 1 };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response ? error.response.data : 'unknow error' };
    }
};
export const forget_password = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/auth/forget_password', body, config);
        console.log('===>');
        console.log(res.data);
        return { success: 1 };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response ? error.response.data : 'unknow error' };
    }
};
export const register_customer = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': "multipart/form-data" 
        }
    }

    console.log(data)

    let fd = new FormData();
    if(data.avatar)
        fd.append("avatar", data.avatar);
    fd.append('email', data.email);
    fd.append('password', data.password);
    fd.append('user_name', data.user_name);
    fd.append('confirm_password', data.confirm_password);

    if(data.personal_id) fd.append('personal_id', data.personal_id);
    if(data.name) fd.append('name', data.name);
    if(data.position) fd.append('position', data.position);
    if(data.website) fd.append('website', data.website);
    if(data.tel) fd.append('tel', data.tel);
    if(data.address) fd.append('address', data.address);
    if(data.province) fd.append('province', data.province);
    if(data.passcode) fd.append('passcode', data.passcode);
    if(data.company) fd.append('company', data.company);
    if(data.tel_2) fd.append('tel_2', data.tel_2);
    if(data.fax) fd.append('fax', data.fax);

    try {
        const res = await API.post('api/auth/register', fd, config);
        console.log('===>');
        console.log(res.data);
        if(res.data){
            return { success: 1, data:res.data };

        }
        else {
            return {success:0}
        }
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response ? error.response.data : 'unknow error' };
    }
};
export const register_admin = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': "multipart/form-data" 
        }
    }

    console.log(data)

    let fd = new FormData();
    if(data.avatar)
        fd.append("avatar", data.avatar);
    fd.append('email', data.email);
    fd.append('password', data.password);
    fd.append('user_name', data.user_name);
    fd.append('confirm_password', data.confirm_password);
    fd.append('admin', true);
    fd.append('role',1);
    //if(data.personal_id) fd.append('personal_id', data.personal_id);
    if(data.name) fd.append('name', data.name);
    if(data.position) fd.append('position', data.position);
    if(data.website) fd.append('website', data.website);
    if(data.tel) fd.append('tel', data.tel);
    if(data.address) fd.append('address', data.address);
    if(data.province) fd.append('province', data.province);
    if(data.passcode) fd.append('passcode', data.passcode);
    if(data.company) fd.append('company', data.company);
    if(data.tel_2) fd.append('tel_2', data.tel_2);
    if(data.fax) fd.append('fax', data.fax);

    try {
        const res = await API.post('api/auth/register', fd, config);
        console.log('===>');
        console.log(res.data);
        if(res.data){
            return { success: 1, data:res.data };

        }
        else {
            return {success:0}
        }
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response ? error.response.data : 'unknow error' };
    }
};
export const update_user = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    try {

    const body = JSON.stringify(data);
        const res = await API.post('api/users/update_user',body,config);
        console.log(res);
        if(res){
            return {success:1,data:res.data}
        }
        else{
            return {success:0}
        }
       
    } catch (error) {

        return {success:0, error:error.message}
        
    }
}
export const save_avatar = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-type': "multipart/form-data" 
        }
    }

    try {

        let fd = new FormData();
  
        fd.append("avatar", data.avatar);
        fd.append('user_id', data.user_id);

        const res = await API.post('api/users/upload_avatar', fd, config);
        console.log(res);
        if(res.data){
          
            return { success: 1,data:res.data };
        }
        else{
            return { success: 0 };
        }
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
}
//Logout / clear profile

export const logout = () => dispatch => {
    console.log("LOG OUT");

    dispatch({
        type: "LOGOUT"
    });
    dispatch({
        type: "CLEAR_PROFILE"
    });
}