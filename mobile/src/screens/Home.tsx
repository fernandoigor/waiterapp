import React, { useEffect, useState } from "react";
import { View, Text, TextInput, SafeAreaView, Platform, Modal } from "react-native";

import { Feather } from "@expo/vector-icons";

import colors from "tailwindcss/colors";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Categories } from "../components/Categories";
import { Products } from "../components/Products";
import { ModalTable } from "../components/ModalTable";

import { Cart, ProductCartInterface } from "../components/Cart";



export function Home() {
  const isAndroid = Platform.OS === "android";

  const [selectedTable, setSelectedTable] = useState("");
  const [cartList, setCartList] = useState<null | ProductCartInterface[]>([]);

  const [tableModalVisible, setTableModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [timeConfirm, setTimeConfirm] = useState(10);
  const [intervalId, setIntervalId] = useState<any>(0);

  


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


  function confirmOrder(){
    setConfirmModalVisible(true);
    setIntervalId(setInterval(()=>{setTimeConfirm(prevCount => prevCount - 1);}, 1000));
  }

  function clearModalConfirm(){
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

    <SafeAreaView className="flex-1 flex-col bg-secondary mx-6">
      {
        isAndroid && (<View className="mt-8"></View>)
      }

      <Header 
        tableSelected={selectedTable} 
        cancelOrder={cancelOrder}
      />
      <Categories />
      <Products 
        tableSelected={selectedTable}
        setTableModalVisible={()=>setTableModalVisible(true)}
        cart={cartList}
        handleSetCart={(el) => handleSetCart(el)}
      />
      {
        selectedTable === "" &&
        <Button
          className="w-full"
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

      {
        isAndroid && (<View className="mb-4"></View>)
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
    </SafeAreaView>
  );
}