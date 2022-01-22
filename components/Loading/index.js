import React from 'react';
import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import styles from './loading.style';

const SimpleLoader = (
  <ActivityIndicator style={styles.simpleLoaderAlignedCenter} />
);
const SimpleLoaderDefault = <ActivityIndicator color="white" />;

const Loading = (
  <SafeAreaView style={styles.loadingSafeAreaView}>
    <ActivityIndicator />
  </SafeAreaView>
);

const LoadingComponent = () => {
  return <>{Loading}</>;
};

const loadingPopup = (
  <View style={styles.loadingPopupViewContainer}>
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
