import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Modal, Alert } from "react-native";

import Separator from "../components/Separator";

import { AntDesign } from "@expo/vector-icons";

import colors from "tailwindcss/colors";

import { formatCurrency } from "../utils/formatCurrency";
import { ProductDetails, ProductDetailsInterface } from "../components/ProductDetails";
import { ProductCartInterface } from "./Cart";
import { ProductInterface } from "../types/ProductInterface";


interface ProductsInterface {
  tableSelected: string;
  setTableModalVisible: () => void;
  cart: ProductCartInterface[] | null;
  handleSetCart: (el:ProductCartInterface[]) => void;
  products: ProductInterface[];
}



export function Products({ tableSelected, setTableModalVisible, cart, handleSetCart, products }: ProductsInterface) {
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
  function productInfo2(product: ProductInterface){
    return (
      <>
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
                  className={"-top-2 text-red mr-8 "}
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
      </>
    );
  }

  function productInfo(product: ProductInterface){
    return (
      <View className="">
        <TouchableOpacity
          onPress={() => {showDescriptionModalProduct(product);}}
        >
          <View className={"flex-row items-center"}>
            <Image
              className="w-28 h-24 rounded-md"
              source={{                    
                uri: `http://192.168.0.9:3001/uploads/${product.imagePath}`,
              }}
            />
            <View className="h-24 ml-4 mr-8 flex-1 flex-col justify-between">
              <Text className="font-bold text-xl text-gray-800 max-h-11 truncate">{product.name}</Text>
              <Text className=" text-gray-800 max-h-12 truncate">{product.description}</Text>
              <View className={"flex-row justify-between items-end"}>
                <Text className="font-bold text-primary">{formatCurrency(product.price)}</Text>
                <TouchableOpacity
                  className={"-top-2"}
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
      </View>
    );
  }


  return (
    <View className="mx-4 mb-0 w-full flex-1 justify-center">
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
      {
        !products.length ?
          <Image
            className="self-center mr-8"
            source={require("../assets/empty-state.png")}
          />:
          <FlatList
            showsVerticalScrollIndicator={false}
            className="mt-2 mb-1 w-full"
            ItemSeparatorComponent={Separator}
            data={products}
            keyExtractor={(product) => product._id}
            renderItem={({item : product})=>{
              return (productInfo(product));
            }}
          />
      }
    </View>
  );
}