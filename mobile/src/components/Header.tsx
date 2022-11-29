import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface HeaderInterface {
  tableSelected: string;
  cancelOrder: () => void;
}

export function Header({ tableSelected, cancelOrder }: HeaderInterface) {
  return (
    
    <>
      {
        tableSelected === "" &&
        <>
          <Text className="text-gray-800">Bem-vindo(a) ao</Text>
          <Text className="text-2xl text-gray-800"><Text className="font-bold">WAITER</Text>APP</Text>
        </>
      }
      {
        tableSelected !== "" &&
        <>
          <View className="flex-row justify-between">
            <Text className="text-gray-800 font-bold text-xl">Pedido</Text>
            <Text className="text-2xl text-gray-800"><Text className="font-bold">WAITER</Text>APP</Text>
            <TouchableOpacity
              onPress={cancelOrder}>
              <Text className="text-primary  font-bold mt-1 ">Cancelar</Text>
            </TouchableOpacity>
          </View>
          <View className="border-2 border-black/10 mt-4 p-2">
            <Text className="text-sm text-gray-800">Mesa { tableSelected }</Text>
          </View>
        </>
      }
    </>
  );
}