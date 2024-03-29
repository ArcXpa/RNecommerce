import { View, Text, DimensionValue } from 'react-native';

import LogoLight from '@/theme/assets/images/tom_light.png';
import LogoDark from '@/theme/assets/images/tom_dark.png';

import { ImageVariant } from '@/components/atoms';
import { useTheme } from '@/theme';
import { isImageSourcePropType } from '@/types/guards/image';
import { Image } from 'react-native-svg';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

type Props = {
	title?: string;
	price?: number;
	thumb?: string;
	height?: DimensionValue;
	width?: DimensionValue;
	mode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center';
};

function RecItem({ title, thumb, price, height, width, mode }: Props) {
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
		<View style={[gutters.marginRight_20, layout.itemsCenter]}>
			<ImageVariant
				testID="brand-img"
				style={[{ height: 56, width: 72, borderRadius: 10 }]}
				source={{ uri: thumb }}
				resizeMode="contain"
			/>
			<Text style={[fonts.titleRegular, gutters.marginTop_2]}>{title}</Text>
			<Text style={[fonts.priceBlack, gutters.marginTop_2]}>₹{price}</Text>

			<TouchableOpacity onPress={() => {}}>
				<Text
					style={{
						backgroundColor: 'rgba(8, 194, 93, 1)',
						color: '#fff',
						paddingHorizontal: 12,
						paddingVertical: 4,
						borderRadius: 4,
						marginTop: 7,
					}}
				>
					Add
				</Text>
			</TouchableOpacity>
		</View>
	);
}

RecItem.defaultProps = {
	title: 'Rice',
	thumb: '',
	price: 0,
	height: 200,
	width: 200,
	mode: 'contain',
};

export default RecItem;
