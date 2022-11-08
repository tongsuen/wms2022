
import setAuthToken from '../utils/token';
import API from '../utils/api';

export const get_stock = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/get_stock', body, config);
        console.log(res.data);
        

        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response };
    }
};

export const get_stocks = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/list_stocks', body, config);
        console.log(res.data);
        

        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response };
    }
};

export const get_category = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/get_category', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const create_category = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/create_category', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const create_note = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-type': "multipart/form-data" 
        }
    }
    try {
        let fd = new FormData();
        if(data.images)
            for (let i = 0 ; i < data.images.length ; i++) {
                fd.append("images", data.images[i]);
            }
        fd.append('detail', data.detail ? data.detail:'');
        fd.append('stock_id', data.stock_id);
        console.log(fd);
        const res = await API.post('api/manage/add_note_to_stock',fd,config);

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
export const get_notes = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {

        const res = await API.post('api/manage/get_notes_from_user',body,config);

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
export const get_note = (data) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {

        const res = await API.post('api/manage/get_note',body,config);

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
export const update_note = (data) => async dispatch => { 
    const config = {
        headers: {
            'Content-type': "multipart/form-data" 
        }
    }
    try {
        let fd = new FormData();
        if(data.images)
            for (let i = 0 ; i < data.images.length ; i++) {
                fd.append("images", data.images[i]);
            }
        fd.append('detail', data.detail);
        if(data.deletes)
            for (let i = 0 ; i < data.deletes.length ; i++) {
                fd.append("deletes[]", data.deletes[i]);
            }
        fd.append('note_id', data.note_id);
        console.log(data);
        const res = await API.post('api/manage/update_note',fd,config);
            
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
export const create_stock = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/import_to_stocks', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const export_stock_prepare = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/export_out_stock_prepare', body, config);//stock_id,amount
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};

export const export_stock = (data) => async dispatch => {

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
        fd.append('amount', data.amount);
        fd.append('stock_id', data.stock_id);
        const res = await API.post('api/manage/export_out_stock', fd, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const create_inventory = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': "multipart/form-data" 
        }
    }

    try {

        let fd = new FormData();
        if(data.images)
            for (let i = 0 ; i < data.images.length ; i++) {
                fd.append("images", data.images[i]);
            }
        fd.append('name', data.name);
        fd.append('user', data.user);
        fd.append('amount', data.amount);
        fd.append('weight', data.weight);
        fd.append('number_of_unit', data.number_of_unit);
        fd.append('number_per_unit', data.number_per_unit);
        fd.append('lot_number', data.lot_number);
        if (data.product_code) fd.append('product_code', data.product_code);
        fd.append('unit', data.unit);
        fd.append('sub_unit', data.sub_unit);
        if (data.mfg_date) fd.append('mfg_date', data.mfg_date);
        if (data.exp_date) fd.append('exp_date', data.exp_date);

        const res = await API.post('api/manage/import_inventory', fd, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const list_customer = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/list_customer', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);
        
        return { success: 0, msg: error.response.data };
    }
};
export const list_stock_out_pending_confirm = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/admin/list_stock_out_pending', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);
        
        return { success: 0, msg: error.response.data };
    }
};
export const get_user = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/users/get_user_by_email', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);
        
        return { success: 0, msg: error.response.data };
    }
};
export const get_users = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/get_user', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);
        
        return { success: 0, msg: error.response.data };
    }
};
export const get_admins = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/admin/list_admin', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);
        
        return { success: 0, msg: error.response.data };
    }
};
export const get_zones = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/list_zone', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const get_zones_for_choose = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/list_zone_for_choose', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const create_zone = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/create_zone', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const inventory_waiting = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/inventory_waiting', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const zone_with_stock = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/zone_with_stock', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const get_inventory = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/list_inventory', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const update_inventory = (data,images,newImages) => async dispatch => {
    console.log(data)
    console.log(images)
    console.log(newImages)
    const config = {
        headers: {
            'Content-type': "multipart/form-data" 
        }
    }

    try {

        let fd = new FormData();
        if(images)
            for (let i = 0 ; i < images.length ; i++) {
                fd.append("old_images", images[i]);
        }
        if(newImages)
            for (let i = 0 ; i < newImages.length ; i++) {
                fd.append("images", newImages[i]);
        }
        fd.append('name', data.name);
        fd.append('user', data.user);
        fd.append('amount', data.amount);
        fd.append('weight', data.weight? data.weight:0);
        fd.append('lot_number', data.lot_number);
        if(data.product_code) fd.append('product_code', data.product_code);
        fd.append('unit', data.unit);
        fd.append('sub_unit', data.sub_unit);
        if(data.mfg_date) fd.append('mfg_date', data.mfg_date);
        if(data.exp_date) fd.append('exp_date', data.exp_date);
        fd.append('inv_id', data._id);

        const res = await API.post('api/manage/update_inventory', fd, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const update_stock = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/update_stock', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};

export const remove_stock = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/remove_stock', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const change_zone_stock = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/change_zone_stock', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const save_to_history = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/save_stock_to_history', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const list_history = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/list_history', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const list_alert_customer = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/get_alert_customer', body, config);
        console.log(res.data);
        if(res.data){
            dispatch({
                type: "set_alert",
                payload:{
                    count:res.data.total,
                    list:res.data.list
                }
            })
        }
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const list_alert_staff= (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/get_alert_staff', body, config);
        console.log(res.data);
        if(res.data){
            dispatch({
                type: "set_alert",
                payload:{
                    count:res.data.total,
                    list:res.data.list
                }
            })
        }
       
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const alert_count= (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/alert_count', body, config);
        console.log(res.data);
        if(res.data){
            dispatch({
                type: "set_alert_count",
                payload:res.data.total,
                
            })
        }
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const set_read_alert= (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/set_read_alert', body, config);

        dispatch({
            type: "set_read_alert",
        })
        console.log(res.data);

        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};

export const report_data = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/report/report_data', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};

export const get_invoice = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/get_invoice', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const list_invoice = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/list_invoice', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
export const list_alert = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/manage/list_alert', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {

        console.log(error.response);
        return { success: 0, msg: error.response.data};
    }
};
export const accept_invoice = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    const body = JSON.stringify(data);

    try {
        const res = await API.post('api/admin/accept_invoice', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};
////

export const delete_all = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const body = JSON.stringify(data);
    try {
        const res = await API.post('api/manage/reset_data', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};

export const search_text = (data) => async dispatch => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    const body = JSON.stringify(data);
    try {
        const res = await API.post('api/search/search_inventory', body, config);
        console.log(res.data);
        return { success: 1,data:res.data };
    } catch (error) {
        console.log(error.response);

        return { success: 0, msg: error.response.data };
    }
};

export const set_show_modal = (show,type,title,text) => async dispatch => {
    
    if(show){
        dispatch({
            type: "SHOW_MODAL",
            payload: {type,title,text}
        })
    }else{
        dispatch({
            type: "HIDE_MODAL",
            payload: {}
        })
    }
       

};
export const set_loading = (loading) => async dispatch => {
    
    dispatch({
            type: "SET_LOADING",
            payload: loading
    })
   
};