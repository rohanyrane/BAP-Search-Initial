import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';


const ProductScreen = ({route}) => {
    const {context,id}= route.params;
    console.log("context : ", context, " id :  ", id);
    console.log("BPP: ", context.bpp_id);
    return (
        <SafeAreaView style={styles.container}>
            <Text>Hello</Text>
        </SafeAreaView>
    );
}

export default ProductScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    }
})