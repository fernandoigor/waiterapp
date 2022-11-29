import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Modal, Alert } from "react-native";

import Separator from "../components/Separator";

import { AntDesign } from "@expo/vector-icons";

import colors from "tailwindcss/colors";

import { formatCurrency } from "../utils/formatCurrency";
import { ProductDetails, ProductDetailsInterface } from "../components/ProductDetails";
import { ProductCartInterface } from "./Cart";

interface ProductsInterface {
  tableSelected: string;
  setTableModalVisible: () => void;
  cart: ProductCartInterface[] | null;
  handleSetCart: (el:ProductCartInterface[]) => void;
}
export interface ProductInterface {
    _id: string;
    name: string;
    description: string;
    imagePath: string;
    price: number;
    ingredients: any[];
}

const products = [
  {
    _id: "6372e040f52e37ef85fe2c5e",
    name: "Pizza quatro queijos",
    description: "Pizza de quatro queijos com borda tradicional",
    imagePath: "c2738036-5f74-4c11-b278-3a13b9ce2319-Captura de Tela 2022-10-04 aÌs 09.45.45.png",
    price: 40,
    ingredients: [
      {
        name: "Mussarela",
        icon: "🧀",
        _id: "6372e040f52e37ef85fe2c5f",
      },
      {
        name: "Parmesão",
        icon: "🧀",
        _id: "6372e040f52e37ef85fe2c60",
      },
      {
        name: "Gouda",
        icon: "🧀",
        _id: "6372e040f52e37ef85fe2c61",
      },
      {
        name: "Brie",
        icon: "🧀",
        _id: "6372e040f52e37ef85fe2c62",
      },
      {
        name: "Brie",
        icon: "🧀",
        _id: "6372e040f52e37ef585fe2c62",
      },
      {
        name: "Brie",
        icon: "🧀",
        _id: "6372e040f52e37ef845fe2c62",
      },
      {
        name: "Brie",
        icon: "🧀",
        _id: "6372e040f52e37ef852fe2c62",
      },
      {
        name: "Brie",
        icon: "🧀",
        _id: "6372e040f52e373ef85fe2c62",
      },
      {
        name: "Ultimo",
        icon: "🧀",
        _id: "6372e0410f52e37ef85fe2c62",
      },
    ],
  },
  {
    _id: "6372e276a381106c0f854cb3",
    name: "Coca cola",
    description: "Coca cola lata",
    imagePath: "b27ee1d7-30f8-409e-83d0-a7f81d0e3a2b-Captura de Tela 2022-10-28 aÌs 15.50.23.png",
    price: 7,
    ingredients: [],
  },
  {
    _id: "6372e276a3811063c0f854cb4",
    name: "Coca cola Zero",
    description: "Coca cola lata",
    imagePath: "1668608507294-coca-cola.png",
    price: 7,
    ingredients: [],
  },
  {
    _id: "6372e276a3811026c0f854cb5",
    name: "Lasanha",
    description: "Lasanha de carne",
    imagePath: "1668608507294-coca-cola.png",
    price: 7,
    ingredients: [
      {
        name: "Mussarela",
        icon: "🧀",
        _id: "6372e040f52e37ef85fe2c5f",
      },
      {
        name: "Parmesão",
        icon: "🧀",
        _id: "6372e040f52e37ef85fe2c60",
      },
    ],
  },
  {
    _id: "6372e276a3811026c0f854cb6",
    name: "Fanta",
    description: "Fanta laranja",
    imagePath: "1668608507294-coca-cola.png",
    price: 7,
    ingredients: [
      {
        name: "Mussarela",
        icon: "🧀",
        _id: "6372e040f52e37ef85fe2c5f",
      },
      {
        name: "Parmesão",
        icon: "🧀",
        _id: "6372e040f52e37ef85fe2c60",
      },
    ],
  },
  {
    _id: "6372e276a3811026c0f854cb7",
    name: "Guaraná",
    description: "Guaraná antartica",
    imagePath: "1668608507294-coca-cola.png",
    price: 7,
    ingredients: [
      {
        name: "Mussarela",
        icon: "🧀",
        _id: "6372e040f52e37ef85fe2c5f",
      },
      {
        name: "Parmesão",
        icon: "🧀",
        _id: "6372e040f52e37ef85fe2c60",
      },
    ],
  },
  
];


export function Products({ tableSelected, setTableModalVisible, cart, handleSetCart }: ProductsInterface) {
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [productDetailed, setProductDetailed] = useState<ProductDetailsInterface | null>(null);

  function showDescriptionModalProduct(productId: ProductDetailsInterface){
    setProductDetailed(productId);
    setDescriptionModalVisible(true);
  }
  function closeDescriptionModalProduct(){
    setDescriptionModalVisible(false);
  }

  function handleAddProductCart(product:ProductInterface){
    const {_id, name, imagePath, price} = product;
    if(cart && cart.length > 0){
      const productAdded = cart.find(product => product._id === _id);
      if(productAdded){
        productAdded.quantity++;
      }else{
        cart.push({_id, name, imagePath, price, quantity:1});
      }
    }else{
      cart.push({_id, name, imagePath, price, quantity:1});
    }

    handleSetCart([...cart]);
  }



  return (
    <View className="mb-2 w-full flex-1">
      <Modal
        animationType="fade"
        transparent={false}
        visible={descriptionModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >  
        <View className="flex-1 items-center justify-center w-full bg-black/90">
          <ProductDetails
            product={productDetailed}
            onClose={closeDescriptionModalProduct}
            addProductCart={handleAddProductCart}
            tableSelected={tableSelected}/>
        </View>
      </Modal>
      <FlatList
        showsVerticalScrollIndicator={false}
        className="mt-8 mb-4 w-full"
        ItemSeparatorComponent={Separator}
        data={products}
        keyExtractor={(product) => product._id}
        renderItem={({item : product})=>{
          return (
            <TouchableOpacity
              onPress={() => {showDescriptionModalProduct(product);}}
            >
              <View className={"flex-1 flex-row items-center rounded-m"}>
                <Image
                  className="w-28 h-24 rounded-md"
                  source={{                    
                    uri: `http://192.168.0.9:3001/uploads/${product.imagePath}`,
                  }}
                />
                <View className={"h-full ml-4 flex-1 flex-col justify-between"}>
                  <Text className="font-bold text-xl text-gray-800">{product.name}</Text>
                  <Text className=" text-gray-800">{product.description}</Text>
                  <View className={"flex-row justify-between items-end"}>
                    <Text className="font-bold text-primary">{formatCurrency(product.price)}</Text>
                    <TouchableOpacity
                      className={"-top-2 text-red"}
                      onPress={()=>{
                        tableSelected === "" ? setTableModalVisible() : handleAddProductCart(product);
                      }}
                      disabled={tableSelected === ""}
                    >
                      <AntDesign name="pluscircleo" size={36} color={tableSelected === "" ? colors.gray[300] : "#D73035"}  />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}