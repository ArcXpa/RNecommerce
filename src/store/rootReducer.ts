// src/store/rootReducer.ts

import { combineReducers } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import cartReducer from '@/reducers/cartSlice';

const rootReducer = combineReducers({
	cart: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
