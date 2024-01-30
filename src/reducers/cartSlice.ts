// src/redux/tasksSlice.ts
import { createSlice, PayloadAction, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '@/store/rootReducer';

import { Item } from '@/types/cartTypes';

interface CartState {
	items: Item[];
}

const initialState: CartState = {
	items: [],
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<Item>) => {
			const index = state.items.findIndex(
				item => item.id === action.payload.id,
			);
			if (index !== -1) {
				state.items[index] = {
					...action.payload,
					qty: state.items[index].qty + 1,
				};
			} else {
				state.items.push(action.payload);
			}
		},
		updateItem: (state, action: PayloadAction<Item>) => {
			const index = state.items.findIndex(
				item => item.id === action.payload.id,
			);
			if (index !== -1) {
				state.items[index] = action.payload;
			}
		},
		deleteItem: (state, action: PayloadAction<string>) => {
			const index = state.items.findIndex(item => item.id === action.payload);
			if (index !== -1) {
				if (state.items[index].qty === 1) {
					state.items = state.items.filter(item => item.id !== action.payload);
				} else {
					state.items[index] = {
						...state.items[index],
						qty: state.items[index].qty - 1,
					};
				}
			}
		},
	},
});

export const { addItem, updateItem, deleteItem } = cartSlice.actions;

export const selectCart = (state: RootState) => state?.cart?.items;

export const addItemAsync =
	(item: Item): ThunkAction<void, RootState, unknown, Action<string>> =>
	dispatch => {
		setTimeout(() => {
			dispatch(addItem(item));
		}, 1000);
	};

export default cartSlice.reducer;
