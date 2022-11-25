import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Platform } from "react-native";

const categories = [
  {
    _id: "6372d595f9ebdda354700c8d",
    name: "Pizza",
    icon: "🍕",
  },
  {
    _id: "6372d5bff9ebdda354700c90",
    name: "Bebidas",
    icon: "🍻",
  },
  {
    _id: "6372d5d2f9ebdda354700c92",
    name: "Burgers",
    icon: "🍔",
  },
  {
    _id: "6372d5dcf9ebdda354700c94",
    name: "Promoções",
    icon: "🏷",
  },
];

export function Categories() {

  const [selectedCategory, setSelectedCategory] = useState("");

  function handleSelectCategory(categoryId: string){
    const category = selectedCategory === categoryId ? "" : categoryId;
    setSelectedCategory(category);
  }
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 24}}
        data={categories}
        keyExtractor={(category) => category._id}
        renderItem={({item : category})=>{
          return (
            <TouchableOpacity
              onPress={() => {handleSelectCategory(category._id);}}
              className={"h-32"}
            >
              <View className={`items-center mx-4 py-2 ${(selectedCategory===category._id ? "" : "opacity-40")}`}>
                <View className={`bg-secondary ${(selectedCategory===category._id ? "shadow-md" : "shadow-sm")} shadow-gray-300 rounded-full p-4`}>
                  <Text className="text-2xl" >{category.icon}</Text>
                </View>
                <Text className="mt-4 font-bold text-gray-800">{category.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}