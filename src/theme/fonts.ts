import { TextStyle } from 'react-native';
import type { FontColors, FontSizes } from '@/types/theme/fonts';
import type { UnionConfiguration } from '@/types/theme/config';
import { config } from '@/theme/_config';

export const generateFontColors = (configuration: UnionConfiguration) => {
	return Object.entries(configuration.fonts.colors ?? {}).reduce(
		(acc, [key, value]) => {
			return Object.assign(acc, {
				[`${key}`]: {
					color: value,
				},
			});
		},
		{} as FontColors,
	);
};

export const generateFontSizes = () => {
	return config.fonts.sizes.reduce((acc, size) => {
		return Object.assign(acc, {
			[`size_${size}`]: {
				fontSize: size,
			},
		});
	}, {} as FontSizes);
};

export const staticFontStyles = {
	bold: {
		fontWeight: 'bold',
		fontFamily: 'Lexend-Regular',
	},
	title1: {
		fontWeight: '400',
		fontFamily: 'Lexend-Regular',
		fontSize: 18,
		color: '#000000',
	},
	title2: {
		fontWeight: '400',
		fontFamily: 'Lexend-Regular',
		fontSize: 15,
		color: '#000000',
	},
	title3: {
		fontWeight: '400',
		fontFamily: 'Lexend-Regular',
		fontSize: 12,
		color: '#000000',
	},

	titleSemiBold: {
		fontFamily: 'Lexend-SemiBold',
		fontSize: 12,
		color: '#000000',
	},

	titleRegular: {
		fontFamily: 'Lexend-Regular',
		fontSize: 12,
		color: '#000000',
	},

	saleprice: {
		fontFamily: 'Lexend-Regular',
		fontWeight: '500',
		fontSize: 15,
		color: '#000000',
	},

	price: {
		fontFamily: 'Lexend-Regular',
		fontSize: 12,
		fontWeight: '500',
		textDecorationLine: 'line-through', 
		textDecorationStyle: 'solid',
		color: 'rgba(184, 184, 184, 1)',
	},

	priceBlack: {
		fontFamily: 'Lexend-Regular',
		fontSize: 12,
		fontWeight: '500',
		color: 'rgba(0, 0, 0, 1)',
	},

	offer: {
		fontFamily: 'Lexend-Regular',
		fontSize: 12,
		paddingHorizontal: 3,
		paddingVertical: 1,
		backgroundColor: 'rgba(249, 201, 65, 1)',
		color: '#fff',
		borderRadius: 5,
	},

	subtitle1: {
		fontWeight: '400',
		fontFamily: 'Lexend-Regular',
		fontSize: 12,
		color: '#8F8F8F',
	},
	uppercase: {
		textTransform: 'uppercase',
	},
	capitalize: {
		textTransform: 'capitalize',
	},
	alignCenter: {
		textAlign: 'center',
	},
} as const satisfies Record<string, TextStyle>;
