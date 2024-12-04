import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CategoryStackParamList} from '../../navigation/stack/CategoryStack';
import {useCategoryGet} from '../../api/Category/CategoryGet';
import {useCategoryPut} from '../../api/Category/CategoryPut';
import Button from '../../components/shareds/Button';
import FullScreenDropDown from '../../components/shareds/FullScreenDropdown';
import CustomTextInput from '../../components/Product/CustomTextInput';
import {useCategoryList} from '../../api/Category/CategoryList';

type CategoryDetailScreenNavigationProp = NativeStackNavigationProp<
  CategoryStackParamList,
  'CategoryDetailScreen'
>;

type CategoryDetailScreenRouteProp = RouteProp<
  CategoryStackParamList,
  'CategoryDetailScreen'
>;

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

const CategoryDetailScreen = () => {
  const route = useRoute<CategoryDetailScreenRouteProp>();
  const navigation = useNavigation<CategoryDetailScreenNavigationProp>();
  const {CategoryGet} = useCategoryGet({id: route.params?.id});
  const [form, setForm] = useState({});
  const [isModified, setIsModified] = useState(false);
  const {categoryPut} = useCategoryPut();
  const {refetch} = useCategoryList();

  useEffect(() => {
    if (CategoryGet) {
      setForm(CategoryGet);
    }
  }, [CategoryGet]);
  console.log('Category Detail Screen', CategoryGet);
  useEffect(() => {
    navigation.setOptions({
      title: route.params?.title ?? 'Category Detail',
    });
  }, [navigation]);

  const handleChange = (field, value) => {
    setForm(prev => {
      const updatedForm = {...prev, [field]: value};
      setIsModified(
        JSON.stringify(updatedForm) !== JSON.stringify(CategoryGet),
      );
      return updatedForm;
    });
  };

  const handleUpdate = async () => {
    if (!form.name) {
      Alert.alert('Geçersiz Değer', 'Kategori adı boş bırakılamaz.', [
        {text: 'Tamam'},
      ]);
      return;
    } else {
      categoryPut
        .mutateAsync({id: route.params?.id, body: form})
        .then(res => {
          console.log('res', res);
          refetch();
          navigation.goBack();
          Alert.alert('Başarılı', 'Kategori başarıyla güncellendi.', [
            {text: 'Tamam', onPress: () => navigation.goBack()},
          ]);
        })
        .catch(err => {
          console.log('err', err);
          Alert.alert('Hata', 'Kategori güncellenirken bir hata oluştu.', [
            {text: 'Tamam'},
          ]);
        });
    }
    console.log('form updated', form);
  };

  console.log('form', form);

  return (
    <View style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1, marginBottom: 50}}>
        <ScrollView contentContainerStyle={styles.container}>
          <CustomTextInput
            info="Kategori nesnesi kimlik değeri."
            title="Name"
            value={form?.name || ''}
            onChangeText={text => handleChange('name', text)}
          />
          <CustomTextInput
            info="Kategori nesnesi için sıralama değeri."
            title="Sort Order"
            value={form?.sortOrder?.toString() || ''}
            keyboardType="numeric"
            onChangeText={text => handleChange('sortOrder', Number(text))}
          />
          <Text style={styles.title}>
            Status
            <Text style={styles.info}> Kategori aktiflik durumu.</Text>
          </Text>
          <FullScreenDropDown
            data={statusData}
            onSelect={item => handleChange('status', item.value)}
            value={statusData.find(item => item.value === form?.status)}>
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownText}>
                {statusData.find(item => item.value === form?.status)?.label ||
                  'Seçiniz'}
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
        <Button
          title="Güncelle"
          onPress={handleUpdate}
          disabled={!isModified}
          style={{opacity: isModified ? 1 : 0.5}}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default CategoryDetailScreen;

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
