import React, {Component} from 'react';
import {ActionSheetIOS, View} from 'react-native';
import PropTypes from 'prop-types';
import sharedStyles from '../../assets/styles/sharedStyles';
import FastImage from 'react-native-fast-image';
import {invoke} from 'lodash';
import {ListItem} from 'react-native-material-ui';
import {loadingPopup} from '../Loading';

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
  handleRightElementPress = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', 'Chat with owner'],
        // destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
        userInterfaceStyle: 'dark',
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          // setResult(Math.floor(Math.random() * 100) + 1);
        } else if (buttonIndex === 2) {
          // setResult("🔮");
        }
      },
    );
  };
  render() {
    return (
      <View
        style={[
          sharedStyles.listComponentContainer,
          this.props.index === this.props.listLength - 1 &&
            sharedStyles.homeListItemMargin,
        ]}>
        {loadingPopup}
        {this.props.showUploadProgress ? loadingPopup : null}
        <ListItem
          divider
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
          rightElement={'more-vert'}
          onRightElementPress={this.handleRightElementPress}
          onPress={this.handleItemPress}
        />
      </View>
    );
  }
}
