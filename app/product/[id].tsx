import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Text>{id}</Text>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {},
});
