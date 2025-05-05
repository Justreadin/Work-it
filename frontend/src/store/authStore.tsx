import { createSlice } from "@reduxjs/toolkit";

interface Action {
  type: string,
  payload:{
    token: string,
   userId: string,
   //role: string
  }
}
 const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    userId: "",
    // role: "",
  },
  reducers: {
    setAuth(state, action: Action) {
        const{token, userId} = action.payload
        // state.role = role
        state.token = token
        state.userId = userId
    }
  },
});

export default authSlice
export const authAction = authSlice.actions
