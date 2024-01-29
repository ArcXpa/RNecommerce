import { Platform, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
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

});
export default styles;