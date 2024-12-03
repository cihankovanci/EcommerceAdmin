import React, { useState } from 'react';
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
import SwipeToDelete from '../../components/shareds/SwipeToDelete';
import PlusIcon from '../../assets/Icons/PlusIcon';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import * as productTypes from '../../types/Product/Product.types';
import { useProductDelete } from '../../api/Product/ProductDelete';

export type RootDrawerParamList = {
  Live: undefined;
  ProductList: undefined;
  CategoryList: undefined;
};

const ProductListScreen = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const { ProductList, isLoading, error, isFetching } = useProductList();
  const { productDelete } = useProductDelete()
  const [localProductList, setLocalProductList] = useState<productTypes.Product[]>(
    ProductList || []
  );

  const HeaderRightButton = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate('AddProductScreen' as never)}
    >
      <PlusIcon size={24} color="#2b71fa" style={{ marginRight: 10 }} />
    </TouchableOpacity>
  );

  const HeaderLeftButton = () => (
    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      <PlusIcon size={24} color="#2b71fa" style={{ marginRight: 10 }} />
    </TouchableOpacity>
  );

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRightButton />,
      headerLeft: () => <HeaderLeftButton />,
    });
  }, [navigation]);

  React.useEffect(() => {
    if (ProductList) {
      setLocalProductList(ProductList);
    }
  }, [ProductList]);

  const handleDelete = (key: string) => {
    console.log('Deleting product with ID:', key);
    setLocalProductList(prev => prev.filter(item => item.id.toString() !== key));
    deleteFromDatabase(Number(key))
 
  };


  const deleteFromDatabase = (id: number) => {
    productDelete.mutateAsync({ id: id }).then((res) => {
      console.log('res', res);
    }).catch(err => {
      console.log('err:', err);
    });
  }

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

  if (!localProductList || localProductList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No products available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SwipeToDelete
        data={localProductList.map(item => ({
          ...item,
          key: item.id.toString(),
        }))}
        renderItem={({ item }: { item: productTypes.Product }) => (
          <ProductItem
            name={item.name}
            price={item.price1}
            currency={item.currency?.abbr || ''}
            stockAmount={item.stockAmount}
            imageUrl={
              item.images?.[0]?.thumbUrl
                ? `https:${item.images[0].thumbUrl}`
                : null
            }
          />
        )}
        onDelete={handleDelete}
      />
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
