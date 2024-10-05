import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestSlice from "./requestsSlice"
const store = configureStore({
    reducer:{
       user:userReducer,
       feed:feedReducer,
       connection:connectionReducer,
       request:requestSlice
    }
})
export default store;






