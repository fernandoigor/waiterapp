import React from "react";
import { TouchableOpacity, TouchableOpacityProps, Text, TextProps } from "react-native";
import { styled, UseTailwindOptions } from "nativewind";

interface buttonStyledProps extends TouchableOpacityProps {
  value: string;
  textProps?: UseTailwindOptions<TextProps>;
}

export function ButtonStyled({ value, textProps,...rest} : buttonStyledProps) {
  return (
    <TouchableOpacity className='h-14 bg-primary rounded-md items-center justify-center' {...rest}>
      <Text className={`text-white font-bold text-lg ${textProps}`}>
        {value}
      </Text>
    </TouchableOpacity>
  );
}

const Button = styled(ButtonStyled);
export { Button };