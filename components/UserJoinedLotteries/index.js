import React, {useEffect, useState} from 'react';
import {View, VirtualizedList, Text} from 'react-native';
import {connect} from 'react-redux';
import sharedStyles from '../../assets/styles/sharedStyles';
import NoAuth from '../NoAuth';
import isUndefined from 'lodash/isUndefined';
import {Loading} from '../Loading';
import PropTypes from 'prop-types';
import {Toolbar} from 'react-native-material-ui';
import {lottteries as lotteriesTexts} from '../../Constants/Texts';
import {
  getLoggedInSelector,
  getUserSelector,
  getUserJoinedLotteriesSelector,
} from './Selectors';
import invoke from 'lodash/invoke';
import {handleFetchUserJoinedLotteries} from '../../redux/Lotteries/FetchUserJoinedLotteries';
import {showLotteryDetails} from '../../redux/LotteryDetails/actions';
import {showLotteryResult} from '../../redux/LotteryResult/actions';
import {getLotteryDetailsSelector} from '../Pinger/Selectors';
import Filter from '../Filter';
import {getIsCardSelector, getIsListSelector} from '../Home/Selectors';
import {setHomeViewStyle} from '../../redux/Settings/actions';
import {chunk} from 'lodash';
import ListItemCommon from '../Home/ListItem';
import CardListItemRow from '../Home/CardListItemRow';

const Lotteries = props => {
  const {
    loggedIn,
    userJoinedLotteries,
    user,
    lotteryDetails,
    isList,
    isCard,
  } = props;
  const [loading, setLoading] = useState(true);
  const [filteredLotteries, setFilteredLotteries] = useState(null);
  const [lotteryCardList, setLotteryCardList] = useState([]);

  const callback = () => {
    setLoading(false);
  };
  const fetchLotteries = () => {
    setLoading(true);
    invoke(props, 'fetchUserJoinedLotteries', {
      userId: user.id,
      onSuccess: callback,
      onError: callback,
    });
  };

  useEffect(() => {
    if (loggedIn && user) {
      fetchLotteries();
    }
  }, [lotteryDetails, loggedIn, user]);

  useEffect(() => {
    if (isCard) {
      let lotteryRowCardList = null;
      if (
        Array.isArray(filteredLotteries || userJoinedLotteries) &&
        (filteredLotteries || userJoinedLotteries).length
      ) {
        lotteryRowCardList = chunk(
          filteredLotteries || userJoinedLotteries,
          3,
        ).map(list => ({
          data: list,
          key: `_${Math.random()
            .toString(36)
            .substr(2, 9)}`,
        }));
      }
      setLotteryCardList(lotteryRowCardList);
    }
  }, [filteredLotteries, isCard, userJoinedLotteries]);

  const getItem = (data, index) => data[index];
  const getItemCount = () =>
    (filteredLotteries || userJoinedLotteries || []).length;
  const getItemKey = item => item.id;
  const getRowItemKey = item => `${item.key}`;
  const getRowItemCount = () => (lotteryCardList || []).length;
  const onItemPress = index => {
    invoke(props, 'showLotteryDetails', {
      ...(filteredLotteries || userJoinedLotteries)[index],
      // disableHeaderActions: true,
    });
  };
  const handleShowLotteryResult = index => {
    invoke(props, 'showLotteryResult', {
      ...(filteredLotteries || userJoinedLotteries)[index],
      // disableHeaderActions: true,
    });
  };
  const renderListItem = ({item, index}) => (
    <ListItemCommon
      item={item}
      index={index}
      onItemPress={onItemPress}
      listLength={(filteredLotteries || userJoinedLotteries).length}
      showLotteryResult={handleShowLotteryResult}
    />
  );
  const handleFilterChange = filterValue => {
    if (
      !filterValue ||
      !userJoinedLotteries ||
      userJoinedLotteries.length === 0
    ) {
      setFilteredLotteries(null);
      return;
    }
    if (
      filterValue &&
      Array.isArray(userJoinedLotteries) &&
      userJoinedLotteries.length
    ) {
      const filteredData = userJoinedLotteries.filter(
        item =>
          item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          item.description.toLowerCase().includes(filterValue.toLowerCase()),
      );
      setFilteredLotteries(
        filteredData && filteredData.length
          ? filteredData
          : filteredLotteries && filteredLotteries.length
          ? filteredLotteries
          : null,
      );
    }
  };
  const changeViewStyle = () => {
    if (isCard) {
      invoke(props, 'setHomeViewStyle', {
        isHomeCardStyle: false,
        isHomeListStyle: true,
      });
    }
    if (isList) {
      invoke(props, 'setHomeViewStyle', {
        isHomeCardStyle: true,
        isHomeListStyle: false,
      });
    }
  };
  const handleCardItemPress = item => {
    invoke(props, 'showLotteryDetails', item);
  };
  const renderCardListItemRow = ({item}) => (
    <CardListItemRow data={item} onItemPress={handleCardItemPress} />
  );

  if (isUndefined(loggedIn) && isUndefined(user)) {
    return Loading;
  }

  if (!loggedIn && !user) {
    return <NoAuth />;
  }

  return (
    <View style={sharedStyles.fullheightView}>
      <Toolbar
        style={{container: sharedStyles.toolbarContainer}}
        centerElement={lotteriesTexts.lotteries}
        rightElement={isCard ? 'view-list' : 'view-comfy'}
        onRightElementPress={changeViewStyle}
      />
      <View style={sharedStyles.lotteriesContainer}>
        <Filter onFilterChange={handleFilterChange} />
        <VirtualizedList
          initialNumToRender={isCard ? 10 : 2}
          windowSize={isCard ? 10 : 2}
          removeClippedSubviews={true}
          refreshing={loading}
          onRefresh={fetchLotteries}
          ListEmptyComponent={
            <Text style={sharedStyles.uploadProgressModalText}>
              {lotteriesTexts.emptyLotteries}
            </Text>
          }
          progressViewOffset={-100}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          data={
            isCard
              ? lotteryCardList || []
              : filteredLotteries || userJoinedLotteries
          }
          getItem={getItem}
          getItemCount={isCard ? getRowItemCount : getItemCount}
          contentContainerStyle={isCard && sharedStyles.homeLotteriesContainer}
          keyExtractor={isCard ? getRowItemKey : getItemKey}
          renderItem={isCard ? renderCardListItemRow : renderListItem}
        />
      </View>
    </View>
  );
};

Lotteries.propTypes = {
  loggedIn: PropTypes.bool,
  user: PropTypes.any,
  userJoinedLotteries: PropTypes.any,
  showLotteryResult: PropTypes.func,
  lotteryDetails: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    loggedIn: getLoggedInSelector(state),
    user: getUserSelector(state),
    userJoinedLotteries: getUserJoinedLotteriesSelector(state),
    lotteryDetails: getLotteryDetailsSelector(state),
    isList: getIsListSelector(state),
    isCard: getIsCardSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserJoinedLotteries: payload =>
      dispatch(handleFetchUserJoinedLotteries(payload)),
    showLotteryDetails: payload => dispatch(showLotteryDetails(payload)),
    showLotteryResult: payload => dispatch(showLotteryResult(payload)),
    setHomeViewStyle: payload => dispatch(setHomeViewStyle(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Lotteries);
