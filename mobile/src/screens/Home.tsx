import { View, Text, TextInput, SafeAreaView, Platform } from "react-native";

import { Feather } from "@expo/vector-icons";

import colors from "tailwindcss/colors";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Categories } from "../components/Categories";
import { Products } from "../components/Products";
import Separator from "../components/Separator";


export function Home() {
  const isAndroid = Platform.OS === "android";
  return (

    <SafeAreaView className="flex-1 flex-col bg-secondary mx-6">
      {
        isAndroid && (<View className="mt-8"></View>)
      }
      <Header />
      <Categories />
      <Products />
      <Button className="w-full" value="Novo Pedido" onPress={()=>{console.log("Novo Pedido");}}/>

      {/* <Feather name="home" size={34} color={colors.green[500]} />
        <Text className="text-green-500 text-2xl font-bold">
        Hello 
        </Text>
        <Button className="w-full mt-4" />
        <TextInput className="w-full my-4 bg-white p-5 rounded-md border-2" /> */}
      {
        isAndroid && (<View className="mb-4"></View>)
      }
    </SafeAreaView>
  );
}