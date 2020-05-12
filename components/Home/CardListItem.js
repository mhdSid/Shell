import React, {PureComponent} from 'react';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';
import PropTypes from 'prop-types';
import invoke from 'lodash/invoke';
import {CachedImage} from '../../lib/CachedImage/react-native-cached-image';
import sharedStyles from '../../assets/styles/sharedStyles';
import {View, Text} from 'react-native';

export default class CardListItem extends PureComponent {
  static propTypes = {
    item: PropTypes.object,
    onItemPress: PropTypes.func,
  };

  handleItemPress = () => {
    const {item} = this.props;
    invoke(this.props, 'onItemPress', item);
  };

  getItemFullPrice = () => {
    const {item} = this.props;
    return `${item.currency} ${item.price}`;
  };

  render() {
    const {item} = this.props;
    return (
      <TouchableBounce
        style={sharedStyles.homeCardItem}
        onPress={this.handleItemPress}>
        <CachedImage
          style={sharedStyles.homeCardItemImage}
          source={{uri: item.images[0]}}
        />
        <View style={sharedStyles.homeCardItemTextContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={sharedStyles.homeCardItemText}>
            {item.name}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={sharedStyles.homeCardItemText}>
            {item.description}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={sharedStyles.homeCardItemText}>
            {item.category}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={sharedStyles.homeCardItemText}>
            {this.getItemFullPrice()}
          </Text>
        </View>
      </TouchableBounce>
    );
  }
}
