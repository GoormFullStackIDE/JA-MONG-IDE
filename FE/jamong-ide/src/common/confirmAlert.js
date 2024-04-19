import { createSlice } from '@reduxjs/toolkit';

const initAlertDialogInfo = {
  open: false,
  title: '',
  text: '',
  path: '',
};

export const alertDialogInfoSlice = createSlice({
  name: 'alert',
  initialState: { ...initAlertDialogInfo },
  reducers: {
    showAlert: (state, action) => {
      state = { ...initAlertDialogInfo, ...action.payload };
      return state;
    },
    closeRedirectAlert: (state, action) => {
      state = { ...initAlertDialogInfo };
      return state;
    },
  },
});

export const { showAlert, closeRedirectAlert } = alertDialogInfoSlice.actions;
export default alertDialogInfoSlice.reducer;
