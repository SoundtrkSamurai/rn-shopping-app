import { Product } from "@/types/interfaces";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const getProduct = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_URL}/products/${id}`);
  return response.json();
};

export default function useGetProduct(productId: string) {
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId),
  });

  return useMemo(
    () => ({
      product,
      isLoading,
      error,
    }),
    [error, isLoading, product]
  );
}
