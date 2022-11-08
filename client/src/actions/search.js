
import setAuthToken from '../utils/token';
import API from '../utils/api';

export const search_inventory = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);
    console.log(body);
    
    try {
        const res = await API.post('api/search/search_inventory', body, config);
        console.log(res.data);
        

        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const autocomplete_lot_number = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);
    console.log(body);
    
    try {
        const res = await API.post('api/search/autocomplete_lot_number', body, config);
        console.log(res.data);

        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const list_inventory = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);
    console.log(body);
    
    try {
        const res = await API.post('api/search/list_inventory', body, config);
        console.log(res.data);

        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};