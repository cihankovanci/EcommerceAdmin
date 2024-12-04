import {Button, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import ProductListScreen from '../../screens/Product/ProductListScreen';
import CategoriesListScreen from '../../screens/Categories/CategoriesListScreen';
import Live from '../../screens/Live/Live';
import PlusIcon from '../../assets/Icons/PlusIcon';
import ProductStack from '../stack/ProductStack';
import CategoryStack from '../stack/CategoryStack';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="CategoryList">
        <Drawer.Screen name="Live" component={Live} options={{title: 'Live'}} />
        <Drawer.Screen
          name="ProductList"
          component={ProductStack}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="CategoryList"
          component={CategoryStack}
          options={{headerShown: false}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MyDrawer;

const styles = StyleSheet.create({});
