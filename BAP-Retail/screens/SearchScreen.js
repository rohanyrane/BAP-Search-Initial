import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const navigation = useNavigation();
  const [lat, setLat] = useState(12.9349377);
  const [long, setLong] = useState(77.6055586);

  const [searchTxt, setSearchText] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.locationBar}>
        <View style={styles.location}>
          <Entypo name="location-pin" size={30} color="orange" />
        </View>
        <TouchableOpacity style={styles.selectLocation}>
          <Text>Select Location</Text>
          <AntDesign name="down" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View>
          <Text style={styles.orangeTxt}>Open</Text>
          <Text style={styles.orangeTxt}>Commerce</Text>
          <Text style={styles.blackTxt}>for All</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>
            A global marketplace to discover and buy anything you need. Just
            type what you want to buy and we will take care of the rest.
          </Text>
        </View>
        <View style={styles.searchBox}>
          <FontAwesome
            name="search"
            size={24}
            color="black"
            style={{ flex: 1 }}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Enter Something"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("ProductScreen",{search:searchTxt, lat, long})}>
        <Text>Search</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",
    alignItems: "center",
    // justifyContent:'center'
  },
  locationBar: {
    backgroundColor: "white",
    marginTop: Dimensions.get("window").height / 6,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    display: "flex",

    flexDirection: "row",
    alignItems: "center",
    elevation: 10,
  },
  location: {
    display: "flex",
    backgroundColor: "rgba(220,105,32,0.2)",
    borderRadius: 50,
    minWidth: "10%",
    alignContent: "center",
    justifyContent: "center",
    padding: 5,
  },
  selectLocation: {
    paddingLeft: 20,
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: Dimensions.get("window").height / 10,
  },
  orangeTxt: {
    color: "rgba(220,105,32,1)",
    fontWeight: "bold",
    fontSize: 50,
  },
  blackTxt: {
    fontWeight: "bold",
    fontSize: 25,
  },
  info: {
    color: "rgba(0,0,0,0.3)",
    letterSpacing: 1,
    paddingVertical: 20,
  },
  searchBox: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    padding: 15,
    gap: 20,
    elevation: 20,
  },
  searchInput: {
    flex: 10,
  },
  button:{
    backgroundColor:'rgba(220,105,32,1)',
    color:'white',
    paddingHorizontal:20,
    paddingVertical:10,
    marginTop:30
  }
});
