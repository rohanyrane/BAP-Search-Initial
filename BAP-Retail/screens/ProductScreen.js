import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { response } from "../response";
import axios from "axios";



const ProductScreen = ({ search, lat, long }) => {
  const [searchTxt, setSearchText] = useState(`${search}`);
  //   const [Pcontext, setSearchText] = useState(`${search}`);
  //   const [searchTxt, setSearchText] = useState(`${search}`);

//   useEffect(() => {
//     axios
//       .post(
//         "http://localhost:4000/",
//         {
//           message: message,
//         },
//         {
//           context: context,
//         }
//       )
//       .then((response) => {
//         // useDispatch(items : response.context)
//         console.log("Response", response);
//       });
//   }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
      </View>

      <View style={styles.topBar}>
        <View style={styles.locationBar}>
          <AntDesign name="left" size={20} color="black" />
          <View style={styles.location}>
            <Entypo name="location-pin" size={20} color="orange" />
          </View>
          <View>
            <Text>Your Location</Text>
            <View style={styles.address}>
              <Text style={{ fontSize: 12 }}>Koramangala 2nd Block</Text>
              <AntDesign name="down" size={20} color="rgba(220,105,32,1)" />
            </View>
          </View>
        </View>

        <View style={styles.searchBar}>
          <TextInput
            value={searchTxt}
            style={styles.searchInput}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {/* <Entypo name="cross" size={30} color="black" /> */}
        </View>
      </View>

      <View style={styles.section}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.productFound}>23 Products Found</Text>
          {response ? (
            response.responses.map((shop) => {
              const imageSource = shop.message.catalog["bpp/descriptor"].symbol;
              const name = shop.message.catalog["bpp/descriptor"].name;
              const context = shop.context;
              const message=shop.message;
              return (
                <View style={styles.shopCards}>
                  <View style={styles.shopTopBar}>
                    <View style={styles.shopTopBarLeft}>
                      <Image
                        style={styles.shopImage}
                        source={{
                          uri: imageSource
                            ? imageSource
                            : "https://media.istockphoto.com/id/1331491686/vector/element-design.jpg?s=612x612&w=0&k=20&c=QIMRS2IPiQyyTZJR_G1JAjH_ErBBkrDPtQe2GBNgm2w=",
                        }}
                      ></Image>
                      <View>
                        <Text style={styles.name}>
                          <Text style={{ fontWeight: "bold" }}>{name}</Text> by{" "}
                          <Text style={{ fontWeight: "bold" }}>ABC</Text>
                        </Text>
                        <Text>1.8Km</Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={()=>{}}>
                      <Text>Explore All</Text>
                    </TouchableOpacity>
                  </View>
                  <View></View>
                </View>
              );
            })
          ) : (
            <Text>No products</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  top: {
    direction: "flex",
    borderBlockColor: "rgba(220,105,32,1)",
    borderBottomWidth: 5,
    width: "100%",
    justifyContent: "flex-end",
    backgroundColor: "white",
  },
  topBar: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "white",
  },
  locationBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingBottom: 20,
  },
  location: {
    display: "flex",
    backgroundColor: "rgba(220,105,32,0.2)",
    borderRadius: 50,
    minWidth: "5%",
    alignContent: "center",
    justifyContent: "center",
    padding: 5,
  },
  address: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    borderBlockColor: "rgba(220,105,32,1)",
    borderBottomWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 12,
  },
  productFound: {
    fontSize: 12,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 50,
  },
  shopCards: {
    backgroundColor: "white",
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  shopTopBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shopTopBarLeft: {
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
  shopImage: {
    width: Dimensions.get("window").width / 10,
    height: Dimensions.get("window").width / 10,
  },
  explore: {
    color: "rgba(220,105,32,1)",
  },
});
