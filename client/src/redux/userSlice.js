import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  image: '',
  _id: '' 
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      const { _id, firstName, lastName, email, image } = action.payload.data;
     
      state._id = _id; 
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.image = image;
    },
    logoutRedux:(state,action)=>{
     
      state._id = ''; 
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.image = '';
    }
   
  }
});

export const { loginRedux, logoutRedux } = userSlice.actions;

export default userSlice.reducer;
