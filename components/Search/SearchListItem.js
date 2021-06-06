import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import invoke from 'lodash/invoke';
import sharedStyles from '../../assets/styles/sharedStyles';
import FastImage from 'react-native-fast-image';
import {ListItem} from 'react-native-material-ui';

export default class SearchListItem extends PureComponent {
  static propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func,
  };

  constructor(props) {
    super(props);
    const {item} = this.props;
    this.centerElement = {
      primaryText:
        item.type === 'user' ? `${item.firstName} ${item.lastName}` : item.name,
      secondaryText: item.type === 'user' ? item.email : item.category,
      tertiaryText:
        item.type === 'user'
          ? `${item.prefecture}, ${item.country}`
          : `${item.currency} ${item.price}`,
    };
  }

  handleItemPress = () => {
    const {item} = this.props;
    invoke(this.props, 'onPress', item);
  };

  shouldComponentUpdate() {
    return false;
  }

  renderLeftElement = () => {
    const {item} = this.props;

    return item.image || (item.images && item.images[0]) ? (
      <FastImage
        style={[
          sharedStyles.homeListItemImage,
          item.type === 'user' && sharedStyles.listItemUserImage,
        ]}
        source={{
          uri: item.image || item.images[0],
          priority: FastImage.priority.low,
          cache: FastImage.cacheControl.immutable,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    ) : null;
  };

  render() {
    return (
      <ListItem
        divider
        leftElement={this.renderLeftElement()}
        centerElement={this.centerElement}
        onPress={this.handleItemPress}
      />
    );
  }
}
