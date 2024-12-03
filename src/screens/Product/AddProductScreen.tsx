import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import CustomTextInput from '../../components/Product/CustomTextInput';
import FullScreenDropDown from '../../components/shareds/FullScreenDropdown';
import { useProductPost } from '../../api/Product/ProductPost';
import Button from '../../components/shareds/Button';
import { useNavigation } from '@react-navigation/native';
import { useProductList } from '../../api/Product/ProductList';

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
  hasGift: number;
  status: number;
  hasOption: number;
  categoryShowcaseStatus: number;
}

const CurrenyData = [
  { label: 'USD', value: 1 },
  { label: 'EURO', value: 2 },
  { label: 'TL', value: 3 },
];

const DiscountTypeData = [
  { label: 'Fiyat üstünden indirim', value: 0 },
  { label: 'Yüzdelik Indirim', value: 1 }
]

const TaxIncludedData = [
  { label: 'KDV Hariç', value: 0 },
  { label: 'KDV Dahil', value: 1 }
]


const stockTypeLabel = [
  { label: 'Piece', value: 'Piece' },
  { label: 'cm', value: 'cm' },
  { label: 'Dozen', value: 'Dozen' },
  { label: 'gram', value: 'gram' },
  { label: 'kg', value: 'kg' },
  { label: 'Person', value: 'Person' },
  { label: 'Package', value: 'Package' },
  { label: 'metre', value: 'metre' },
  { label: 'm2', value: 'm2' },
  { label: 'pair', value: 'pair' },
]

const customShippingDisabledData = [
  { label: 'Sistem seçeneği seçili değil', value: 0 },
  { label: 'Sistem seçeneği seçili', value: 1 }
]

const hasGiftData = [
  { label: 'Hediye Değil', value: 0 },
  { label: 'Hediyeli', value: 1 }
]

const statusData = [
  { label: 'Pasif', value: 0 },
  { label: 'Aktif', value: 1 }
]

const hasOptionData = [
  { label: 'Varyantı yok', value: 0 },
  { label: 'Varyantı var', value: 1 }
]

