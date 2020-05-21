import React, {useState} from 'react';
import {Toolbar, ListItem} from 'react-native-material-ui';
import sharedStyles from '../../assets/styles/sharedStyles';
import {View, VirtualizedList} from 'react-native';
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';
import {Loading} from '../Loading';
import UserDetails from '../UserDetails';
import {searchh} from '../../Constants/Texts';
import {connect} from 'react-redux';
import invoke from 'lodash/invoke';
import {showAdDetails} from '../../redux/AdDetails/actions';
import {handleSearch} from '../../redux/Search/Search';
import {getSearchResultsSelector} from './Selectors';

const SearchComponent = props => {
  const {searchResults} = props;
  const [searchQuery, setSearchQuery] = useState();
  const [loading, setLoading] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState();
  const [selectedItem, setSelectedItem] = useState();

  const callback = () => {
    setLoading(false);
  };
  const handleSearchPress = () => {
    if (searchQuery) {
      setLoading(true);
      invoke(props, 'handleSearch', {
        searchQuery,
        onError: callback,
        onSuccess: callback,
      });
    }
  };
  const onSearchChangeText = value => {
    if (value) {
      setSearchQuery(value);
    }
  };
  const onUserDetailsClose = () => {
    setShowUserDetails(false);
  };
  const handleItemPress = item => {
    return () => {
      if (item.type === 'user') {
        setSelectedItem(item);
        setShowUserDetails(true);
      } else if (item.type === 'ad') {
        invoke(props, 'showAdDetails', item);
      }
    };
  };

  return (
    <>
      {showUserDetails && (
        <UserDetails onClose={onUserDetailsClose} item={selectedItem} />
      )}
      <View style={sharedStyles.fullheightView}>
        <Toolbar
          style={{container: sharedStyles.toolbarContainer}}
          centerElement={searchh.search}
          searchable={{
            autoFocus: true,
            placeholder: searchh.search,
            onSubmitEditing: handleSearchPress,
            onChangeText: onSearchChangeText,
          }}
        />
        {loading && Loading}
        {searchResults && (
          <VirtualizedList
            refreshing={loading}
            onRefresh={handleSearchPress}
            showsVerticalScrollIndicator={false}
            data={searchResults}
            getItem={(data, index) => data[index]}
            getItemCount={() => searchResults.length}
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
                      source={{
                        uri: item.image || item.images[0],
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
      </View>
    </>
  );
};

const mapStateToProps = state => {
  return {
    searchResults: getSearchResultsSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showAdDetails: payload => dispatch(showAdDetails(payload)),
    handleSearch: payload => dispatch(handleSearch(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchComponent);
