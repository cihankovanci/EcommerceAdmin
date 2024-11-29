import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useCategoryList } from '../../api/Category/CategoryList'

const CategoriesListScreen = () => {
    const {CategoryList} = useCategoryList()
    console.log('CategoryList', CategoryList)
  return (
    <View>
      <Text>CategoriesListScreen</Text>
    </View>
  )
}

export default CategoriesListScreen

const styles = StyleSheet.create({})