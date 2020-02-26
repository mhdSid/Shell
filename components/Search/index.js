import React, {useState} from 'react';
import {Toolbar, ListItem} from 'react-native-material-ui';
import sharedStyles from '../../assets/styles/sharedStyles';
import {View, Alert, VirtualizedList} from 'react-native';
import {search} from '../../services/auth';
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';
import {Loading} from '../Loading';
import AdDetails from '../AdDetails';
import UserDetails from '../UserDetails';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState();
  const [loading, setLoading] = useState();
  const [searchData, setSearchData] = useState();
  const [showUserDetails, setShowUserDetails] = useState();
  const [showAdDetails, setShowAdDetails] = useState();
  const [selectedItem, setSelectedItem] = useState();

  const onSearchError = error => {
    const message =
      (error && error.message) || 'A an error has occured. Please try again.';
    setLoading(false);

    if (message) {
      Alert.alert(message);
    }
    return;
  };

  const onSeachSuccess = data => {
    const {error, searchData: searchResults} = data;
    if (error) {
      return onSearchError(error);
    }
    const newSearchResults = [
      ...((searchResults.users &&
        searchResults.users.map(user => {
          return {
            ...user,
            type: 'user',
          };
        })) ||
        []),
      ...((searchResults.ads &&
        searchResults.ads.map(ad => {
          return {
            ...ad,
            type: 'ad',
          };
        })) ||
        []),
    ];
    setSearchData(newSearchResults);
    setLoading(false);
    console.log('onSeachSuccess: ', newSearchResults);
  };

  const onSearchChangeText = value => {
    if (value) {
      setSearchQuery(value);
    }
  };

  const handleSearch = () => {
    // alert(query);
    if (searchQuery) {
      setLoading(true);
      search({searchQuery}).then(onSeachSuccess, onSearchError);
    }
  };

  const onAdDetailsClose = () => {
    setShowAdDetails(false);
  };

  const onUserDetailsClose = () => {
    setShowUserDetails(false);
  };

  const handleItemPress = item => {
    return () => {
      if (item.type === 'user') {
        setShowUserDetails(true);
      } else if (item.type === 'ad') {
        setShowAdDetails(true);
      }
      setSelectedItem(item);
    };
  };

  return (
    <View style={sharedStyles.fullheightView}>
      <Toolbar
        style={{container: sharedStyles.toolbarContainer}}
        // leftElement="menu"
        centerElement="Search"
        searchable={{
          autoFocus: true,
          placeholder: 'Search',
          onSubmitEditing: handleSearch,
          onChangeText: onSearchChangeText,
        }}

        // rightElement={{
        //   menu: {
        //     icon: 'more-vert',
        //     labels: ['item 1', 'item 2'],
        //   },
        // }}
        // onRightElementPress={handleSearch}
      />
      {loading && Loading}

      {searchData && (
        <VirtualizedList
          refreshing={loading}
          onRefresh={handleSearch}
          showsVerticalScrollIndicator={false}
          data={searchData}
          getItem={(data, index) => data[index]}
          getItemCount={() => searchData.length}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ListItem
              divider
              leftElement={
                item.image || (item.images && item.images[0]) ? (
                  <CachedImage
                    style={[
                      sharedStyles.homeListItemImage,
                      item.type === 'user' && sharedStyles.listItemUserImage,
                    ]}
                    cache="force-cache"
                    source={{
                      uri: item.image || item.images[0],
                      cache: 'force-cache',
                      // headers: {
                      //   Pragma: 'only-if-cached',
                      //   'Cache-Control': 'only-if-cached',
                      // },
                    }}
                  />
                ) : null
              }
              centerElement={{
                primaryText:
                  item.type === 'user'
                    ? `${item.firstName} ${item.lastName}`
                    : item.name,
                secondaryText:
                  item.type === 'user' ? item.email : item.category,
                tertiaryText:
                  item.type === 'user'
                    ? `${item.prefecture}, ${item.country}`
                    : `${item.currency} ${item.price}`,
              }}
              onPress={handleItemPress(item)}
            />
          )}
        />
      )}
      {showAdDetails && (
        <AdDetails onClose={onAdDetailsClose} item={selectedItem} />
      )}
      {showUserDetails && (
        <UserDetails onClose={onUserDetailsClose} item={selectedItem} />
      )}
    </View>
  );
};

export default SearchComponent;
