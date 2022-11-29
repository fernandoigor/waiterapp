import React from "react";
import { View, Image, Text, TouchableOpacity, FlatList, Dimensions } from "react-native";

import Separator from "../components/Separator";
import { Button } from "../components/Button";

import { AntDesign } from "@expo/vector-icons";

import colors from "tailwindcss/colors";

import { formatCurrency } from "../utils/formatCurrency";

import { ProductInterface } from "./Products";

export interface ProductDetailsInterface {
    _id: string;
    name: string;
    description: string;
    imagePath: string;
    price: number;
    ingredients: {
        name: string;
        icon: string;
        _id: string;
    }[];
}
interface ProductDetailsProps{
    product: ProductDetailsInterface | null;
    tableSelected: string;
    onClose: () => void;
    addProductCart: (product: ProductInterface) => void;
}



export function ProductDetails({ product, tableSelected, onClose, addProductCart }: ProductDetailsProps) {
  const fontEscale = Dimensions.get("window").height < 700 ;


  function handleAddProductCart(){
    product && addProductCart(product);
    onClose();
  }


  return (
    <View className={"flex-1 flex-col rounded-md bg-secondary my-16"}>
      <TouchableOpacity 
        className="absolute -top-4 -right-4 z-10 bg-white/80 rounded-full p-1"
        onPress={onClose}
      >
        <AntDesign name="closecircle" size={48} color="black"  />
      </TouchableOpacity>
      <Image
        className="w-96 h-48  rounded-md"
        source={{                    
          uri: `http://192.168.0.9:3001/uploads/${product.imagePath}`,
        }}
      />
      <View className={"w-80 mx-4 mt-4 flex-col"}>
        <Text className=" w-full font-bold text-2xl text-gray-800">
          {product.name}
        </Text>
        <Text className={`mt-2 text-lg${fontEscale ? "/2" : ""} text-gray-800`}>
          {product.description}
        </Text>
      </View>

      { !!product.ingredients.length && <Text className="mx-4 mt-4 font-bold text-md text-gray-600">Ingredientes</Text> }
      <FlatList
        showsVerticalScrollIndicator={false}
        className={"mx-4 mt-2 mb-4"}
        data={product.ingredients}
        keyExtractor={(ingredient) => ingredient._id}
        renderItem={({item : product})=>{
          return (
            <View className={"mb-2 flex-row justify-start border-2 border-black/10"}>
              <Text className="mx-4 font-bold text-xl text-gray-800">{product.icon}</Text>
              <Text className="ml-2 text-sw text-gray-800 leading-7" >{product.name}</Text>
            </View>
          );
        }}
      />

      <View className={"w-96 mb-4 flex-row justify-between items-center"}>
        <View className={"ml-4 flex-col justify-around items-left"}>
          <Text className="text-gray-800">Preço</Text>
          <Text className="font-bold text-gray-800 text-xl">{formatCurrency(product.price)}</Text>
        </View>
        <Button
          className={`mr-4 w-48 ${tableSelected==="" && "bg-gray-300"}`}
          value="Adicionar ao pedido"
          onPress={handleAddProductCart}
          disabled={tableSelected===""}
        />
      </View>
    </View>
  );
}