const categoryShowcaseStatusData = [
  { label: 'Gösterme', value: 0 },
  { label: 'Göster', value: 1 }
]
const AddProductScreen = () => {
  const navigation = useNavigation()
  const [form, setForm] = useState<Params>({
    name: '',
    sku: '',
    stockAmount: 0,
    price1: 0,
    currency: {
      id: 0,
      property1: ["product",
        "subscription_product",
        "tabbed_midblock_product",
        "draft_order"],
      property2: ["product",
        "subscription_product",
        "tabbed_midblock_product",
        "draft_order"],
    },
    discountType: 0, // discountType 1 olursa %5, 0 olursa 5 tl anlamına gelir.
    taxIncluded: 0,
    stockTypeLabel: '',
    customShippingDisabled: 0,
    hasGift: 0,
    status: 0,
    hasOption: 0,
    categoryShowcaseStatus: 0,
  });

  const { productPost } = useProductPost()
  const { refetch } = useProductList()

  const handleChange = (field: keyof Params, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const handleForm = () => {
    productPost.mutateAsync(form).then((res) => {
      console.log('res', res)
      refetch()
      navigation.goBack()
    }).catch((err) => {
      console.log('err', err)
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1, marginBottom: 50 }}
      >
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
          <Text style={styles.title}>Currency<Text style={styles.info}> Ürünün dövizini seçiniz</Text></Text>
          <FullScreenDropDown
            data={CurrenyData}
            onSelect={item => handleChange('currency', { ...form.currency, id: item.value })}
            placeholer="Ürünün döviz cinsi"
            value={CurrenyData.find(item => item.value === form.currency.id)}>
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownText}>
                {CurrenyData.find(item => item.value === form.currency.id)?.label || 'Select Currency'}
              </Text>
            </View>
          </FullScreenDropDown>

          <Text style={styles.title}>Discount Type<Text style={styles.info}> Ürünün indirim tipini seçiniz</Text></Text>
          <FullScreenDropDown
            data={DiscountTypeData}
            onSelect={(item) => handleChange('discountType', item.value)}
            placeholer="Indirim Tipini Seç"
            value={DiscountTypeData.find((item) => item.value === form.discountType)}
          >
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownText}>
                {DiscountTypeData.find((item) => item.value === form.discountType)?.label || 'Select Discount Type'}
              </Text>
            </View>
          </FullScreenDropDown>

          <Text style={styles.title}>taxIncluded<Text style={styles.info}> Ürün fiyatlarına KDV dahil olup olmadığın belirten değer.</Text></Text>
          <FullScreenDropDown
            data={TaxIncludedData}
            onSelect={(item) => handleChange('taxIncluded', item.value)}
            placeholer="Vergi Tipini Seç"
            value={TaxIncludedData.find((item) => item.value === form.discountType)}
          >
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownText}>
                {TaxIncludedData.find((item) => item.value === form.discountType)?.label || 'Vergi Tipini Seç'}
              </Text>
            </View>
          </FullScreenDropDown>

          <Text style={styles.title}>Stock Type Label<Text style={styles.info}> Ürünün stok tipini seçiniz</Text></Text>
          <FullScreenDropDown
            data={stockTypeLabel}
            onSelect={(item) => handleChange('stockTypeLabel', item.value)}
            placeholer="Stok Tipini Seç"
            value={stockTypeLabel.find((item) => item.value === form.stockTypeLabel)}
          >
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownText}>
                {stockTypeLabel.find((item) => item.value === form.stockTypeLabel)?.label || 'Select Stock Type'}
              </Text>
            </View>
          </FullScreenDropDown>

          <Text style={styles.title}>Custom Shipping Disabled<Text style={styles.info}> Kargo seçeneğini belirtiniz</Text></Text>
          <FullScreenDropDown
            data={customShippingDisabledData}
            onSelect={(item) => handleChange('customShippingDisabled', item.value)}
            placeholder="Kargo Seçeneği"
            value={customShippingDisabledData.find((item) => item.value === form.customShippingDisabled)}
          >
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownText}>
                {customShippingDisabledData.find((item) => item.value === form.customShippingDisabled)?.label || 'Select Shipping Option'}
              </Text>
            </View>
          </FullScreenDropDown>

          <Text style={styles.title}>Has Gift<Text style={styles.info}> Ürünün hediyeli olup olmadığını belirtir</Text></Text>
          <FullScreenDropDown
            data={hasGiftData}
            onSelect={(item) => handleChange('hasGift', item.value)}
            placeholder="Hediye Durumunu Seç"
            value={hasGiftData.find((item) => item.value === form.hasGift)}
          >
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownText}>
                {hasGiftData.find((item) => item.value === form.hasGift)?.label || 'Select Gift Option'}
              </Text>
            </View>
          </FullScreenDropDown>

          <Text style={styles.title}>Status<Text style={styles.info}> Ürün nesnesinin aktiflik durumu</Text></Text>
          <FullScreenDropDown
            data={statusData}
            onSelect={(item) => handleChange('status', item.value)}
            placeholder="Durum Seç"
            value={statusData.find((item) => item.value === form.status)}
          >
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownText}>
                {statusData.find((item) => item.value === form.status)?.label || 'Select Status'}
              </Text>
            </View>
          </FullScreenDropDown>

          <Text style={styles.title}>Has Option<Text style={styles.info}> Ürünün varyant bilgisi</Text></Text>
          <FullScreenDropDown
            data={hasOptionData}
            onSelect={(item) => handleChange('hasOption', item.value)}
            placeholder="Varyant Durumunu Seç"
            value={hasOptionData.find((item) => item.value === form.hasOption)}
          >
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownText}>
                {hasOptionData.find((item) => item.value === form.hasOption)?.label || 'Select Option Status'}
              </Text>
            </View>
          </FullScreenDropDown>

          <Text style={styles.title}>Category Showcase Status<Text style={styles.info}> Ürünün kategori vitrin durumunu seçiniz</Text></Text>
          <FullScreenDropDown
            data={categoryShowcaseStatusData}
            onSelect={(item) => handleChange('categoryShowcaseStatus', item.value)}
            placeholder="Kategori Vitrin Durumu Seç"
            value={categoryShowcaseStatusData.find((item) => item.value === form.categoryShowcaseStatus)}
          >
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownText}>
                {categoryShowcaseStatusData.find((item) => item.value === form.categoryShowcaseStatus)?.label || 'Select Showcase Status'}
              </Text>
            </View>
          </FullScreenDropDown>

        </ScrollView>
        <Button title='Ekle' onPress={handleForm} />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 50
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dropdownContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  info: {
    fontWeight: '400',
    color: '#212121',

  }
});

export default AddProductScreen;
