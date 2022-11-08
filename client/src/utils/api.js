
import * as BASE from './const';
var axios = require('axios');

var API = axios.create({
  baseURL: BASE.SERVER,

});
if(localStorage.getItem('token'))
  API.defaults.headers.common['x-auth-token'] = localStorage.getItem('token');
//localStorage.getItem('token')
export default API;

