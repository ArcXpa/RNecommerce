// src/types/taskTypes.ts

export interface Item {
	id: string | undefined;
	title: string;
	thumb: string;
	price: number;
	salePrice: number;
	qty: number;
}

export interface CartState {
	items: Item[];
}

export interface AddCartPayload {
	id: string;
	title: string;
}
