import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  senderDetails: {},
  receiverDetails: {},
  bookingDetails: {},
};

const billSlice = createSlice({
  name: 'bill',
  initialState,
  reducers: {
    setBillData: (state, action) => {
      state.senderDetails = action.payload.senderDetails;
      state.receiverDetails = action.payload.receiverDetails;
      state.bookingDetails = action.payload.bookingDetails;
    },
    clearBillData: (state) => {
      state.senderDetails = {};
      state.receiverDetails = {};
      state.bookingDetails = {};
    },
  },
});

export const { setBillData, clearBillData } = billSlice.actions;
export default billSlice.reducer;
