import React, {Component} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import sharedStyles from '../../assets/styles/sharedStyles';
import FastImage from 'react-native-fast-image';
import {invoke} from 'lodash';
import UploadAdProgressItem from '../UploadAdProgress';
import {ListItem} from 'react-native-material-ui';

export default class ListItemCommon extends Component {
  static propTypes = {
    item: PropTypes.object,
    listLength: PropTypes.number,
    onItemPress: PropTypes.func,
    index: PropTypes.number,
  };
  constructor() {
    super();
  }
  shouldComponentUpdate(nextProps) {
    if (
      JSON.stringify(nextProps.item).toString() !==
      JSON.stringify(this.props.item).toString()
    ) {
      return true;
    }
    return false;
  }
  handleItemPress = () => {
    invoke(this.props, 'onItemPress', this.props.index);
  };
  render() {
    return (
      <View
        style={
          this.props.index === this.props.listLength - 1 &&
          sharedStyles.homeListItemMargin
        }>
        <ListItem
          divider
          style={{
            container:
              this.props.showUploadProgress &&
              sharedStyles.uploadProgressModalListItemContainer,
          }}
          leftElement={
            this.props.item.images && this.props.item.images[0] ? (
              <FastImage
                style={sharedStyles.homeListItemImage}
                source={{
                  uri: this.props.item.images[0],
                  priority: FastImage.priority.high,
                  cache: FastImage.cacheControl.immutable,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : null
          }
          centerElement={{
            primaryText: this.props.item.name,
            secondaryText: this.props.item.category,
            tertiaryText: `${this.props.item.currency} ${
              this.props.item.price
            }`,
          }}
          onPress={this.handleItemPress}
        />
        {this.props.showUploadProgress ? (
          <UploadAdProgressItem id={this.props.item.id} />
        ) : null}
      </View>
    );
  }
}
