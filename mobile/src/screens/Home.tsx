import React, { useEffect, useState } from "react";
import { View, Text, TextInput, SafeAreaView, Platform, Modal, ActivityIndicator } from "react-native";

import { Feather } from "@expo/vector-icons";

import colors from "tailwindcss/colors";

import api from "../utils/api";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Categories } from "../components/Categories";
import { Products } from "../components/Products";
import { ModalTable } from "../components/ModalTable";
import { Category } from "../types/Category";

import { Cart, ProductCartInterface } from "../components/Cart";



export function Home() {
  const isAndroid = Platform.OS === "android";

  const [selectedTable, setSelectedTable] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [cartList, setCartList] = useState<null | ProductCartInterface[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  const [tableModalVisible, setTableModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [timeConfirm, setTimeConfirm] = useState(10);
  const [intervalId, setIntervalId] = useState<any>(0);


  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      api.get("/categories"),
      api.get("/products"),
    ]).then(([categoriesResponse, productsResponse])=>{
      setCategories(categoriesResponse.data);
      setProducts(productsResponse.data);
      setIsLoading(false);
    });
  }, []);


  async function handleSelectCategory(categoryId: string){
    setIsLoadingProducts(true);
    const category = selectedCategory === categoryId ? "" : categoryId;
    const path = !category ? "/products" : `/categories/${categoryId}/products`;
    const productsResponse = await api.get(path);
    setSelectedCategory(category);
    setProducts(productsResponse.data);
    setIsLoadingProducts(false);
  }

  function handleCloseTableModal(){
    setTableModalVisible(false);
  }

  function handleSaveTableNumber(number : string){
    setSelectedTable(number);
    handleCloseTableModal();
  }

  function handleSetCart(cartList:ProductCartInterface[]){
    setCartList(cartList);
  }

  function cancelOrder(){
    setSelectedTable("");
    setCartList([]);
  }


  async function confirmOrder(){
    setConfirmModalVisible(true);

    api.post("/orders",{
      "table": `${selectedTable}`,
      "products": cartList?.map((product) => ({
        product: product._id,
        quantity: product.quantity
      }))
    }).then( ()=>{
      setIntervalId(setInterval(()=>{setTimeConfirm(prevCount => prevCount - 1);}, 1000));
    });
  }

  function clearModalConfirm(){
    // TODO
    setCartList([]);
    setSelectedTable("");
    setConfirmModalVisible(false);
    if(intervalId){
      clearInterval(intervalId);
      setIntervalId(0);
    }
    setTimeConfirm(10);
  }

  useEffect(() => {
    if(timeConfirm < 1 || !confirmModalVisible){
      clearModalConfirm();
    }
  }, [timeConfirm, confirmModalVisible]);




  return (

    // <SafeAreaView className="flex-1 flex-col bg-secondary mx-1">
    <View className={`flex-1 flex-col bg-secondary mx-1 ${isAndroid ? "mt-4" : "mt-16"}`}>
      {
        isAndroid && (<View className="mt-8"></View>)
      }

      <Header 
        tableSelected={selectedTable} 
        cancelOrder={cancelOrder}
      />
      <Categories 
        categories={categories}
        selectedCategory={selectedCategory}
        selectCategory={handleSelectCategory}/>
      {
        isLoadingProducts ?
          <ActivityIndicator  className="mb-2 w-full flex-1" size="large" color="#D73035" /> :
          <Products 
            tableSelected={selectedTable}
            setTableModalVisible={()=>setTableModalVisible(true)}
            cart={cartList}
            handleSetCart={(el) => handleSetCart(el)}
            products={products}
          />
      }
      {
        selectedTable === "" &&
        <Button
          className={`w-full mt-2 ${isAndroid ? "mb-2" : "mb-8"}`}
          value="Novo Pedido" 
          onPress={()=>setTableModalVisible(true)}
        />
      }

      {
        selectedTable !== "" &&
        <Cart 
          cart={cartList}
          handleSetCart={(el) => handleSetCart(el)}
          confirmOrder={confirmOrder}
        />
      }


      <Modal
        animationType="fade"
        transparent={false}
        visible={tableModalVisible}
        onRequestClose={() => {
          setTableModalVisible(false);
        }}
      >  
        <View className="flex-1 items-center justify-center w-full bg-black/90">
          <ModalTable
            onClose={() => handleCloseTableModal() }
            saveTableNumber={(number) => { handleSaveTableNumber(number); }}
          />
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={false}
        visible={confirmModalVisible}
        onRequestClose={() => {
          clearModalConfirm();
        }}
      >  
        <View className="flex-1 items-center justify-center w-full bg-primary/90">
          <Text className="text-secondary text-2xl font-bold my-2">Pedido confirmado</Text>
          <Text className="text-secondary text-md my-2">O pedido já entrou na fila de produção!</Text>
          <Button
            className="bg-white text-primary mt-8 py-2 px-4"
            textProps={"text-primary"}
            value="OK" 
            onPress={()=>setConfirmModalVisible(false)}
          />
          <Text className="text-secondary text-md font-bold my-2">{timeConfirm}s</Text>
        </View>
      </Modal>
      {
        isLoading &&
        <Modal
          transparent={true}
          visible={true}
        >  
          <View className="flex-1 items-center justify-center bg-white/90">
            <ActivityIndicator size="large" color="#D73035" /> 
          </View>
        </Modal>
      }
    </View>
  );
}