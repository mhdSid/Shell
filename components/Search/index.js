import React from 'react';
import {Toolbar} from 'react-native-material-ui';

const SearchComponent = () => {
  return (
    <Toolbar
      style={{
        container: {
          height: 60,
        },
      }}
      // leftElement="menu"
      centerElement="Search For Ads"
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
        console.log(label);
      }}
    />
  );
};

export default SearchComponent;
