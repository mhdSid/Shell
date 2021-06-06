import React, {PureComponent, useState} from 'react';
import {Toolbar} from 'react-native-material-ui';
import sharedStyles from '../../assets/styles/sharedStyles';
import {View, VirtualizedList} from 'react-native';
import {Loading} from '../Loading';
import UserDetails from '../UserDetails';
import {searchh} from '../../Constants/Texts';
import {connect} from 'react-redux';
import invoke from 'lodash/invoke';
import {showAdDetails} from '../../redux/AdDetails/actions';
import {handleSearch} from '../../redux/Search/Search';
import {getSearchResultsSelector} from './Selectors';
import SearchListItem from './SearchListItem';

class SearchComponent extends PureComponent {
  state = {
    loading: false,
    searchQuery: null,
    showUserDetails: false,
    selectedItem: null,
  };

  callback = () => {
    this.setState({loading: false});
  };

  handleSearchPress = () => {
    if (this.state.searchQuery) {
      this.setState({loading: true});
      invoke(this.props, 'handleSearch', {
        searchQuery: this.state.searchQuery,
        onError: this.callback,
        onSuccess: this.callback,
      });
    }
  };
  onSearchChangeText = value => {
    if (value) {
      this.setState({searchQuery: value});
    }
  };
  onUserDetailsClose = () => {
    this.setState({showUserDetails: false});
  };
  handleItemPress = item => {
    if (item.type === 'user') {
      this.setState({
        selectedItem: item,
        showUserDetails: true,
      });
    } else if (item.type === 'ad') {
      invoke(this.props, 'showAdDetails', item);
    }
  };
  keyExtractor = item => item.id;
  getItemCount = () =>
    this.props.searchResults && this.props.searchResults.length;
  getItem = (data, index) => data[index];
  renderItem = ({item}) => (
    <SearchListItem item={item} onPress={this.handleItemPress} />
  );

  render() {
    const {showUserDetails, selectedItem, loading} = this.state;
    const {searchResults} = this.props;
    return (
      <View>
        {showUserDetails && (
          <UserDetails onClose={this.onUserDetailsClose} item={selectedItem} />
        )}
        <View style={sharedStyles.fullheightView}>
          <Toolbar
            style={{container: sharedStyles.toolbarContainer}}
            centerElement={searchh.search}
            searchable={{
              autoFocus: true,
              placeholder: searchh.search,
              onSubmitEditing: this.handleSearchPress,
              onChangeText: this.onSearchChangeText,
            }}
          />
          {loading && Loading}
          {searchResults && (
            <VirtualizedList
              removeClippedSubviews={true}
              windowSize={2}
              initialNumToRender={2}
              refreshing={loading}
              onRefresh={this.handleSearchPress}
              showsVerticalScrollIndicator={false}
              data={searchResults}
              getItem={this.getItem}
              getItemCount={this.getItemCount}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderItem}
            />
          )}
        </View>
      </View>
    );
  }
}

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
