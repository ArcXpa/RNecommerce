import { View, Text, DimensionValue, Dimensions } from "react-native";
import { useTheme } from "@/theme";
import SVGplus from "@/assets/svg/btnplus.svg";
import SVGminus from "@/assets/svg/btnminus.svg";

import { TouchableOpacity } from "react-native-gesture-handler";
import React from "react";
import styles from "./style";
type Props = {
  id?: String | null;
  title?: String;
  thumb?: String;
  price?: Number;
  salePrice?: Number;
  height?: DimensionValue;
  width?: DimensionValue;
  mode?: "contain" | "cover" | "stretch" | "repeat" | "center";
  selected?: String | null;
  onItemClick: () => void;
};

function CartItem({
  id,
  title,
  thumb,
  price,
  salePrice,
  height,
  width,
  mode,
  selected,
  onItemClick,
}: Props) {
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

  const deviceWidth = Dimensions.get('window').width;
  

  return (
    <TouchableOpacity onPress={onItemClick} style={[gutters.marginBottom_20, ]}>
		<View style={[gutters.paddingHorizontal_16, gutters.paddingVertical_16, {  borderRadius: 15, borderWidth: id === selected? 1:0, borderColor: 'rgba(8, 194, 93, 1)',  }]}>
		<View style={[ layout.row, {width: deviceWidth,  flex: 10}   ]}>
        <View style={[{  flex: 5} ]}>
          <Text style={[ styles.titleRegular,  gutters.marginTop_2]}>{title}</Text>

          <View style={[layout.row,  gutters.marginTop_2, layout.itemsEnd]}>
            <Text style={[fonts.saleprice]}>₹{salePrice}</Text>
            <Text style={[fonts.price, gutters.marginLeft_6]}>₹{price}</Text>

            <Text style={[fonts.offer, gutters.marginLeft_12]}>
              ₹{(((price - salePrice) / price) * 100).toFixed(0)}%
            </Text>
          </View>


        </View>

		<View style={{  flex: 4.5, justifyContent: 'center' }}>
		<View
            style={[
              layout.row,
              layout.itemsCenter,
 
              {
                width: 128,
                backgroundColor: "rgba(245, 245, 245, 1)",
                borderRadius: 5,
                padding: 3,
              },
            ]}
          >
            <TouchableOpacity onPress={() => {}}>
              <SVGminus />
            </TouchableOpacity>

            <Text
              style={[
                layout.flex_1,
                { textAlign: "center", color: "rgba(149, 149, 149, 1)" },
              ]}
            >
              0
            </Text>

            <TouchableOpacity onPress={() => {}}>
              <SVGplus />
            </TouchableOpacity>
          </View>

		  <Text style={[fonts.saleprice, gutters.marginTop_4, {textAlign:'right', width: 128,}]}>₹{salePrice}</Text>
		</View>
      </View>
		</View>

    </TouchableOpacity>
  );
}

CartItem.defaultProps = {
  id: null,
  title: "Title",
  price: 0,
  salePrice: 0,
  thumb:
    "https://images.pexels.com/photos/3688/food-dinner-lunch-chicken.jpg?auto=compress&cs=tinysrgb&w=800",
  height: 78,
  width: 111,
  mode: "contain",
  selected: null,
};

export default CartItem;


