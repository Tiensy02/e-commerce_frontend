import { createSlice } from '@reduxjs/toolkit';

const localSlice = createSlice({
  name: 'local',
  initialState: {
    openMessBox: false,
  },
  reducers: {
    setOpenMessBox: (state, action) => {
      state.openMessBox = action.payload;
    },
  },
});

export const { setOpenMessBox } = localSlice.actions;
export default localSlice;
