import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';


export default function HamburgerIcon({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
        <Feather
            name="menu"
            size={24}
            color="white"
        />
    </TouchableOpacity>
  )
}