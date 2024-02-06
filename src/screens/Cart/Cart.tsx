import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { CartItem, RecItem } from '@/components/general';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { fetchOne } from '@/services/users';

import { isImageSourcePropType } from '@/types/guards/image';

import SendImage from '@/theme/assets/images/send.png';
import ColorsWatchImage from '@/theme/assets/images/colorswatch.png';
import TranslateImage from '@/theme/assets/images/translate.png';

import SVGback from '@/assets/svg/iconback.svg';
import SVGinstant from '@/assets/svg/instant.svg';
import SVGscheduled from '@/assets/svg/scheduled.svg';

import SVGinstantgreen from '@/assets/svg/instant_green.svg';
import SVGscheduledgreen from '@/assets/svg/scheduled_green.svg';

import SVGmoring from '@/assets/svg/morning.svg';
import SVGevening from '@/assets/svg/evening.svg';
import SVGedit from '@/assets/svg/editicon.svg';

import SVGchecked from '@/assets/svg/checked.svg';
import SVGunchecked from '@/assets/svg/unchecked.svg';

import RECCDATA from '@/assets/data/recommended.json';
import { useSelector } from 'react-redux';
import { selectCart } from '@/reducers/cartSlice';
import { Item } from '@/types/cartTypes';
import { ApplicationScreenProps } from '@/types/navigation';
import styles from './style';

