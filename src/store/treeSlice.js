import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
  selectedBrand: '',
  selectedPath: '',
};

const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setSelectedBrand: (state, action) => {
      state.selectedBrand = action.payload;
    },
    setSelectedPath: (state, action) => {
      state.selectedPath = action.payload;
    },
  },
});

export const { setData, setSelectedBrand, setSelectedPath } = treeSlice.actions;

export default treeSlice.reducer;
