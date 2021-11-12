import { createSlice,configureStore } from "@reduxjs/toolkit";

const userState={
    apiData:{},
    contractData:{},
    loading:false,
    wallet:""

};
const userSlice=createSlice({
    name:"user",
    initialState:userState,
    reducers:{
       setAlldata(state,action){
        state.apiData=action.payload.apiData;
        state.contractData=action.payload.contractData;
       },
       setWallet(state,action){
        state.wallet=action.payload.wallet;
       }
    }
});

const store =configureStore({
    reducer:{user:userSlice.reducer},

});

export const userActions=userSlice.actions;
export default store;