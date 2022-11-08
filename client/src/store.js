import {createStore,applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import rootReducer from './reducers';
import createSocketIoMiddleware from 'redux-socket.io';

import io from 'socket.io-client';
import * as BASE from './utils/const'

let socket = io(BASE.SOCKETIO);
  console.log('check 1', socket.connected);
socket.on('connect', function() {
  console.log('check 2', socket.connected);
});
socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const initialState = {};

const middleware =[socketIoMiddleware,thunk]; //[socketIoMiddleware,thunk];

const store = createStore(rootReducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));

store.subscribe( ()=>{
    console.log('new client state', store.getState());
  });
  store.dispatch({type:'server/join_admin', data:'hi'});
// socket.on('connect', () =>  {
//                                 console.log("connect!!")
                                
//                             });
// socket.on('reconnect', () => console.log("reconnect!!"));
// socket.on('disconnect', () => console.log("disconnect!!"));
export default store;