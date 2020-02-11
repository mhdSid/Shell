import React from 'react';
import {ActivityIndicator, SafeAreaView} from 'react-native';
import sharedStyles from '../../assets/styles/sharedStyles';

const Loading = (
  <SafeAreaView style={sharedStyles.loading}>
    <ActivityIndicator />
  </SafeAreaView>
);

const LoadingComponent = () => {
  return <Loading />;
};

export {LoadingComponent, Loading};
