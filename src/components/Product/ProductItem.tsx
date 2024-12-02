import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

type ProductItemProps = {
  name: string;
  price: number;
  currency: string;
  stockAmount: number;
  imageUrl: string | null;
};

const ProductItem: React.FC<ProductItemProps> = ({
  name,
  price,
  currency,
  stockAmount,
  imageUrl,
}) => {
  return (
    <TouchableOpacity onPress={() => {}} style={styles.productItem}>
      <Image
        source={{
          uri: imageUrl || 'https://via.placeholder.com/150',
        }}
        style={styles.productImage}
      />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.productPrice}>
          {price} {currency}
        </Text>
        <Text style={styles.productStock}>
          Stock: {stockAmount > 0 ? stockAmount : 'Out of stock'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  productItem: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  productStock: {
    fontSize: 12,
    color: 'green',
    marginTop: 5,
  },
});
