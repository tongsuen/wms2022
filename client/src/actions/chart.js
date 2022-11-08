import API from '../utils/api';

export const total_item_in_zone = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/chart/total_item_in_zone', body, config);
        console.log(res.data);
        

        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const stock_by_user = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/chart/stock_by_user', body, config);
        console.log(res.data);
        

        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const stock_out = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/chart/stock_out', body, config);
        console.log(res.data);
        

        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const history_data = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/chart/history', body, config);
        console.log(res.data);
        

        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const stock_out_by_month = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/chart/stock_out_by_month', body, config);
        console.log(res.data);
        

        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const stock_in_by_month = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/chart/stock_in_by_month', body, config);
        console.log(res.data);
        

        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};