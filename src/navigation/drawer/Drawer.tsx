import {StyleSheet} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import ProductListScreen from '../../screens/Product/ProductListScreen';
import CategoriesListScreen from '../../screens/Categories/CategoriesListScreen';
import Live from '../../screens/Live/Live';

// Drawer Navigator objesini oluşturuyoruz
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="ProductList">
        <Drawer.Screen
            name="Live"
            component={Live}
            options={{ title: 'Live' }}
        />
        <Drawer.Screen 
          name="ProductList" 
          component={ProductListScreen} 
          options={{ title: 'Ürün Sayfası' }} 
        />
        <Drawer.Screen 
          name="CategoryList" 
          component={CategoriesListScreen} 
          options={{ title: 'Kategori' }} 
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MyDrawer;

const styles = StyleSheet.create({});
