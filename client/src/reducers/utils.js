
const initialState = {
    show:false,
    title:'',
    text:'',
    type:1,
    loading:false,
    alert:{count:0,list:[]}
}

export default function(state = initialState,action){
    const {type,payload} = action;
    switch(type){
        case "SHOW_MODAL":
            return {
                ...state,
                title : payload.title,
                text : payload.text,
                type :payload.type ? payload.type:1,
                show :true
            }
      
        case "HIDE_MODAL":
            return {
                ...state,
                show :false
            }
        case "SET_LOADING":
            return {
                    ...state,
                    loading :payload
            }
        case 'alert_inbox':
            return {
                ...state,
                alert:action.data
            };
        case 'set_read_alert':
            return {
                ...state,
                alert:{
                    count:0,
                    list:state.alert.list
                }
            };
        case 'set_alert':
            console.log(action)
            return {
                ...state,
                alert:action.payload
            };
        case 'set_alert_count':
            console.log(action)
            return {
                ...state,
                alert:{
                    count:action.payload,
                    list:state.alert.list
                }
            };
        case 'new_alert':
            console.log(action)
            return {
                ...state,
                alert:{
                    count:state.alert.count+1,
                    list:[action.data,...state.alert.list]
                }
            };
        default :
            return state;
    }
}