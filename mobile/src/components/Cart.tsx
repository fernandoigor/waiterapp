import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from "react-native";

import Separator from "../components/Separator";

import { AntDesign } from "@expo/vector-icons";


import { formatCurrency } from "../utils/formatCurrency";
import { Button } from "./Button";


interface CartInterface {
  cart: ProductCartInterface[] | null;
  handleSetCart: (el:ProductCartInterface[]) => void;
  confirmOrder: () => void;
}

export interface ProductCartInterface{
  _id: string;
  name: string;
  imagePath: string;
  price: number;
  quantity: number;
}





export function Cart( { cart, handleSetCart, confirmOrder }: CartInterface) {

  const total = cart ? cart.reduce((acc, {price, quantity}) => acc + (price * quantity) ,0) : 0;

  function handleConfirmOrder(){
    return Alert.alert(
      "Confirmar o pedido?",
      "",
      [
        {
          text: "Sim",
          onPress: () => {
            confirmOrder();
          },
        },
        {
          text: "Não",
        },
      ]
    );
  }
  function handleAddProduct(id : string){
    if(cart){
      const productAdded = cart.find(product => product._id === id);
      if(productAdded){
        productAdded.quantity++;
      }

      handleSetCart([...cart]);
    }
  }
  function handleRemoveProduct(id : string){
    if(cart){
      const productAdded = cart.find(product => product._id === id);
      if(productAdded){
        productAdded.quantity--;
        if(productAdded.quantity == 0){
          cart = cart.filter(product => product._id !== id);
        }
      }
      handleSetCart([...cart]);
    }
  }

  return (
    <View className="pt-4 mb-2 max-h-60 border-t-2 border-primary/20">
      <FlatList
        showsVerticalScrollIndicator={false}
        className="mb-4 w-full"
        ItemSeparatorComponent={Separator}
        data={cart}
        keyExtractor={(product) => product._id}
        renderItem={({item : product})=>{
          return (
  
            <View className={"flex-1 flex-row items-center rounded-m"}>
              <Image
                className="w-12 h-10 rounded-md"
                source={{                    
                  uri: `http://192.168.0.9:3001/uploads/${product.imagePath}`,
                }}
              />
              <Text className="ml-2 text-xs text-gray-500">{product.quantity}x</Text>
              <View className={"h-full ml-4 flex-1 flex-col justify-between"}>
                <Text className="font-bold text-sm text-gray-800">{product.name}</Text>
                <View className={"flex-row justify-between items-end"}>
                  <Text className=" text-gray-500">{formatCurrency(product.price)}</Text>
                  <View className={"flex-row justify-between items-end gap-8"}>
                    <TouchableOpacity
                      className={"-top-2 text-red"}
                      onPress={()=>handleAddProduct(product._id)}
                    >
                      <AntDesign name="pluscircleo" size={18} color="#D73035"  />
                    </TouchableOpacity>
                    <TouchableOpacity
                      className={"-top-2 text-red"}
                      onPress={()=>handleRemoveProduct(product._id)}
                    >
                      <AntDesign name="minuscircleo" size={18} color="#D73035"  />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />
      <View className="m-0 flex-row justify-between">
        <View className="flex-col">
          <Text className="text-gray-800">Preço</Text>
          <Text className="font-bold text-gray-800 text-xl">{ formatCurrency(total) }</Text>
        </View>
        <Button
          className={`w-48 ${!cart?.length ? "bg-gray-400" : ""}`}
          value="Confirmar Pedido"
          onPress={handleConfirmOrder}
          disabled={!cart?.length}
        />
      </View>
    </View>
  );
}