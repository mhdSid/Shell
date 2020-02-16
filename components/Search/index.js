import React from 'react';
import {Toolbar} from 'react-native-material-ui';
import sharedStyles from '../../assets/styles/sharedStyles';
import {View} from 'react-native';

const SearchComponent = () => {
  return (
    <View style={sharedStyles.fullheightView}>
      <Toolbar
        style={{container: sharedStyles.toolbarContainer}}
        // leftElement="menu"
        centerElement="Search"
        searchable={{
          autoFocus: true,
          placeholder: 'Search',
        }}
        // rightElement={{
        //   menu: {
        //     icon: 'more-vert',
        //     labels: ['item 1', 'item 2'],
        //   },
        // }}
        onRightElementPress={label => {
          // console.log(label);
        }}
      />
    </View>
  );
};

export default SearchComponent;
