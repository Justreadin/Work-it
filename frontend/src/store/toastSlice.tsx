import {createSlice} from "@reduxjs/toolkit"

interface  Status{
    success: boolean,
    message: string
}
type Action ={
    type: string,
    payload: Status
}
const toastSlice = createSlice({
    name: "toast",
    initialState:{
        success: false,
        message: "",
    },
    reducers:{
        showToast(state, action: Action){
            const{success, message} = action.payload
            state.success = success
            state.message = message
        }
    }
})
export default toastSlice

export const toastActions = toastSlice.actions
