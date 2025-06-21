import { createSlice } from "@reduxjs/toolkit";

const gigSlice = createSlice({
    name: "gig",
    initialState:{
        gigs: "",
        gig_id: "",
        apply_modal_status: false
    },
    reducers:{
        openApplyModal(state){
            state.apply_modal_status = !state.apply_modal_status
        }
    }
})

export default gigSlice
export const gigAction = gigSlice.actions