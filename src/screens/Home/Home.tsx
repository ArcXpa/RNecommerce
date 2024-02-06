import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	FlatList,
	ScrollView,
	Modal,
	Alert,
	Pressable,
	TextInput,
	KeyboardAvoidingView,
} from 'react-native';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { ImageVariant } from '@/components/atoms';
import { CatItem, OfferItem, ProductItem } from '@/components/general';
import { SafeScreen } from '@/components/template';
import { useTheme } from '@/theme';
import { fetchOne } from '@/services/users';

import SVGplace from '@/assets/svg/place.svg';
import SVGarrowdown from '@/assets/svg/arrowdown.svg';
import LogoMint from '@/assets/images/mintimage.png';
import LogoUser from '@/assets/images/user.png';
import SVGtriangle from '@/assets/svg/triangle.svg';
import SVGcart from '@/assets/svg/cartimg.svg';
import SVGclose from '@/assets/svg/closeicon.svg';
import CATSDATA from '@/assets/data/categories.json';
import OFFERSDATA from '@/assets/data/offers.json';
import PRODUCTSDATA from '@/assets/data/products.json';

import { ApplicationScreenProps } from '@/types/navigation';
import auth from '@react-native-firebase/auth';
import { addItemAsync, selectCart } from '@/reducers/cartSlice';
import { Item } from '@/types/cartTypes';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './style';

