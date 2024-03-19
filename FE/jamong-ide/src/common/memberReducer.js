import { createSlice } from '@reduxjs/toolkit';

const initMemberInfo = {
  token: '',
};

export const memberInfoSlice = createSlice({
  name: 'member',
  initialState: { ...initMemberInfo },
  reducers: {
    memberLogin: (state, action) => {
      state = { ...action.payload };
      return state;
    },
    memberLogout: (state, action) => {
      state = { ...initMemberInfo };
      return state;
    },
  },
});

export const { memberLogin, memberLogout } = memberInfoSlice.actions;
export default memberInfoSlice.reducer;
