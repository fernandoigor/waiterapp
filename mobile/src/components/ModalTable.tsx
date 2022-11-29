import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, Dimensions, TextInput } from "react-native";

import { Button } from "../components/Button";

import { AntDesign } from "@expo/vector-icons";



interface ModalTableInterface{
    onClose: () => void;
    saveTableNumber: (number:string) => void;
}



export function ModalTable({ onClose, saveTableNumber } : ModalTableInterface) {

  const [numberTable, setNumberTable] = useState("");


  return (
    <View className={"w-96 rounded-md bg-secondary p-4"}>
      <View className={"flex-row justify-between bg-secondary"}>
        <Text className="font-bold text-gray-800">Informar a mesa</Text>
        <TouchableOpacity 
          onPress={onClose}
        >
          <AntDesign name="close" size={18} color="gray"  />
        </TouchableOpacity>
      </View>
      <TextInput
        onChangeText={setNumberTable}
        value={numberTable}
        placeholder="Numero da mesa"
        keyboardType="numeric"
        className="my-8 border-solid border-2 border-black/10 rounded-md p-4"
      >
      </TextInput>
      <Button className="w-full mr-4" value="Salvar" onPress={()=>{ saveTableNumber(numberTable); }}/>
    </View>
  );
}