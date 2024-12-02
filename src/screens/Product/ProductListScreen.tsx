import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Text,

  TouchableOpacity,
} from 'react-native';
import { useProductList } from '../../api/Product/ProductList';
import ProductItem from '../../components/Product/ProductItem';
import * as productTypes from '../../types/Product/Product.types';
import { useNavigation } from '@react-navigation/native';
import PlusIcon from '../../assets/Icons/PlusIcon';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Button from '../../components/shareds/Button';



type RootDrawerParamList = {
  Live: undefined;
  ProductList: undefined;
  CategoryList: undefined;
};
const ProductListScreen = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();

  const HeaderRightButton = () => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={() => navigation.navigate('AddProductScreen' as never)}>
        <PlusIcon size={24} color="#2b71fa" style={{ marginRight: 10 }} />
      </TouchableOpacity>
    );
  };

  const HeaderLeftButton = () => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <PlusIcon size={24} color="#2b71fa" style={{ marginRight: 10 }} />
      </TouchableOpacity>
    );
  };


  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRightButton />,
      headerLeft: () => <HeaderLeftButton />
    });
  }, [navigation]);
  const { ProductList, isLoading, error, isFetching } = useProductList();




  if (isLoading || isFetching) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loaderText}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          An error occurred while fetching products:
        </Text>
        <Text style={styles.errorMessage}>{error.message}</Text>
      </View>
    );
  }

  if (!ProductList || ProductList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No products available.</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: productTypes.Product }) => (
    <ProductItem
      name={item.name}
      price={item.price1}
      currency={item.currency?.abbr || ''}
      stockAmount={item.stockAmount}
      imageUrl={
        item.images?.[0]?.thumbUrl ? `https:${item.images[0].thumbUrl}` : null
      }
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={ProductList}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <Button onPress={()=>{}} title='title'/>
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    padding: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff0000',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#333',
  },
});
