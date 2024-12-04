import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Button from '../../components/shareds/Button';
import CustomTextInput from '../../components/Product/CustomTextInput';
import FullScreenDropDown from '../../components/shareds/FullScreenDropdown';
import {useCategoryPost} from '../../api/Category/CategoryPost';
import {useCategoryList} from '../../api/Category/CategoryList';
import {useNavigation} from '@react-navigation/native';

interface AddCategoryScreenProps {
  name: string;
  sortOrder: number;
  status: number;
  displayShowcaseContent: number;
  showcaseContentDisplayType: number;
  displayShowcaseFooterContent: number;
  showcaseFooterContentDisplayType: number;
  hasChildren: number;
  isCombine: number;
}

const statusData = [
  {label: 'Pasif', value: 0},
  {label: 'Aktif', value: 1},
];
const displayShowcaseContentData = [
  {label: 'Kapalı', value: 0},
  {label: 'Masaüstü', value: 1},
  {label: 'Mobil ve Masaüstü', value: 2},
];
const showcaseContentDisplayTypeData = [
  {label: 'Kategori içeriği', value: 0},
  {label: 'Kategori ve üst kategori içeriği', value: 1},
  {label: 'Kategori ve tüm üst kategoriler', value: 2},
];

const displayShowcaseFooterContentData = [
  {label: 'Kapalı', value: 0},
  {label: 'Masaüstü', value: 1},
  {label: 'Mobil ve Masaüstü', value: 2},
];
const showcaseFooterContentDisplayTypeData = [
  {label: 'Kategori içeriği', value: 0},
  {label: 'Kategori ve alt kategori içeriği', value: 1},
  {label: 'Kategori ve tüm alt kategoriler', value: 2},
];
const hasChildrenData = [
  {label: 'Var', value: 0},
  {label: 'Yok', value: 1},
];
const isCombineData = [
  {label: 'Kombin Kategori', value: 0},
  {label: 'Kombin Kategori Değil', value: 1},
];
const AddCategoryScreen = () => {
  const [form, setForm] = useState<AddCategoryScreenProps>({
    name: '',
    sortOrder: 0,
    status: 0,
    displayShowcaseContent: 0,
    showcaseContentDisplayType: 1,
    displayShowcaseFooterContent: 0,
    showcaseFooterContentDisplayType: 1,
    hasChildren: 0,
    isCombine: 0,
  });
  const navigation = useNavigation();
  const {categoryPost} = useCategoryPost();
  const {refetch} = useCategoryList();

  const handleChange = (
    field: keyof AddCategoryScreenProps,
    value: string | number,
  ) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (form.sortOrder < 0 || form.sortOrder > 999) {
      Alert.alert(
        'Geçersiz Değer',
        'SortOrder 0 ile 999 arasında bir değer olmalıdır.',
        [{text: 'Tamam'}],
      );
      return;
    } else if (form.name.length === 0) {
      Alert.alert('Geçersiz Değer', 'name girişi yapınız.', [{text: 'Tamam'}]);
      return;
    } else {
      categoryPost
        .mutateAsync(form)
        .then(res => {
          console.log('res', res);
          refetch();
          navigation.goBack();
        })
        .catch(err => {
          console.log('err:', err);
        });
    }

    console.log('form', form);
  };

  return (
    <View style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1, marginBottom: 50}}>
        <ScrollView contentContainerStyle={styles.container}>
          <CustomTextInput
            info="Kategori nesnesi kimlik değeri. "
            title="Name"
            value={form.name}
            onChangeText={text => handleChange('name', text)}
          />

          <CustomTextInput
            info="Kategori nesnesi için sıralama değeri."
            title="sortOrder"
            value={form.sortOrder.toString()}
            keyboardType="numeric"
            onChangeText={text => handleChange('sortOrder', Number(text))}
          />

          <Text style={styles.title}>
            status
            <Text style={styles.info}>
              {' '}
              Kategori nesnesinin aktiflik durumunu belirten değer.
            </Text>
          </Text>
          <FullScreenDropDown
            data={statusData}
            onSelect={item => handleChange('status', item.value)}
            placeholer="Kategori Nesnesi Aktiflik Durumunu Seçiniz"
            value={statusData.find(item => item.value === form.status)}>
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownText}>
                {statusData.find(item => item.value === form.status)?.label ||
                  'Select Discount Type'}
              </Text>
            </View>
          </FullScreenDropDown>

          <Text style={styles.title}>
            Display Showcase Content
            <Text style={styles.info}>
              {' '}
              Kategori nesnesinin üst içerik metninin gösterim durumu.
            </Text>
          </Text>
          <FullScreenDropDown
            data={displayShowcaseContentData}
            onSelect={item =>
              handleChange('displayShowcaseContent', item.value)
            }
            placeholder=""
            value={displayShowcaseContentData.find(
              item => item.value === form.displayShowcaseContent,
            )}>
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownText}>
                {displayShowcaseContentData.find(
                  item => item.value === form.displayShowcaseContent,
                )?.label || 'Vitrin İçeriği Seçiniz'}
              </Text>
            </View>
          </FullScreenDropDown>

          <Text style={styles.title}>
            Showcase Content Display Type
            <Text style={styles.info}>
              {' '}
              Kategori nesnesinin üst içerik metninin gösterim tipi.
            </Text>
          </Text>
          <FullScreenDropDown
            data={showcaseContentDisplayTypeData}
            onSelect={item =>
              handleChange('showcaseContentDisplayType', item.value)
            }
            placeholder=""
            value={showcaseContentDisplayTypeData.find(
              item => item.value === form.showcaseContentDisplayType,
            )}>
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownText}>
                {showcaseContentDisplayTypeData.find(
                  item => item.value === form.showcaseContentDisplayType,
                )?.label || 'Görüntüleme Tipini Seçiniz'}
              </Text>
            </View>
          </FullScreenDropDown>

          <Text style={styles.title}>
            Display Showcase Footer Content
            <Text style={styles.info}>
              {' '}
              Kategori Alt İçerik nesnesinin üst içerik metninin gösterim
              durumu.
            </Text>
          </Text>
          <FullScreenDropDown
            data={displayShowcaseFooterContentData}
            onSelect={item =>
              handleChange('displayShowcaseFooterContent', item.value)
            }
            placeholder=""
            value={displayShowcaseFooterContentData.find(
              item => item.value === form.displayShowcaseFooterContent,
            )}>
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownText}>
                {displayShowcaseFooterContentData.find(
                  item => item.value === form.displayShowcaseFooterContent,
                )?.label || 'Vitrin Alt İçeriği Seçiniz'}
              </Text>
            </View>
          </FullScreenDropDown>

          <Text style={styles.title}>
            Showcase Footer Content Display Type
            <Text style={styles.info}>
              {' '}
              Kategori vitrin alt içeriği görüntüleme tipini seçiniz.
            </Text>
          </Text>
          <FullScreenDropDown
            data={showcaseFooterContentDisplayTypeData}
            onSelect={item =>
              handleChange('showcaseFooterContentDisplayType', item.value)
            }
            placeholder=""
            value={showcaseFooterContentDisplayTypeData.find(
              item => item.value === form.showcaseFooterContentDisplayType,
            )}>
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownText}>
                {showcaseFooterContentDisplayTypeData.find(
                  item => item.value === form.showcaseFooterContentDisplayType,
                )?.label || 'Alt İçerik Görüntüleme Tipini Seçiniz'}
              </Text>
            </View>
          </FullScreenDropDown>

          <Text style={styles.title}>
            Has Children
            <Text style={styles.info}>
              {' '}
              Kategori nesnesi alt kategori sahiplik durumu.
            </Text>
          </Text>
          <FullScreenDropDown
            data={hasChildrenData}
            onSelect={item => handleChange('hasChildren', item.value)}
            placeholder=""
            value={hasChildrenData.find(
              item => item.value === form.hasChildren,
            )}>
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownText}>
                {hasChildrenData.find(item => item.value === form.hasChildren)
                  ?.label || 'Alt Kategori Durumunu Seçiniz'}
              </Text>
            </View>
          </FullScreenDropDown>

          <Text style={styles.title}>
            Is Combine
            <Text style={styles.info}>
              {' '}
              Kategori nesnesi kombin kategori durumu.Bu kategori kombin
              kategorisi olarak işaretlendiğinde kategori altındaki ürünler
              kombin detay sayfasına yönlendirilecektir.
            </Text>
          </Text>
          <FullScreenDropDown
            data={isCombineData}
            onSelect={item => handleChange('isCombine', item.value)}
            placeholder="Kombin Kategori Durumunu Seçiniz"
            value={isCombineData.find(item => item.value === form.isCombine)}>
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownText}>
                {isCombineData.find(item => item.value === form.isCombine)
                  ?.label || 'Kombin Kategori Durumunu Seçiniz'}
              </Text>
            </View>
          </FullScreenDropDown>
        </ScrollView>
        <Button title="Ekle" onPress={handleSubmit} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddCategoryScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 50,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  info: {
    fontWeight: '400',
    color: '#212121',
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
});
