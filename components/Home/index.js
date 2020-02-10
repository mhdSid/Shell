import React from 'react';
import {
  Toolbar,
  ListItem,
  Snackbar,
  Drawer,
  Avatar,
} from 'react-native-material-ui';
import {ScrollView, View} from 'react-native';

const HomeComponent = () => {
  return (
    <>
      <Toolbar
        style={{
          container: {
            height: 60,
          },
        }}
        leftElement="menu"
        centerElement="WinAd"
        // searchable={{
        //   autoFocus: true,
        //   placeholder: 'Search',
        // }}
        // rightElement={{
        //   menu: {
        //     icon: 'more-vert',
        //     labels: ['item 1', 'item 2'],
        //   },
        // }}
        onLeftElementPress={label => {
          alert('onLeftElementPress');
        }}
        onRightElementPress={label => {
          console.log(label);
        }}
      />
      <ScrollView>
        <View style={{fpaddingTop: 100}}>
          {/* <Snackbar
            visible={true}
            message="hello World"
            onRequestClose={() => this.setState({isVisible: false})}
          /> */}
        </View>
      </ScrollView>
    </>
  );
};

export default HomeComponent;
