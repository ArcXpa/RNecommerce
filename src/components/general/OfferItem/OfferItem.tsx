import { View, Text, DimensionValue } from 'react-native';

import LogoLight from '@/theme/assets/images/tom_light.png';
import LogoDark from '@/theme/assets/images/tom_dark.png';

import { ImageVariant } from '@/components/atoms';
import { useTheme } from '@/theme';
import { isImageSourcePropType } from '@/types/guards/image';
import SVGoffericon from '@/assets/svg/offericon.svg';
type Props = {
	height?: DimensionValue;
	width?: DimensionValue;
	mode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center';
};

function OfferItem({ height, width, mode }: Props) {
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
		<View style={[layout.row, layout.itemsCenter,   ]}>	 
		<SVGoffericon />
	   <View style={[layout.flex_1, gutters.paddingLeft_18, gutters.paddingRight_20]}>
		   <View style={[layout.row, layout.left0, layout.itemsCenter]}>
		   <Text style={[ fonts.titleSemiBold, gutters.paddingRight_12]}>60% OFF up to Rs120</Text>
			
		   </View>
		   <Text style={[fonts.titleRegular]}>Use code ZCRICKET</Text>
	   </View>
  
	   </View>
	);
}

OfferItem.defaultProps = {
	height: 200,
	width: 200,
	mode: 'contain',
};

export default OfferItem;
