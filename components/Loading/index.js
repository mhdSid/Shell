import React from 'react';
import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';

const SimpleLoader = <ActivityIndicator style={sharedStyles.simpleLoader} />;
const SimpleLoaderDefault = <ActivityIndicator color="white" />;

const Loading = (
  <SafeAreaView style={sharedStyles.loading}>
    <ActivityIndicator />
  </SafeAreaView>
);

const LoadingComponent = () => {
  return <>{Loading}</>;
};

const loadingPopup = (
  <View style={sharedStyles.loadingPopup}>
    <LoadingComponent />
  </View>
);

export {
  LoadingComponent,
  Loading,
  loadingPopup,
  SimpleLoader,
  SimpleLoaderDefault,
};
