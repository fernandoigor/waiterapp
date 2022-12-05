import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Alert, Platform } from "react-native";

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
  const isAndroid = Platform.OS === "android";

  const [openList, setOpenList] = useState(false);

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

  function ProductInCart (product: ProductCartInterface){
    return (
      <View className={"w-full flex-row items-center rounded-m"}>
        <Image
          className="w-12 h-10 rounded-md"
          source={{                    
            uri: `http://192.168.0.9:3001/uploads/${product.imagePath}`,
          }}
        />
        <Text className="mx-2 text-xs text-gray-500">{product.quantity}x</Text>
        
        <View className={"flex-col justify-between"}>
          <Text className="font-bold text-sm text-gray-800">{product.name}</Text>
          <Text className="text-gray-500">{formatCurrency(product.price)}</Text>
        </View>
        <View className={"flex-row gap-8 ml-auto"}>
          <TouchableOpacity
            onPress={()=>handleAddProduct(product._id)}
          >
            <AntDesign name="pluscircleo" size={18} color="#D73035"  />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=>handleRemoveProduct(product._id)}
          >
            <AntDesign name="minuscircleo" size={18} color="#D73035"  />
          </TouchableOpacity>
        </View>

      </View>);
  }

  return (
    <View className={`pt-4 pb-8 px-2 ${openList ? "h-[75%]" : "max-h-60"} border-t-2 border-primary/20 bg-red-50 ${isAndroid ? "pb-4" : "pb-8"}`}>
      {
        !!cart?.length &&
        <>
          <TouchableOpacity
            onPress={()=>{setOpenList(!openList);}}
            className="items-center justify-center -top-3 -mb-2"
          >
            <AntDesign name={`${openList ? "down" : "up"}`} size={18} color="#D73035"  />
          </TouchableOpacity>
          <FlatList
            showsVerticalScrollIndicator={false}
            // contentContainerStyle={openList ? {paddingBottom: cart.length * 25 }  : {paddingBottom: 20}}
            contentContainerStyle={{paddingBottom: 20}}
            className={"mb-4 w-full"}
            ItemSeparatorComponent={Separator}
            data={cart}
            keyExtractor={(product) => product._id}
            renderItem={({item : product})=>{
              return ProductInCart(product);
            }}
            
          />
          
        </>
      }
      <View className="flex-row justify-between">
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