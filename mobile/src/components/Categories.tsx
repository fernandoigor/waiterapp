import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Platform } from "react-native";
import { Category } from "../types/Category";

interface CategoriesProps{
  categories: Category[];
  selectedCategory: string;
  selectCategory: (category: string) => void;
}

export function Categories({ categories, selectedCategory, selectCategory } : CategoriesProps) {


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
              onPress={() => {selectCategory(category._id);}}
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
      {
        !categories && 
        <View className="mt-4 items-center justify-center">
          <Text className="text-primary font-bold">Nenhuma categoria cadastrada</Text>
        </View>
      }
    </View>
  );
}