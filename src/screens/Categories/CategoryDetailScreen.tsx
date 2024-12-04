import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CategoryStackParamList} from '../../navigation/stack/CategoryStack';

type CategoryDetailScreenNavigationProp = NativeStackNavigationProp<
  CategoryStackParamList,
  'CategoryDetailScreen'
>;

type CategoryDetailScreenRouteProp = RouteProp<
  CategoryStackParamList,
  'CategoryDetailScreen'
>;
const CategoryDetailScreen = () => {
  const route = useRoute<CategoryDetailScreenRouteProp>();
  const navigation = useNavigation<CategoryDetailScreenNavigationProp>();
  console.log('route', route);
  React.useEffect(() => {
    navigation.setOptions({
      title: route.params?.title ?? 'Category Detail',
    });
  }, [navigation]);
  return (
    <View>
      <Text>CategoryDetailScreen</Text>
    </View>
  );
};

export default CategoryDetailScreen;

const styles = StyleSheet.create({});
