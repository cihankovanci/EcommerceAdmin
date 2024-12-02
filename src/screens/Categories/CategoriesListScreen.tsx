import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useCategoryList } from '../../api/Category/CategoryList'
import CategoryItem from '../../components/Category/CategoryItem'
import { useNavigation } from '@react-navigation/native'

const CategoriesListScreen = () => {
    const {CategoryList} = useCategoryList()
    const navigation = useNavigation()
    console.log('CategoryList', CategoryList)

    const renderItem = ({ item }: { item: any }) => (
      <CategoryItem
        name={item.name}
        imageUrl={item.imageUrl}
        onPress={() => navigation.navigate('CategoryList')}
      />
    );
  return (
    <View style={styles.container}>
    <FlatList
      data={CategoryList}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.listContainer}
    />
  </View>
  )
}

export default CategoriesListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingBottom: 10,
  },
})