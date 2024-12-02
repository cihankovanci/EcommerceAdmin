import {Button, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import ProductListScreen from '../../screens/Product/ProductListScreen';
import CategoriesListScreen from '../../screens/Categories/CategoriesListScreen';
import Live from '../../screens/Live/Live';
import PlusIcon from '../../assets/Icons/PlusIcon';
import ProductStack from '../stack/ProductStack';

const Drawer = createDrawerNavigator();

const HeaderRightButton = () => {
  return (
    <TouchableOpacity>
      <PlusIcon color={'#000000'} />
    </TouchableOpacity>
  )
}


const MyDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="ProductList">
        <Drawer.Screen name="Live" component={Live} options={{title: 'Live'}} />
        <Drawer.Screen
          name="ProductList"
          // component={ProductListScreen}
          component={ProductStack}
          options={{ headerShown: false }}

          // options={{
          //   title: 'Ürün Sayfası',
          //   // headerRight: () => <HeaderRightButton />,
            
          // }}
        />
        <Drawer.Screen
          name="CategoryList"
          component={CategoriesListScreen}
          options={{title: 'Kategori'}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MyDrawer;

const styles = StyleSheet.create({});
