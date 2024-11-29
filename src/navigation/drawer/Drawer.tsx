import {StyleSheet} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import ProductListScreen from '../../screens/Product/ProductListScreen';
import CategoriesListScreen from '../../screens/Categories/CategoriesListScreen';

// Drawer Navigator objesini oluşturuyoruz
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="ProductList">
        <Drawer.Screen 
          name="ProductList" 
          component={ProductListScreen} 
          options={{ title: 'Products' }} 
        />
        <Drawer.Screen 
          name="CategoryList" 
          component={CategoriesListScreen} 
          options={{ title: 'Categories' }} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MyDrawer;

const styles = StyleSheet.create({});
