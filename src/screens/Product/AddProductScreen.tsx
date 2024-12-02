import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import CustomTextInput from '../../components/Product/CustomTextInput'; // CustomTextInput'ın doğru yolunu ekleyin

interface Params {
  name: string;
  sku: string;
  stockAmount: number;
  price1: number;
  currency: {
    id: number;
    property1: string[];
    property2: string[];
  };
  discountType: number;
  taxIncluded: number;
  stockTypeLabel: string;
  customShippingDisabled: number;
  status: number;
  hasOption: number;
  categoryShowcaseStatus: number;
}

const AddProductScreen = () => {
  const [form, setForm] = useState<Params>({
    name: '',
    sku: '',
    stockAmount: 0,
    price1: 0,
    currency: {
      id: 0,
      property1: [],
      property2: [],
    },
    discountType: 0,
    taxIncluded: 0,
    stockTypeLabel: '',
    customShippingDisabled: 0,
    status: 0,
    hasOption: 0,
    categoryShowcaseStatus: 0,
  });

  const handleChange = (field: keyof Params, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add Product</Text>

      <CustomTextInput
        info='Ürün nesnesi kimlik değeri. '
        title="Name"
        value={form.name}
        onChangeText={(text) => handleChange('name', text)}
      />
      <CustomTextInput
        info={'Ürünün stok kodu. ID değeri gibi eşsiz bir kimlik değeridir.'}
        title="SKU"
        value={form.sku}
        onChangeText={(text) => handleChange('sku', text)}
      />
      <CustomTextInput
        info='ürünün stok miktarı'
        title="Stock Amount"
        value={form.stockAmount}
        onChangeText={(text) => handleChange('stockAmount', parseInt(text) || 0)}
        keyboardType="numeric"
      />
      <CustomTextInput
        info='Ürünün Fiyat 1 bilgisi.'
        title="Price"
        value={form.price1}
        onChangeText={(text) => handleChange('price1', parseFloat(text) || 0)}
        keyboardType="numeric"
      />
      {/* <CustomTextInput
        title="Stock Type Label"
        value={form.stockTypeLabel}
        onChangeText={(text) => handleChange('stockTypeLabel', text)}
      /> */}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default AddProductScreen;
