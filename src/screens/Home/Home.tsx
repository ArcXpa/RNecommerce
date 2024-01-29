import { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

import { ImageVariant } from "@/components/atoms";
import { CatItem, OfferItem, ProductItem } from "@/components/general";
import { SafeScreen } from "@/components/template";
import { useTheme } from "@/theme";
import { fetchOne } from "@/services/users";

import { isImageSourcePropType } from "@/types/guards/image";

import SendImage from "@/theme/assets/images/send.png";
import ColorsWatchImage from "@/theme/assets/images/colorswatch.png";
import TranslateImage from "@/theme/assets/images/translate.png";

import SVGplace from "@/assets/svg/place.svg";
import SVGarrowdown from "@/assets/svg/arrowdown.svg";
import LogoMint from "@/assets/images/mintimage.png";
import LogoUser from "@/assets/images/user.png";
import SVGtriangle from "@/assets/svg/triangle.svg";
import SVGcart from "@/assets/svg/cartimg.svg";

import SVGoffericon from "@/assets/svg/offericon.svg";
import styles from "./style";

import CATSDATA from "@/assets/data/categories.json";
import OFFERSDATA from "@/assets/data/offers.json";
import PRODUCTSDATA from "@/assets/data/products.json";

import Cat1 from "@/assets/images/cat1.png";
import Cat2 from "@/assets/images/cat2.png";
import Cat3 from "@/assets/images/cat3.png";
import Cat4 from "@/assets/images/cat4.png";
import React from "react";
import { ApplicationScreenProps } from "@/types/navigation";

function Home({ navigation }: ApplicationScreenProps) {
  const { t } = useTranslation(["Home", "welcome"]);

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

  const [currentId, setCurrentId] = useState(-1);

  const { isSuccess, data, isFetching } = useQuery({
    queryKey: ["Home", currentId],
    queryFn: () => {
      return fetchOne(currentId);
    },
    enabled: currentId >= 0,
  });

  useEffect(() => {
    if (isSuccess) {
      Alert.alert(t("Home:welcome", data.name));
    }
  }, [isSuccess, data]);

  const onChangeTheme = () => {
    changeTheme(variant === "default" ? "dark" : "default");
  };

  const onChangeLanguage = (lang: "fr" | "en") => {
    void i18next.changeLanguage(lang);
  };

  if (
    !isImageSourcePropType(SendImage) ||
    !isImageSourcePropType(ColorsWatchImage) ||
    !isImageSourcePropType(TranslateImage)
  ) {
    throw new Error("Image source is not valid");
  }

  return (
    <SafeScreen>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={[
          layout.flex_1,
          layout.itemsCenter,
          { backgroundColor: "rgba(255, 255, 255, 1)" },
        ]}
      >
        <>
          <View
            style={[
              layout.row,
              gutters.marginHorizontal_20,
              gutters.paddingTop_26,
              gutters.paddingBottom_24,
              { borderBottomWidth: 1, borderColor: "rgba(221, 221, 221, 1)" },
            ]}
          >
            <SVGplace />

            <View
              style={[
                layout.flex_1,
                gutters.paddingLeft_18,
                gutters.paddingRight_24,
              ]}
            >
              <View style={[layout.row, layout.left0, layout.itemsCenter]}>
                <Text style={[fonts.title1, gutters.paddingRight_12]}>
                  Work
                </Text>
                <SVGarrowdown />
              </View>
              <Text style={[fonts.subtitle1]}>
                P.O. Box 3625. Sheikh Khalifa Bin Saeed Street Dubai. P.O. Box
                901
              </Text>
            </View>

            <View style={[]}>
              <ImageVariant
                testID="brand-img"
                style={[styles.avatar]}
                source={LogoUser}
                resizeMode={"contain"}
              />
            </View>
          </View>

          <View style={[gutters.paddingHorizontal_20, gutters.marginTop_24]}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
              data={PRODUCTSDATA}
              renderItem={({ item }) => (
                <ProductItem
                  title={item.title}
                  thumb={item.thumb}
                  price={item.price}
                  salePrice={item.salePrice}
                />
              )}
              ListHeaderComponent={() => (
                <>
                  <View
                    style={[
                      layout.row,
                      layout.itemsCenter,
                      // gutters.marginHorizontal_20,
                      // gutters.marginTop_24,
                      gutters.marginBottom_24,
                    ]}
                  >
                    <ImageVariant
                      testID="brand-img"
                      style={[]}
                      source={LogoMint}
                      resizeMode={"contain"}
                    />
                    <View
                      style={[
                        layout.flex_1,
                        gutters.paddingLeft_18,
                        gutters.paddingRight_24,
                      ]}
                    >
                      <View
                        style={[layout.row, layout.left0, layout.itemsCenter]}
                      >
                        <Text style={[fonts.title2, gutters.paddingRight_12]}>
                          Store 1
                        </Text>
                      </View>
                      <Text style={[fonts.subtitle1]}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </Text>
                    </View>
                  </View>

                  <View
                    style={[
                      layout.row,
                      // gutters.paddingHorizontal_20,
                      gutters.marginBottom_24,
                    ]}
                  >
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={OFFERSDATA}
                      renderItem={({ item }) => <OfferItem />}
                      keyExtractor={(item) => item.id}
                    />
                  </View>

                  <View style={[layout.row, gutters.marginBottom_24]}>
                    <FlatList
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      data={CATSDATA}
                      renderItem={({ item }) => <CatItem title={item.title} thumb={item.thumb} />}
                      keyExtractor={(item) => item.id}
                    />
                  </View>
                </>
              )}
              ListFooterComponent={() => <View style={{ height: 300 }} />}
              keyExtractor={(item) => item.id}
            />
          </View>
        </>
      </ScrollView>

      <View
        style={[
          {
            flex: 1,
            flexDirection: "row",
            borderRadius: 17,
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,

            minHeight: 84,
            zIndex: 10,
            backgroundColor: "rgba(8, 194, 93, 1)",
          },
        ]}
      >
        <View
          style={[
            {
              position: "absolute",
              marginTop: -10,
              width: "100%",
              alignItems: "center",
            },
          ]}
        >
          <SVGtriangle />
        </View>

        <View
          style={[
            layout.flex_1,
            layout.row,
            layout.itemsCenter,
            gutters.paddingHorizontal_19,
            gutters.paddingVertical_22,
          ]}
        >
          <View style={[layout.flex_1]}>
            <Text style={[styles.lbl_checkoutdesc]}>3 Items</Text>
            <Text style={[styles.lbl_checkoutprice]}>₹ 300</Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Cart");
            }}
          >
            <View
              style={[
                layout.row,
                layout.itemsCenter,
                gutters.paddingHorizontal_28,
                gutters.paddingVertical_12,
                { backgroundColor: "#fff", borderRadius: 10 },
              ]}
            >
              <Text style={[gutters.marginRight_16, styles.lbl_checkout]}>
                Checkout
              </Text>
              <SVGcart />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeScreen>
  );
}

export default Home;
