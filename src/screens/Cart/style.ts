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

    lbl_promo: {
        fontSize: 12,
        fontFamily: 'Lexend-Regular',
        fontWeight: '400',
        color: '#000',
    },

    lbl_redeem: {
        fontSize: 12,
        fontFamily: 'Lexend-Regular',
        fontWeight: '400',
        color: 'rgba(8, 194, 93, 1)',
    },

    lbl_sub: {
        fontSize: 15,
        fontFamily: 'Lexend-Regular',
        fontWeight: '400',
        color: '#000',
    },

    lbl_total: {
        fontSize: 18,
        fontFamily: 'Lexend-Regular',
        fontWeight: '400',
        color: '#000',
    },
    lbl_totalprice: {
        fontSize: 18,
        fontFamily: 'Lexend-Regular',
        fontWeight: '500',
        color: '#000',
    },

    lbl_info: {
        fontSize: 12,
        fontFamily: 'Lexend-Regular',
        fontWeight: '500',
        color: 'rgba(168, 168, 168, 1)',
    },

    lbl_proceed: {
        flex: 1,
         height: 70,
        fontSize: 18,
        textAlignVertical:'center',
        fontFamily: 'Lexend-Regular',
        fontWeight: '400',
        textAlign:'center',
        borderColor: 'rgba(8, 194, 93, 1)',
        borderWidth: 2,
        borderRadius: 11,
        color: '#000',
    },

});
export default styles;