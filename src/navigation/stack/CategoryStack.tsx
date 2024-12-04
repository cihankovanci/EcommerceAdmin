import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CategoriesListScreen from '../../screens/Categories/CategoriesListScreen';
import AddCategoryScreen from '../../screens/Categories/AddCategoryScreen';
import CategoryDetailScreen from '../../screens/Categories/CategoryDetailScreen';

export type CategoryStackParamList = {
  CategoryListScreen: undefined;
  AddCategoryScreen: undefined;
  CategoryDetailScreen: {id: number; title: string};
};

const Stack = createNativeStackNavigator<CategoryStackParamList>();

const CategoryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CategoryListScreen"
        component={CategoriesListScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="AddCategoryScreen"
        component={AddCategoryScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="CategoryDetailScreen"
        component={CategoryDetailScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default CategoryStack;