function Cart({ navigation }: ApplicationScreenProps) {
	const { t } = useTranslation(['Home', 'welcome']);
	const cart = useSelector(selectCart);
	const [selected, setSelected] = useState(null);
	const [deliverymode, setDeliverymode] = useState(0);

	const [deldate, setDeldate] = useState(0);
	const [seltime, setSeltime] = useState(0);

	const [checked, setChecked] = useState(false);

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

	const [currentId, setCurrentId] = useState(-1);
	const { isSuccess, data, isFetching } = useQuery({
		queryKey: ['Cart', currentId],
		queryFn: () => {
			return fetchOne(currentId);
		},
		enabled: currentId >= 0,
	});

	useEffect(() => {
		if (isSuccess) {
			// Alert.alert(t("Home:welcome", data.name));
		}
	}, [isSuccess, data]);

	const handleItemClick = (id: string) => {
		// Handle the item click in the parent component

		setSelected(id);
	};

	const getCartTotal = (): number => {
		if (cart.length === 0) return 0;

		let ttl = 0;

		cart.forEach((itm: Item) => {
			ttl += itm.salePrice * itm.qty;
		});

		return ttl;
	};

	if (
		!isImageSourcePropType(SendImage) ||
		!isImageSourcePropType(ColorsWatchImage) ||
		!isImageSourcePropType(TranslateImage)
	) {
		throw new Error('Image source is not valid');
	}

	return (
		<SafeScreen>
			<ScrollView
				nestedScrollEnabled
				contentContainerStyle={[
					layout.flex_1,
					layout.itemsCenter,
					{ backgroundColor: 'rgba(255, 255, 255, 1)' },
				]}
			>
				<>
					<View
						style={[
							layout.row,
							gutters.paddingHorizontal_20,
							gutters.paddingTop_26,
							gutters.paddingBottom_24,
							{ backgroundColor: 'rgba(58, 199, 122, 1)' },
						]}
					>
						<TouchableOpacity
							onPress={() => {
								navigation.goBack();
							}}
						>
							<SVGback />
						</TouchableOpacity>

						<View
							style={[
								layout.flex_1,
								gutters.paddingLeft_18,
								gutters.paddingRight_24,
							]}
						>
							<View style={[layout.row, layout.justifyCenter]}>
								<Text
									style={[
										fonts.title1,
										gutters.paddingRight_12,
										{ color: '#fff' },
									]}
								>
									Your Order
								</Text>
							</View>
						</View>
					</View>

					<View style={[gutters.paddingHorizontal_20, gutters.marginTop_24]}>
						<FlatList
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
							nestedScrollEnabled
							data={cart}
							renderItem={({ item }) => (
								<CartItem
									id={item.id}
									title={item.title}
									thumb={item.thumb}
									price={item.price}
									salePrice={item.salePrice}
									selected={selected}
									qty={
										cart.filter(tm => tm.id === item.id).length > 0
											? cart.filter(tm => tm.id === item.id)[0].qty
											: 0
									}
									onItemClick={() => {
										handleItemClick(item.id);
									}}
								/>
							)}
							ListFooterComponent={() => (
								<>
									<Text
										style={[
											fonts.title2,
											gutters.marginBottom_16,
											{ textAlign: 'center' },
										]}
									>
										Recommended
									</Text>
									<View style={[layout.row, gutters.marginBottom_24]}>
										<FlatList
											horizontal
											showsHorizontalScrollIndicator={false}
											data={RECCDATA}
											renderItem={({ item }) => (
												<RecItem
													title={item.title}
													price={item.salePrice}
													thumb={item.thumb}
												/>
											)}
											keyExtractor={item => item.id}
										/>
									</View>

									<View
										style={[
											layout.row,
											{ flex: 2, justifyContent: 'space-evenly' },
											gutters.paddingHorizontal_12,
											gutters.paddingVertical_12,
										]}
									>
										<TouchableOpacity
											style={{ flex: 1 }}
											onPress={() => {
												setDeliverymode(0);
											}}
										>
											<View
												style={[
													gutters.marginRight_18,
													gutters.paddingHorizontal_18,
													gutters.paddingVertical_14,
													layout.itemsCenter,
													{
														flex: 1,
														borderWidth: 2,
														borderRadius: 10,
														borderColor:
															deliverymode === 0
																? 'rgba(8, 194, 93, 1)'
																: 'rgba(237, 237, 237, 1)',
													},
												]}
											>
												{deliverymode === 0 ? (
													<SVGinstantgreen />
												) : (
													<SVGinstant />
												)}
												<Text style={[fonts.title3, gutters.marginTop_10]}>
													Instant Delivery
												</Text>
											</View>
										</TouchableOpacity>

										<TouchableOpacity
											style={{ flex: 1 }}
											onPress={() => {
												setDeliverymode(1);
											}}
										>
											<View
												style={[
													gutters.paddingHorizontal_18,
													gutters.paddingVertical_14,
													layout.itemsCenter,
													{
														flex: 1,
														borderWidth: 2,
														borderRadius: 10,
														borderColor:
															deliverymode === 1
																? 'rgba(8, 194, 93, 1)'
																: 'rgba(237, 237, 237, 1)',
													},
												]}
											>
												{deliverymode === 1 ? (
													<SVGscheduledgreen />
												) : (
													<SVGscheduled />
												)}
												<Text style={[fonts.title3, gutters.marginTop_10]}>
													Scheduled Delivery
												</Text>
											</View>
										</TouchableOpacity>
									</View>

									<View
										style={[
											layout.row,
											{ flex: 2, justifyContent: 'space-evenly' },
											gutters.paddingHorizontal_12,
											gutters.paddingVertical_12,
										]}
									>
										<TouchableOpacity
											style={{ flex: 1 }}
											onPress={() => {
												setDeldate(0);
											}}
										>
											<View
												style={[
													gutters.marginRight_18,
													gutters.paddingHorizontal_18,
													gutters.paddingVertical_14,
													layout.itemsCenter,
													layout.justifyCenter,
													{
														flex: 1,

														borderRadius: 10,
														backgroundColor:
															deldate === 0
																? 'rgba(8, 194, 93, 1)'
																: 'rgba(255, 255, 255, 1)',
													},
												]}
											>
												<Text
													style={[
														fonts.title3,
														{
															color: deldate === 0 ? 'white' : 'black',
														},
													]}
												>
													Today
												</Text>
											</View>
										</TouchableOpacity>

										<TouchableOpacity
											style={{ flex: 1 }}
											onPress={() => {
												setDeldate(1);
											}}
										>
											<View
												style={[
													gutters.paddingHorizontal_18,
													gutters.paddingVertical_14,
													layout.itemsCenter,
													layout.justifyCenter,
													{
														flex: 1,

														borderRadius: 10,
														backgroundColor:
															deldate === 1
																? 'rgba(8, 194, 93, 1)'
																: 'rgba(255, 255, 255, 1)',
													},
												]}
											>
												<Text
													style={[
														fonts.title3,
														{ color: deldate === 1 ? 'white' : 'black' },
													]}
												>
													Tomorrow
												</Text>
											</View>
										</TouchableOpacity>
									</View>

									<View
										style={[
											layout.row,
											{ flex: 2, justifyContent: 'space-evenly' },
											gutters.paddingHorizontal_12,
											gutters.paddingVertical_12,
										]}
									>
										<TouchableOpacity
											style={{ flex: 1, marginRight: 8 }}
											onPress={() => {
												setSeltime(0);
											}}
										>
											<View
												style={[
													gutters.paddingHorizontal_10,
													gutters.paddingVertical_10,

													{
														flex: 1,

														borderRadius: 10,
														borderWidth: 2,
														borderColor:
															seltime === 0
																? 'rgba(8, 194, 93, 1)'
																: 'rgba(255, 255, 255, 1)',
													},
												]}
											>
												<View style={[layout.row]}>
													<Text
														style={[
															fonts.title3,
															gutters.paddingRight_10,
															{ color: 'black' },
														]}
													>
														Morning
													</Text>
													<SVGmoring />
												</View>
												<Text
													style={[
														fonts.subtitle1,
														{ color: 'rgba(166, 166, 166, 1)' },
													]}
												>
													10AM to 11AM
												</Text>
											</View>
										</TouchableOpacity>

										<TouchableOpacity
											style={{ flex: 1, marginRight: 8 }}
											onPress={() => {
												setSeltime(1);
											}}
										>
											<View
												style={[
													gutters.paddingHorizontal_10,
													gutters.paddingVertical_10,

													{
														flex: 1,

														borderRadius: 10,
														borderWidth: 2,
														borderColor:
															seltime === 1
																? 'rgba(8, 194, 93, 1)'
																: 'rgba(255, 255, 255, 1)',
													},
												]}
											>
												<View style={[layout.row]}>
													<Text
														style={[
															fonts.title3,
															gutters.marginRight_10,
															{ color: 'black' },
														]}
													>
														Evening
													</Text>
													<SVGevening />
												</View>

												<Text
													style={[
														fonts.subtitle1,
														{ color: 'rgba(166, 166, 166, 1)' },
													]}
												>
													2PM to 3PM
												</Text>
											</View>
										</TouchableOpacity>

										<TouchableOpacity
											style={{ flex: 1 }}
											onPress={() => {
												setSeltime(2);
											}}
										>
											<View
												style={[
													gutters.paddingHorizontal_10,
													gutters.paddingVertical_10,

													{
														flex: 1,

														borderRadius: 10,
														borderWidth: 2,
														borderColor:
															seltime === 2
																? 'rgba(8, 194, 93, 1)'
																: 'rgba(255, 255, 255, 1)',
													},
												]}
											>
												<View style={[layout.row]}>
													<Text
														style={[
															fonts.title3,
															gutters.paddingRight_10,
															{ color: 'black' },
														]}
													>
														Evening
													</Text>
													<SVGevening />
												</View>

												<Text
													style={[
														fonts.subtitle1,
														{ color: 'rgba(166, 166, 166, 1)' },
													]}
												>
													6PM to 7PM
												</Text>
											</View>
										</TouchableOpacity>
									</View>

									<View style={[gutters.marginTop_24]}>
										<Text
											style={[
												fonts.title3,
												{ textAlign: 'lefft', color: 'rgba(166, 166, 166, 1)' },
											]}
										>
											Delivery address
										</Text>

										<View
											style={[
												gutters.paddingHorizontal_24,
												gutters.paddingVertical_18,
												layout.row,
											]}
										>
											<Text style={[layout.flex_1, gutters.marginRight_10]}>
												416 Grandrose Ave. {'\n'}
												Des Plaines, IL 60016
											</Text>

											<TouchableOpacity onPress={() => {}}>
												<SVGedit />
											</TouchableOpacity>
										</View>
									</View>

									<View
										style={[
											layout.row,
											layout.itemsCenter,
											gutters.paddingHorizontal_24,
										]}
									>
										<Text style={[styles.lbl_promo]}>
											Do you have a promo code ?
										</Text>
										<TouchableOpacity onPress={() => {}}>
											<Text style={[gutters.marginLeft_8, styles.lbl_redeem]}>
												Redeem Now
											</Text>
										</TouchableOpacity>
									</View>

									<View
										style={[
											layout.row,
											layout.itemsCenter,
											gutters.marginTop_14,
											gutters.paddingHorizontal_24,
										]}
									>
										<Text style={[styles.lbl_sub, layout.flex_1]}>
											Order total
										</Text>
										<Text style={[gutters.marginLeft_8, styles.lbl_sub]}>
											₹ {getCartTotal()}
										</Text>
									</View>

									<View
										style={[
											layout.row,
											layout.itemsCenter,
											gutters.marginTop_14,
											gutters.paddingHorizontal_24,
										]}
									>
										<Text style={[styles.lbl_sub, layout.flex_1]}>
											Delivery fee
										</Text>
										<Text style={[gutters.marginLeft_8, styles.lbl_sub]}>
											₹ 20
										</Text>
									</View>

									<View
										style={[
											layout.row,
											layout.itemsCenter,
											gutters.paddingVertical_18,
											gutters.marginTop_20,
											gutters.paddingHorizontal_24,
										]}
									>
										<Text style={[styles.lbl_total, layout.flex_1]}>
											Total cost
										</Text>
										<Text style={[gutters.marginLeft_8, styles.lbl_totalprice]}>
											₹ {getCartTotal() + 20}
										</Text>
									</View>

									<TouchableOpacity
										onPress={() => {
											setChecked(!checked);
										}}
									>
										<View
											style={[
												layout.row,
												layout.itemsCenter,
												gutters.paddingVertical_18,
												gutters.marginTop_20,
												gutters.paddingHorizontal_24,
											]}
										>
											{checked ? <SVGchecked /> : <SVGunchecked />}
											<Text
												style={[
													styles.lbl_info,
													gutters.marginLeft_26,
													layout.flex_1,
												]}
											>
												By placing an order you agree to our{' '}
												<Text style={{ color: 'black' }}>Terms</Text> and
												<Text style={{ color: 'black' }}> Conditions</Text>
											</Text>
										</View>
									</TouchableOpacity>

									<TouchableOpacity
										style={[gutters.marginTop_16]}
										onPress={() => {}}
									>
										<View style={[layout.row, {}]}>
											<Text style={[styles.lbl_proceed]}>Proceed</Text>
										</View>
									</TouchableOpacity>

									<View style={{ height: 200 }} />
								</>
							)}
							keyExtractor={item => item.id}
						/>
					</View>
				</>
			</ScrollView>
		</SafeScreen>
	);
}

export default Cart;
