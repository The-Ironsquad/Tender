import { configureStore, createSlice } from '@reduxjs/toolkit';

type StateType = {
  acceptedList: string[][];
  rejectedList: string[];
  selected: string;
};

const initialState: StateType = {
  acceptedList: [],
  rejectedList: [],
  selected: '',
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    accept(state, action) {
      state.acceptedList.push([action.payload[0], action.payload[1]]);
    },
    reject(state, action) {
      state.rejectedList.push(action.payload);
    },
    remove(state, action) {
      state.acceptedList = state.acceptedList.filter(
        (recipe) => recipe[0] !== action.payload
      );
    },
    select(state, action) {
      state.selected = action.payload;
    },
  },
});

const store = configureStore({
  reducer: listSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export const listActions = listSlice.actions;
export type AppDispatch = typeof store.dispatch;

export default store;
