import useGetProducts from "@/hooks/api/useGetProducts";
import { Text, View } from "react-native";

export default function Index() {
  const { products, isLoading, error } = useGetProducts();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error loading products</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
