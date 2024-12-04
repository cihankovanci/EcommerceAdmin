import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'



const Live = () => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled={Platform.OS === "android"}
      >

        <WebView
          originWhitelist={['*']}
          setSupportMultipleWindows={false}
          source={{ uri: 'https://testcase.myideasoft.com' }}
          style={{ marginTop: 20, flex: 1 }}
          keyboardDisplayRequiresUserAction={false}
        />
        </KeyboardAvoidingView>
    </View>
  )
}

export default Live

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})