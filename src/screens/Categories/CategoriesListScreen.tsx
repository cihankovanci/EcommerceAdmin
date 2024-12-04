import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useCategoryList} from '../../api/Category/CategoryList';
import CategoryItem from '../../components/Category/CategoryItem';
import {useNavigation} from '@react-navigation/native';
import SwipeToDelete from '../../components/shareds/SwipeToDelete';
import {useCategoryDelete} from '../../api/Category/CategoryDelete';
import PlusIcon from '../../assets/Icons/PlusIcon';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CategoryStackParamList} from '../../navigation/stack/CategoryStack';

type CategoriesListScreenNavigationProp = NativeStackNavigationProp<
  CategoryStackParamList,
  'CategoryListScreen'
>;

const CategoriesListScreen = () => {
  const {CategoryList} = useCategoryList();
  const {categoryDelete} = useCategoryDelete();
  const [localCategoryList, setLocalCategoryList] = React.useState(
    CategoryList || [],
  );
  const navigation = useNavigation<CategoriesListScreenNavigationProp>();

  const HeaderRightButton = () => (
    <TouchableOpacity onPress={() => navigation.navigate('AddCategoryScreen')}>
      <PlusIcon size={24} color="#2b71fa" style={{marginRight: 10}} />
    </TouchableOpacity>
  );

  const HeaderLeftButton = () => (
    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      <PlusIcon size={24} color="#2b71fa" style={{marginRight: 10}} />
    </TouchableOpacity>
  );

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRightButton />,
      headerLeft: () => <HeaderLeftButton />,
    });
  }, [navigation]);

  React.useEffect(() => {
    if (CategoryList) {
      setLocalCategoryList(CategoryList);
    }
  }, [CategoryList]);

  const handleDelete = (key: string) => {
    console.log('Deleting category with ID:', key);
    setLocalCategoryList(prev =>
      prev.filter(item => item.id.toString() !== key),
    );
    deleteCategoryFromDatabase(Number(key));
  };

  const deleteCategoryFromDatabase = (id: number) => {
    console.log(`Deleting category from database with ID: ${id}`);
    categoryDelete
      .mutateAsync({id})
      .then(res => {
        console.log('res', res);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  if (!localCategoryList || localCategoryList.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No categories available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SwipeToDelete
        data={localCategoryList.map(item => ({
          ...item,
          key: item.id.toString(),
        }))}
        renderItem={({item}: any) => (
          <CategoryItem
            name={item.name}
            imageUrl={item.imageUrl}
            onPress={() =>
              navigation.navigate('CategoryDetailScreen' as never, {
                id: item.id,
                title: item.name,
              })
            }
          />
        )}
        onDelete={handleDelete}
      />
    </View>
  );
};

export default CategoriesListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#333',
  },
});
