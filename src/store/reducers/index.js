import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { vidUploaderReducer } from "./vidUploaderReducer"
export default combineReducers({
    userReducer,
    vidUploaderReducer
})