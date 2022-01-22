import React from 'react';
import {AppRegistry, LogBox, StyleSheet} from 'react-native';
import App from './src';
import appData from './app.json';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const RootApp = () => (
  <GestureHandlerRootView style={styles.container}>
    <Provider store={store}>
      <App />
    </Provider>
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appData.name, () => RootApp);

const styles = StyleSheet.create({
  container: {flex: 1},
});
