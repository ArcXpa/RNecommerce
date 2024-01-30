import { View, Text, DimensionValue, Dimensions } from 'react-native';
import { useTheme } from '@/theme';
import SVGplus from '@/assets/svg/btnplus.svg';
import SVGminus from '@/assets/svg/btnminus.svg';

import { TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react';

import { useDispatch } from 'react-redux';

import {
	addItem,
	addItemAsync,
	cartSlice,
	deleteItem,
	selectCart,
	updateItem,
} from '@/reducers/cartSlice';
import { Item } from '@/types/cartTypes';
import styles from './style';

type Props = {
	id?: string | null;
	title?: string;
	thumb?: string;
	price?: number;
	qty?: number;
	salePrice?: number;
	selected?: string | null;
	onItemClick: () => void;
};

function CartItem({
	id,
	title,
	thumb,
	price,
	qty,
	salePrice,
	selected,
	onItemClick,
}: Props) {
	const {
		colors,
		variant,
		changeTheme,
		layout,
		gutters,
		fonts,
		borders,
		components,
		backgrounds,
	} = useTheme();
	const dispatch = useDispatch();
	const deviceWidth = Dimensions.get('window').width;

	const handleAddItem = async (itm: Item) => {
		await dispatch(addItemAsync(itm) as any);
		console.log('Item Added!');
	};

	const handleRemoveItem = async (itm: string) => {
		await dispatch(deleteItem(itm) as any);
		console.log('Item Removed!');
	};

	return (
		<TouchableOpacity onPress={onItemClick} style={[gutters.marginBottom_20]}>
			<View
				style={[
					gutters.paddingHorizontal_16,
					gutters.paddingVertical_16,
					{
						borderRadius: 15,
						borderWidth: id === selected ? 1 : 0,
						borderColor: 'rgba(8, 194, 93, 1)',
					},
				]}
			>
				<View style={[layout.row, { width: deviceWidth, flex: 10 }]}>
					<View style={[{ flex: 5 }]}>
						<Text style={[styles.titleRegular, gutters.marginTop_2]}>
							{title}
						</Text>

						<View style={[layout.row, gutters.marginTop_2, layout.itemsEnd]}>
							<Text style={[fonts.saleprice]}>₹{salePrice}</Text>
							<Text style={[fonts.price, gutters.marginLeft_6]}>₹{price}</Text>

							<Text style={[fonts.offer, gutters.marginLeft_12]}>
								₹{(((price - salePrice) / price) * 100).toFixed(0)}%
							</Text>
						</View>
					</View>

					<View style={{ flex: 4.5, justifyContent: 'center' }}>
						<View
							style={[
								layout.row,
								layout.itemsCenter,

								{
									width: 128,
									backgroundColor: 'rgba(245, 245, 245, 1)',
									borderRadius: 5,
									padding: 3,
								},
							]}
						>
							<TouchableOpacity
								onPress={() => {
									handleRemoveItem(id);
								}}
							>
								<SVGminus />
							</TouchableOpacity>

							<Text
								style={[
									layout.flex_1,
									{ textAlign: 'center', color: 'rgba(149, 149, 149, 1)' },
								]}
							>
								{qty}
							</Text>

							<TouchableOpacity
								onPress={() => {
									const item: Item = {
										id,
										title,
										thumb,
										price,
										salePrice,
										qty: 1,
									};
									handleAddItem(item);
								}}
							>
								<SVGplus />
							</TouchableOpacity>
						</View>

						<Text
							style={[
								fonts.saleprice,
								gutters.marginTop_4,
								{ textAlign: 'right', width: 128 },
							]}
						>
							₹{salePrice * qty}
						</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}

CartItem.defaultProps = {
	id: null,
	title: 'Title',
	price: 0,
	salePrice: 0,
	qty: 0,
	thumb:
		'https://images.pexels.com/photos/3688/food-dinner-lunch-chicken.jpg?auto=compress&cs=tinysrgb&w=800',
	selected: null,
};

export default CartItem;
