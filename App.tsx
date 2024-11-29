import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ProductListScreen from './src/screens/Product/ProductListScreen';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import Drawer from './src/navigation/drawer/Drawer';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        {/* <ProductListScreen /> */}

        <Drawer />
      </View>
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
