import { View, Text, DimensionValue } from 'react-native';

import LogoLight from '@/theme/assets/images/tom_light.png';
import LogoDark from '@/theme/assets/images/tom_dark.png';

import { ImageVariant } from '@/components/atoms';
import { useTheme } from '@/theme';
import { isImageSourcePropType } from '@/types/guards/image';
import SVGoffericon from '@/assets/svg/offericon.svg';
import SVGplus from '@/assets/svg/btnplus.svg';
import SVGminus from '@/assets/svg/btnminus.svg';

import Cat1 from '@/assets/images/cat1.png';
import Cat2 from '@/assets/images/cat2.png';
import Cat3 from '@/assets/images/cat3.png';
import Cat4 from '@/assets/images/cat4.png';
import { Image } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import React from 'react';
type Props = {
	title?: String;
	thumb?: String;
	price?: Number;
	salePrice?: Number;
	height?: DimensionValue;
	width?: DimensionValue;
	mode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center';
};

function ProductItem({title, thumb, price, salePrice, height, width, mode }: Props) {
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

	if (!isImageSourcePropType(LogoLight) || !isImageSourcePropType(LogoDark)) {
		throw new Error('Image source is not valid');
	}

	return (
		<TouchableOpacity onPress={()=>{

		}}>
		<View style={[ layout.row, gutters.marginBottom_20, layout.itemsCenter ]}>	 
		<ImageVariant
				testID="brand-img"
				style={{height: 78, width: '40%', borderRadius: 18,  }}
				source={{uri: thumb,}}
				resizeMode={'contain'}
				/>
				<View style={[gutters.marginLeft_10, layout.fullWidth]}>
				<Text style={[fonts.titleRegular, gutters.marginTop_2]}>{title}</Text>

				<View style={[layout.row, gutters.marginTop_2, layout.itemsEnd, ]}>
				<Text style={[fonts.saleprice, ]}>₹{salePrice}</Text>
				<Text style={[fonts.price,gutters.marginLeft_6,]}>₹{price}</Text>
				
				<Text style={[fonts.offer, gutters.marginLeft_12]}>₹{(((price-salePrice)/price)* 100).toFixed(0)}%</Text>

				</View>

				<View style={[ layout.row, layout.itemsCenter, layout.left0, gutters.marginTop_10, { width: 158, backgroundColor: 'rgba(245, 245, 245, 1)', borderRadius: 5, padding: 3,}]}>


						<TouchableOpacity onPress={()=>{

						}}>
							 <SVGminus />
						</TouchableOpacity>

						<Text style={[layout.flex_1,  {textAlign:'center', color: 'rgba(149, 149, 149, 1)'}]}>0</Text>

						<TouchableOpacity onPress={()=>{

}}>
	 <SVGplus />
</TouchableOpacity>
				</View>
				
				</View>

  
	   </View>
	   </TouchableOpacity>
	);
}

ProductItem.defaultProps = {
	title: 'Title',
	price: 0,
	salePrice: 0,
	thumb: 'https://images.pexels.com/photos/3688/food-dinner-lunch-chicken.jpg?auto=compress&cs=tinysrgb&w=800',
	height: 78,
	width: 111,
	mode: 'contain',

};

export default ProductItem;
