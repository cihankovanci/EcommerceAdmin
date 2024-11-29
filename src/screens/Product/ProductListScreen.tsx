import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useProductList} from '../../api/Product/ProductList';

const ProductListScreen = () => {
  const {ProductList} = useProductList();
  console.log('ProductList', ProductList);
  return (
    <View>
      <Text>ProductListScreen</Text>
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({});
