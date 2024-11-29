import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ProductListScreen from './src/screens/Product/ProductListScreen';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import CategoriesListScreen from './src/screens/Categories/CategoriesListScreen';

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        {/* <ProductListScreen /> */}
        <CategoriesListScreen />
      </View>
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});
