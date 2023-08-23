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
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { response } from "../response";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Slider from "react-native-slider";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
const ProviderScreen = ({ route }) => {
  const { search, lat, long } = route.params;
  const [searchTxt, setSearchText] = useState(`${search}`);
  const [isModalVisible, setModalVisible] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderValues, setSliderValues] = useState([0, 1000]);
  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleValuesChange = (values) => {
    setSliderValues(values);
  };
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
        <View style={styles.top}>
          <Text style={styles.productFound}>23 Products Found</Text>
          <TouchableOpacity onPress={() => toggleModal()}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={20}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {response ? (
            response.responses.map((shop) => {
              const imageSource = shop.message.catalog["bpp/descriptor"].symbol;
              const name = shop.message.catalog["bpp/descriptor"].name;
              const context = shop.context;
              const id = shop.message.catalog.id;
              // console.log(message);
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
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("ProductScreen", { context, id });
                      }}
                    >
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modal.modalContainer}>
          <View style={modal.modalContent}>
            <View style={modal.sort}>
              <Text style={modal.headings}>Sort : </Text>
              <Text style={modal.subheadings}>By Price :</Text>

              <View style={modal.sliderContainer}>
                <MultiSlider
                  values={sliderValues}
                  min={0}
                  max={1000}
                  step={1}
                  sliderLength={300}
                  onValuesChange={handleValuesChange}
                />
                <Text style={styles.rangeText}>
                  Price Range: ₹{sliderValues[0]} - ₹{sliderValues[1]}
                </Text>
              </View>

              <Text style={modal.subheadings}>By Rating :</Text>
              <View style={modal.flexContainer}>
                <TouchableOpacity style={modal.button}>
                  <Text>Low to High</Text>
                </TouchableOpacity>
                <TouchableOpacity style={modal.button}>
                  <Text>High to Low</Text>
                </TouchableOpacity>
              </View>
              <View style={modal.flexContainer}></View>
            </View>
            <View>
              <Text style={modal.headings}>Filter : </Text>
              <Text style={modal.subheadings}>Offers :</Text>
              <View style={modal.flexContainer}>
                <TouchableOpacity style={modal.button}>
                  <Text>Offer1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={modal.button}>
                  <Text>Offer2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={modal.button}>
                  <Text>Offer3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={modal.button}>
                  <Text>Offer4</Text>
                </TouchableOpacity>
                <TouchableOpacity style={modal.button}>
                  <Text>Offer5</Text>
                </TouchableOpacity>
              </View>
              <Text style={modal.subheadings}>Category :</Text>
              <View style={modal.flexContainer}>
                <TouchableOpacity style={modal.button}>
                  <Text>Category1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={modal.button}>
                  <Text>Category2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={modal.button}>
                  <Text>Category3</Text>
                </TouchableOpacity>
                <TouchableOpacity style={modal.button}>
                  <Text>Category4</Text>
                </TouchableOpacity>
                <TouchableOpacity style={modal.button}>
                  <Text>Category5</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProviderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  top: {
    direction: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
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

const modal = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.5)",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    justifyContent: "center",
    // alignItems: "center",
    padding: 20,
    borderRadius: 25,
    width: "100%",
  },
  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 10,
  },
  headings: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  subheadings: {
    fontWeight: "500",
    fontSize: 14,
    marginVertical: 5,
  },
  sliderContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  slider: {
    flex: 1,
    marginHorizontal: 16,
  },
  button: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "white",
  },
});
