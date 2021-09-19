import React, {Component} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import sharedStyles from '../../assets/styles/sharedStyles';
import CardListItem from './CardListItem';

export default class CardListItemRow extends Component {
  static propTypes = {
    data: PropTypes.object,
    onItemPress: PropTypes.func,
    isFromLikedLotteriesView: PropTypes.bool,
  };
  constructor() {
    super();
  }
  UNSAFE_shouldComponentUpdate(nextProps) {
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
      <View style={sharedStyles.homeCardListItemRow}>
        {this.props.data.data.map((listItem, index) => (
          <View
            key={`${listItem.id + index}`}
            style={[
              sharedStyles.homeCardListItemContainer,
              index === this.props.data.data.length - 1 &&
                sharedStyles.homeCardListItemContainerNoMargin,
              // this.props.data.data.length === 1 &&
              //   sharedStyles.homeCardListItemContainerSingle,
            ]}>
            <CardListItem
              key={`${listItem.id + index}`}
              item={listItem}
              onItemPress={this.props.onItemPress}
              isFromLikedLotteriesView={this.props.isFromLikedLotteriesView}
            />
          </View>
        ))}
      </View>
    );
  }
}
