import {combineReducers} from 'redux';

import auth from './auth'
import utils from './utils'

export default combineReducers({auth,utils});