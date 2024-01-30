import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'rgba(255, 255, 255, 1)',
	},
	shadeline: {
		borderBottomWidth: 1,
		borderColor: 'rgba(221, 221, 221, 1)',
	},
	avatar: {
		height: 36,
		width: 36,
		borderRadius: 18,
		borderWidth: 2,
		borderColor: 'rgba(8, 194, 93, 1)',
	},
	lbl_checkout: {
		fontSize: 18,
		fontFamily: 'Lexend-Regular',
		fontWeight: '400',
	},

	lbl_checkoutprice: {
		fontSize: 18,
		fontFamily: 'Lexend-Regular',
		fontWeight: '400',
		color: '#fff',
	},

	lbl_checkoutdesc: {
		fontSize: 15,
		fontFamily: 'Lexend-Regular',
		fontWeight: '400',
		color: '#fff',
	},

	toptriange: {
		position: 'absolute',
		marginTop: -10,
		width: '100%',
		alignItems: 'center',
	},
	checkoutbox: {
		flex: 1,
		flexDirection: 'row',
		borderRadius: 17,
		position: 'absolute',
		bottom: 20,
		left: 20,
		right: 20,

		minHeight: 84,
		zIndex: 10,
		backgroundColor: 'rgba(8, 194, 93, 1)',
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		position: 'relative',
 
		minHeight: 320,
		padding: 35,
		width: '90%',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 4,
		paddingVertical: 12,
		paddingHorizontal: 48,
		elevation: 2,
		width: '100%',
		marginTop: 12,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
		fontFamily:'Lexend-Regular',
		fontWeight: '500',
		fontSize: 18,
	},
	errText: {
		marginBottom: 12,
		textAlign: 'center',
		fontFamily:'Lexend-Regular',
		fontWeight: '500',
		color: 'red',
		fontSize: 10,
	},
	btclose: {
		alignSelf: 'flex-end',
	},
	regText: {
		marginBottom: 15,
		textAlign: 'right',
		fontFamily:'Lexend-Regular',
		fontWeight: '500',
		fontSize: 14,
	},
	regbtn: {
		marginTop: 20, 
		alignItems:'flex-end',
		alignSelf:'flex-end',
	},
	input: {
		backgroundColor: 'rgba(245, 245, 245, 1)',
		marginBottom: 16,
		width: '100%',
		paddingHorizontal: 12,
	},
});
export default styles;
