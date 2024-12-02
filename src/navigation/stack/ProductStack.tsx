
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductListScreen from '../../screens/Product/ProductListScreen';
import AddProductScreen from '../../screens/Product/AddProductScreen';

const Stack = createNativeStackNavigator();


const ProductStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductListScreen"
        component={ProductListScreen}
           options={{ headerShown: true }}
      />
      <Stack.Screen
        name="AddProductScreen"
        component={AddProductScreen}
          options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default ProductStack;


