import React from "react";
import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { styled } from "nativewind";

interface buttonStyledProps extends TouchableOpacityProps {
  value: string;
}

export function ButtonStyled({ value,...rest} : buttonStyledProps) {
  return (
    <TouchableOpacity className='h-14 bg-primary rounded-md items-center justify-center' {...rest}>
      <Text className='text-white font-bold text-lg'>
        {value}
      </Text>
    </TouchableOpacity>
  );
}

const Button = styled(ButtonStyled);
export { Button };