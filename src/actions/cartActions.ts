// src/actions/taskActions.ts

import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { Item, AddCartPayload } from '../types/cartTypes';

// Define the return type of fetchTasks thunk
type FetchTasksReturnType = Item[];

export const fetchItems = createAsyncThunk<FetchTasksReturnType, void>(
	'items/fetch',
	async () => {
		// Fetch tasks from an API or perform any asynchronous operation
		const items: Item[] = [];
		return items;
	},
);

export const addCart = createAction('items/add', (payload: Item) => ({
	payload: { ...payload, date: Date.now() },
}));
