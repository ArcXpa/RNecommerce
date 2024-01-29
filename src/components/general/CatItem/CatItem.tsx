import { View, Text, DimensionValue } from 'react-native';

import LogoLight from '@/theme/assets/images/tom_light.png';
import LogoDark from '@/theme/assets/images/tom_dark.png';

import { ImageVariant } from '@/components/atoms';
import { useTheme } from '@/theme';
import { isImageSourcePropType } from '@/types/guards/image';
import SVGoffericon from '@/assets/svg/offericon.svg';
import Cat1 from '@/assets/images/cat1.png';
import Cat2 from '@/assets/images/cat2.png';
import Cat3 from '@/assets/images/cat3.png';
import Cat4 from '@/assets/images/cat4.png';
import { Image } from 'react-native-svg';
import React from 'react';
type Props = {
	title?: String;
	thumb?: String;
	height?: DimensionValue;
	width?: DimensionValue;
	mode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center';
};

function CatItem({title, thumb, height, width, mode }: Props) {
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
		<View style={[ gutters.marginRight_20, layout.itemsCenter ]}>	 
		<ImageVariant
				testID="brand-img"
				style={[ {height: 62, width: 72, borderRadius: 10,}]}
				source={{uri: thumb}}
				resizeMode={'contain'}
				/>
  <Text style={[fonts.titleRegular, gutters.marginTop_2]}>{title}</Text>
  
	   </View>
	);
}

CatItem.defaultProps = {
	title: 'Rice',
	thumb: 'https://images.pexels.com/photos/10201880/pexels-photo-10201880.jpeg?auto=compress&cs=tinysrgb&w=800',
	height: 200,
	width: 200,
	mode: 'contain',

};

export default CatItem;
