import { createSlice } from '@reduxjs/toolkit';

const initMemberInfo = {
  authenticated: false,
  token: null,
  expireTime: null,
};

export const memberInfoSlice = createSlice({
  name: 'member',
  initialState: { ...initMemberInfo },
  reducers: {
    Login: (state, action) => {
      state = {
        ...action.payload,
        expireTime: new Date().getTime() + 1000 * 3600, //1시간
      };
      console.log(state);
      // window.localStorage.setItem('member', JSON.stringify(state));
      return state;
    },
    Logout: (state) => {
      state = { ...initMemberInfo };
      // window.localStorage.setItem('member', JSON.stringify(state));
      return state;
    },
  },
});

export const { Login, Logout } = memberInfoSlice.actions;
export default memberInfoSlice.reducer;
