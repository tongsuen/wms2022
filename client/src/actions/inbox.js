
import setAuthToken from '../utils/token';
import API from '../utils/api';

export const create_inbox = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-type': "multipart/form-data" 
        }
    }
    try {
        let fd = new FormData();

        if(data.files)
            for (let i = 0 ; i < data.files.length ; i++) {
                fd.append("files", data.files[i]);
            }
        if(data.company)  fd.append('company', data.company);
        fd.append('detail', data.detail);
        if(data.email) fd.append('email', data.email);
        if(data.from) fd.append('from', data.from);
        if(data.tos) {
            for (var i = 0; i < data.tos.length; i++) {
                fd.append('tos[]', data.tos[i]);
              }
        }
        fd.append('subject', data.subject);
        fd.append('type', data.type);
        console.log(fd);
        const res = await API.post('api/manage/create_inbox',fd,config);

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
export const create_inbox_export_stocks = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    try {
        const body = JSON.stringify(data);
        const res = await API.post('api/manage/create_inbox',body);

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
export const list_inbox = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);//{type 1,2,3}

    try {
        const res = await API.post('api/manage/list_inbox', body, config);
        console.log(res.data);
        

        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const list_customer_inbox = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);//{type 1,2,3}

    try {
        const res = await API.post('api/manage/list_customer_inbox', body, config);
        console.log(res.data);
        

        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const list_customer_send_inbox = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);//{type 1,2,3}

    try {
        const res = await API.post('api/manage/list_customer_send_inbox', body, config);
        console.log(res.data);
        

        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const get_inbox = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);//{type 1,2,3}

    try {
        const res = await API.post('api/manage/get_inbox', body, config);
        console.log(res.data);
        

        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};