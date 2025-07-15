import ProductCard from "@/components/ProductCard";
import useGetProducts from "@/hooks/api/useGetProducts";
import { Product } from "@/types/interfaces";
import { FlashList } from "@shopify/flash-list";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const { products, refetchProducts, isRefetchingProducts } = useGetProducts();

  const renderProduct = useCallback(
    ({ item }: { item: Product }) => <ProductCard product={item} />,
    []
  );

  return (
    <View style={styles.container}>
      <FlashList
        data={products ?? []}
        renderItem={renderProduct}
        keyExtractor={(item: Product) => item.id.toString()}
        estimatedItemSize={200}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
        refreshing={isRefetchingProducts}
        onRefresh={refetchProducts}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
