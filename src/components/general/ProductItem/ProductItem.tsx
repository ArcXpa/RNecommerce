import { View, Text, DimensionValue } from "react-native";

import LogoLight from "@/theme/assets/images/tom_light.png";
import LogoDark from "@/theme/assets/images/tom_dark.png";

import { ImageVariant } from "@/components/atoms";
import { useTheme } from "@/theme";
import { isImageSourcePropType } from "@/types/guards/image";
import SVGoffericon from "@/assets/svg/offericon.svg";
import SVGplus from "@/assets/svg/btnplus.svg";
import SVGminus from "@/assets/svg/btnminus.svg";

import Cat1 from "@/assets/images/cat1.png";
import Cat2 from "@/assets/images/cat2.png";
import Cat3 from "@/assets/images/cat3.png";
import Cat4 from "@/assets/images/cat4.png";
import { Image } from "react-native-svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import React from "react";
import { useDispatch } from "react-redux";

import {
  addItem,
  addItemAsync,
  cartSlice,
  deleteItem,
  selectCart,
  updateItem,
} from "@/reducers/cartSlice";
import { Item } from "@/types/cartTypes";

type Props = {
  id: string;
  title: string;
  thumb: string;
  price: number;
  salePrice: number;
  qty: number;
};

function ProductItem({ id, title, thumb, price, salePrice, qty }: Props) {
  const dispatch = useDispatch();
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

  const handleAddItem = async (itm: Item) => {
    try {
      await dispatch(addItemAsync(itm) as any);
    } catch (error) {
      console.error("Error adding item:", error);
      // Optionally, you can handle the error further or display an error message to the user
    }
  };

  const handleRemoveItem = async (itm: string) => {
    try {
      // Assuming deleteItem returns a Promise
      await (dispatch(deleteItem(itm)) as any);
    } catch (error) {
      console.error("Error removing item:", error);
      // Optionally, you can handle the error further or display an error message to the user
    }
  };

  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={[layout.row, gutters.marginBottom_20, layout.itemsCenter]}>
        <ImageVariant
          testID="brand-img"
          style={{ height: 78, width: "40%", borderRadius: 18 }}
          source={{ uri: thumb }}
          resizeMode="contain"
        />
        <View style={[gutters.marginLeft_10, layout.flex_1, layout.itemsEnd]}>
          <View>
            <Text style={[fonts.titleRegular, gutters.marginTop_2]}>
              {title}
            </Text>

            <View style={[layout.row, gutters.marginTop_2, layout.itemsEnd]}>
              <Text style={[fonts.saleprice]}>₹{salePrice}</Text>
              <Text style={[fonts.price, gutters.marginLeft_6]}>₹{price}</Text>

              <Text style={[fonts.offer, gutters.marginLeft_12]}>
                ₹{(((price - salePrice) / price) * 100).toFixed(0)}%
              </Text>
            </View>

            <View
              style={[
                layout.row,
                layout.itemsCenter,
                layout.left0,
                gutters.marginTop_10,
                {
                  width: 158,
                  backgroundColor: "rgba(245, 245, 245, 1)",
                  borderRadius: 5,
                  padding: 3,
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  handleRemoveItem(id);
                }}
              >
                <SVGminus />
              </TouchableOpacity>

              <Text
                style={[
                  layout.flex_1,
                  { textAlign: "center", color: "rgba(149, 149, 149, 1)" },
                ]}
              >
                {qty}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  const item: Item = {
                    id,
                    title,
                    thumb,
                    price,
                    salePrice,
                    qty: 1,
                  };
                  handleAddItem(item);
                }}
              >
                <SVGplus />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

ProductItem.defaultProps = {
  id: "1",
  title: "Title",
  price: 0,
  qty: 0,
  salePrice: 0,
  thumb:
    "https://images.pexels.com/photos/3688/food-dinner-lunch-chicken.jpg?auto=compress&cs=tinysrgb&w=800",
};

export default ProductItem;
