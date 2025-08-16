export const ADD_BOOKING = "ADD_BOOKING";

export const addBooking = (bookingData) => {
  return {
    type: ADD_BOOKING,
    payload: bookingData,
  };
};