function Home({ navigation }: ApplicationScreenProps) {
	const cart = useSelector(selectCart);
	const { t } = useTranslation(['Home', 'welcome']);
	const [modalVisible, setModalVisible] = useState(false);
	const { layout, gutters, fonts } = useTheme();

	const [currentId, setCurrentId] = useState(-1);

	const [email, setEmail] = useState('');
	const [pass, setPass] = useState('');
	const [cpass, setCpass] = useState('');
	const [errormsg, setErrormsg] = useState('');
	const [loginview, setLoginview] = useState(true);

	const [initializing, setInitializing] = useState(true);
	const [activeuser, setActiveuser] = useState();

	// Handle user state changes
	function onAuthStateChanged(user) {
		setActiveuser(user);
		if (initializing) setInitializing(false);
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);

	const { isSuccess, data, isFetching } = useQuery({
		queryKey: ['Home', currentId],
		queryFn: () => {
			return fetchOne(currentId);
		},
		enabled: currentId >= 0,
	});

	const getCartTotal = (): number => {
		if (cart.length === 0) return 0;

		let ttl = 0;

		cart.forEach((itm: Item) => {
			ttl += itm.salePrice * itm.qty;
		});

		return ttl;
	};

	const handleRegister = async () => {
		try {
			if (email.length === 0 || pass.length === 0) {
				setErrormsg('Invalid Input!');
				return;
			}
			await auth().createUserWithEmailAndPassword(email, pass);
			console.log('User account created & signed in!');
			setModalVisible(false);
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				setErrormsg('That email address is already in use!');
			} else if (error.code === 'auth/invalid-email') {
				setErrormsg('That email address is invalid!');
			} else {
				setErrormsg(
					'The supplied auth credential is incorrect, malformed or has expired.',
				);
				console.error(error);
			}
		}
	};

	const handleLogout = async () => {
		try {
			setEmail('');
			setPass('');
			setErrormsg('');
			auth()
				.signOut()
				.then(() => console.log('User signed out!'));
		} catch (error) {}
	};

	const handleLogin = async () => {
		try {
			if (email.length === 0 || pass.length === 0) {
				setErrormsg('Invalid Input!');
				return;
			}
			await auth().signInWithEmailAndPassword(email, pass);
			console.log('User account signed in!');
			setModalVisible(false);
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				setErrormsg('That email address is already in use!');
			} else if (error.code === 'auth/invalid-email') {
				setErrormsg('That email address is invalid!');
			} else {
				console.error(error);
				setErrormsg(
					'The supplied auth credential is invalid, malformed or has expired.',
				);
			}
		}
	};

	return (
		<SafeScreen>
			<KeyboardAwareScrollView>
				<View
				// nestedScrollEnabled
				// contentContainerStyle={[
				// 	layout.flex_1,
				// 	layout.itemsCenter,
				// 	styles.container,
				// ]}
				>
					<>
						<View
							style={[
								layout.row,
								gutters.marginHorizontal_20,
								gutters.paddingTop_26,
								gutters.paddingBottom_24,
								styles.shadeline,
							]}
						>
							{activeuser && <SVGplace />}

							<View
								style={[
									layout.flex_1,
									gutters.paddingLeft_18,
									gutters.paddingRight_24,
								]}
							>
								{activeuser ? (
									<>
										<TouchableOpacity onPress={() => {}}>
											<View
												style={[layout.row, layout.left0, layout.itemsCenter]}
											>
												<Text style={[fonts.title1, gutters.paddingRight_12]}>
													Work
												</Text>
												<SVGarrowdown />
											</View>
										</TouchableOpacity>

										<Text style={[fonts.subtitle1]}>
											P.O. Box 3625. Sheikh Khalifa Bin Saeed Street Dubai. P.O.
											Box 901
										</Text>
									</>
								) : (
									<Text style={[fonts.title1, gutters.paddingRight_12]}>
										Welcome Guest,
									</Text>
								)}
							</View>

							<TouchableOpacity
								onPress={() => {
									setErrormsg('');
									setEmail('');
									setPass('');
									setModalVisible(true);
								}}
							>
								{activeuser ? (
									<View style={[]}>
										<ImageVariant
											testID="brand-img"
											style={[styles.avatar]}
											source={LogoUser}
											resizeMode="contain"
										/>
									</View>
								) : (
									<Text style={[fonts.title2]}>Login</Text>
								)}
							</TouchableOpacity>
						</View>

						<View style={[gutters.paddingHorizontal_20, gutters.marginTop_24]}>
							<FlatList
								showsHorizontalScrollIndicator={false}
								showsVerticalScrollIndicator={false}
								nestedScrollEnabled
								data={PRODUCTSDATA}
								renderItem={({ item }) => (
									<ProductItem
										id={item.id}
										title={item.title}
										thumb={item.thumb}
										price={item.price}
										salePrice={item.salePrice}
										qty={
											cart.filter(tm => tm.id === item.id).length > 0
												? cart.filter(tm => tm.id === item.id)[0].qty
												: 0
										}
									/>
								)}
								ListHeaderComponent={() => (
									<>
										<View
											style={[
												layout.row,
												layout.itemsCenter,
												// gutters.marginHorizontal_20,
												// gutters.marginTop_24,
												gutters.marginBottom_24,
											]}
										>
											<ImageVariant
												testID="brand-img"
												style={[]}
												source={LogoMint}
												resizeMode="contain"
											/>
											<View
												style={[
													layout.flex_1,
													gutters.paddingLeft_18,
													gutters.paddingRight_24,
												]}
											>
												<View
													style={[layout.row, layout.left0, layout.itemsCenter]}
												>
													<Text style={[fonts.title2, gutters.paddingRight_12]}>
														Store 1
													</Text>
												</View>
												<Text style={[fonts.subtitle1]}>
													Lorem ipsum dolor sit amet, consectetur adipiscing
													elit.
												</Text>
											</View>
										</View>

										<View
											style={[
												layout.row,
												// gutters.paddingHorizontal_20,
												gutters.marginBottom_24,
											]}
										>
											<FlatList
												horizontal
												showsHorizontalScrollIndicator={false}
												data={OFFERSDATA}
												renderItem={() => <OfferItem />}
												keyExtractor={item => item.id}
											/>
										</View>

										<View style={[layout.row, gutters.marginBottom_24]}>
											<FlatList
												horizontal
												showsHorizontalScrollIndicator={false}
												data={CATSDATA}
												renderItem={({ item }) => (
													<CatItem title={item.title} thumb={item.thumb} />
												)}
												keyExtractor={item => item.id}
											/>
										</View>
									</>
								)}
								ListFooterComponent={() => <View style={{ height: 300 }} />}
								keyExtractor={item => item.id}
							/>
						</View>
					</>
				</View>

				<Modal
					animationType="slide"
					transparent
					visible={modalVisible}
					onRequestClose={() => {
						setModalVisible(!modalVisible);
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							{auth().currentUser ? (
								<View style={[layout.itemsCenter, layout.justifyCenter]}>
									<TouchableOpacity
										style={styles.btclose}
										onPress={() => {
											setModalVisible(false);
										}}
									>
										<SVGclose />
									</TouchableOpacity>
									<Text style={styles.modalText}>
										{auth().currentUser?.displayName}
									</Text>
									<Text style={styles.modalText}>
										{auth().currentUser?.email}
									</Text>
									<Pressable
										style={[
											styles.button,
											gutters.marginTop_30,
											styles.buttonClose,
										]}
										onPress={() => {
											handleLogout();
										}}
									>
										<Text style={styles.textStyle}>Log Out</Text>
									</Pressable>
								</View>
							) : (
								<>
									<TouchableOpacity
										style={styles.btclose}
										onPress={() => {
											setModalVisible(false);
										}}
									>
										<SVGclose />
									</TouchableOpacity>
									<Text style={styles.modalText}>
										{loginview ? 'Login Now' : 'Register'}
									</Text>

									<TextInput
										style={styles.input}
										onChangeText={setEmail}
										value={email}
										placeholder="Email"
									/>

									<TextInput
										secureTextEntry
										style={styles.input}
										onChangeText={setPass}
										value={pass}
										placeholder="Password"
									/>
									{errormsg && <Text style={styles.errText}>{errormsg}</Text>}

									<Pressable
										style={[styles.button, styles.buttonClose]}
										onPress={() => {
											setErrormsg('');
											if (loginview) {
												handleLogin();
											} else {
												handleRegister();
											}
										}}
									>
										<Text style={styles.textStyle}>Submit</Text>
									</Pressable>

									<TouchableOpacity
										style={styles.regbtn}
										onPress={() => {
											setEmail('');
											setPass('');
											setErrormsg('');
											setLoginview(!loginview);
										}}
									>
										<Text style={styles.regText}>
											{loginview ? 'Register' : 'Login'}
										</Text>
									</TouchableOpacity>
								</>
							)}
						</View>
					</View>
				</Modal>
			</KeyboardAwareScrollView>

			{cart.length > 0 && (
				<View style={[styles.checkoutbox]}>
					<View style={[styles.toptriange]}>
						<SVGtriangle />
					</View>

					<View
						style={[
							layout.flex_1,
							layout.row,
							layout.itemsCenter,
							gutters.paddingHorizontal_19,
							gutters.paddingVertical_22,
						]}
					>
						<View style={[layout.flex_1]}>
							<Text style={[styles.lbl_checkoutdesc]}>{cart.length} Items</Text>
							<Text style={[styles.lbl_checkoutprice]}>₹ {getCartTotal()}</Text>
						</View>

						<TouchableOpacity
							onPress={() => {
								navigation.navigate('Cart');
							}}
						>
							<View
								style={[
									layout.row,
									layout.itemsCenter,
									gutters.paddingHorizontal_28,
									gutters.paddingVertical_12,
									{ backgroundColor: '#fff', borderRadius: 10 },
								]}
							>
								<Text style={[gutters.marginRight_16, styles.lbl_checkout]}>
									Checkout
								</Text>
								<SVGcart />
							</View>
						</TouchableOpacity>
					</View>
				</View>
			)}
		</SafeScreen>
	);
}

export default Home;
