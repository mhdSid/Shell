import React, {Component} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './cardListItemRow.style';
import CardListItem from './CardListItem';

export default class CardListItemRow extends Component {
  static propTypes = {
    data: PropTypes.object,
    onItemPress: PropTypes.func,
  };
  constructor() {
    super();
  }
  shouldComponentUpdate(nextProps) {
    if (
      JSON.stringify(nextProps.data).toString() !==
      JSON.stringify(this.props.data).toString()
    ) {
      return true;
    }
    return false;
  }
  render() {
    return (
      <View
        style={[
          styles.cardListItemRowRootViewContainer,
          (this.props.data.data.length === 1 ||
            this.props.data.data.length === 2) &&
            styles.cardListItemFlexStart,
        ]}>
        {this.props.data.data.map((listItem, index, array) => (
          <View
            key={`${listItem.id + index}`}
            style={[
              styles.cardListItemRowViewContainer,
              index === array.length - 1 &&
                styles.cardListItemRowViewContainerNoMargin,
            ]}>
            <CardListItem
              key={`${listItem.id + index}`}
              item={listItem}
              onItemPress={this.props.onItemPress}
            />
          </View>
        ))}
      </View>
    );
  }
}
