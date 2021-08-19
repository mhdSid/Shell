import React, {createRef, useState} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import sharedStyles from '../../assets/styles/sharedStyles';
import PropTypes from 'prop-types';
import {Animated} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import {prefectures, cities} from '../../Constants/Countries';
import {
  importLottery,
  profile,
  validationMessages,
} from '../../Constants/Texts';
import {TextField} from 'react-native-material-textfield';
import {Button} from 'react-native-material-ui';
import {handleSearch} from '../../redux/Search/Search';
import {
  setSearchEventFired,
  setSearchFilters,
} from '../../redux/Search/actions';
import {invoke} from 'lodash';
import {
  getSearchEventFiredSelector,
  getSearchFiltersSelector,
} from './Selectors';
import {
  lotteryItemConditions,
  lotteryItemCategories,
} from '../../Constants/Lotteries';
import {handleFetchLotteries} from '../../redux/Home/FetchLotteries';
import {getUserIdSelector} from '../Profile/Selectors';

const SearchBox = props => {
  const {searchFilters, style, searchEventFired} = props;
  let searchFiltersPrefecture;
  if (searchFilters.prefecture) {
    searchFiltersPrefecture = prefectures.Japan.find(
      item => item.kanji === searchFilters.prefecture,
    ).name;
  }
  const [cityDropdownData, setCityDropdownData] = useState(
    searchFiltersPrefecture
      ? cities[searchFiltersPrefecture].map(item => ({value: item}))
      : [],
  );
  const fromDateRef = createRef();
  const toDateRef = createRef();
  const searchQueryRef = createRef();
  const [errors, setErrors] = useState({
    fromDate: false,
    toDate: false,
    searchQuery: false,
  });

  const prefectureOnChangeText = (value, index) => {
    setCityDropdownData(
      cities[prefecturesDropdownData[index].name].map(item => ({
        value: item,
      })),
    );
    invoke(props, 'handleSetSearchFilters', {
      prefecture: prefecturesDropdownData[index].kanji,
    });
  };
  const cityOnChangeText = value => {
    invoke(props, 'handleSetSearchFilters', {city: value});
  };
  const conditionOnChangeText = value => {
    invoke(props, 'handleSetSearchFilters', {condition: value});
  };
  const categoryOnChangeText = value => {
    invoke(props, 'handleSetSearchFilters', {category: value});
  };
  const prefecturesDropdownData = prefectures.Japan.map(item => ({
    ...item,
    value: item.kanji,
  }));
  const handleChange = {
    fromDate: () => {
      return value => {
        if (value) {
          if (Date.parse(value) > 0) {
            // let fromDate = `${value}`;
            // console.log('fromDate: ', fromDate);
            // if (fromDate.length === 4 || fromDate.length === 7) {
            //   fromDate = `${fromDate}/`;
            // }
            invoke(props, 'handleSetSearchFilters', {fromDate: value});
            setErrors({
              ...errors,
              fromDate: false,
            });
          } else {
            setErrors({
              ...errors,
              fromDate: validationMessages.search.fromDate,
            });
          }
        }
      };
    },
    toDate: () => {
      return value => {
        if (value) {
          if (Date.parse(value) > 0) {
            // let toDate = `${value}`;
            // console.log('toDate: ', toDate);
            // if (toDate.length === 4 || toDate.length === 7) {
            //   toDate = `${toDate}/`;
            // }
            invoke(props, 'handleSetSearchFilters', {toDate: value});
            setErrors({
              ...errors,
              toDate: false,
            });
          } else {
            setErrors({
              ...errors,
              toDate: validationMessages.search.toDate,
            });
          }
        }
      };
    },
    searchQuery: () => {
      return value => {
        if (value) {
          if (value.length >= 2 && value.length <= 100) {
            setErrors({
              ...errors,
              searchQuery: false,
            });
          } else {
            setErrors({
              ...errors,
              searchQuery: validationMessages.search.searchQuery,
            });
          }
        }
      };
    },
  };
  const handleBlur = fieldName => {
    return () => {
      const {current: fromDateField} = fromDateRef;
      const {current: toDateField} = toDateRef;
      const {current: searchQueryField} = searchQueryRef;
      const values = {
        fromDate: fromDateField && fromDateField.value(),
        toDate: toDateField && toDateField.value(),
        searchQuery: searchQueryField && searchQueryField.value(),
      };
      handleChange[fieldName]()(values[fieldName]);
    };
  };
  const handleSearchPress = () => {
    fromDateRef.current.blur();
    toDateRef.current.blur();
    searchQueryRef.current.blur();
    const {current: searchQueryField} = searchQueryRef;
    const searchQuery = searchQueryField && searchQueryField.value();
    // if (
    //   searchQuery ||
    //   searchFilters.fromDate ||
    //   searchFilters.toDate ||
    //   searchFilters.prefecture ||
    //   searchFilters.city ||
    //   searchFilters.category ||
    //   searchFilters.condition
    // ) {
    invoke(props, 'handleSearch', {
      searchQuery,
      filters: {
        ...searchFilters,
      },
      onError: props.onSearchError,
      onSuccess: props.onSearchSuccess,
    });
    invoke(props, 'handleSetSearchEventFired', true);
    // }
    invoke(props, 'onSearchPress');
  };
  const handleResetSearchFilters = () => {
    invoke(props, 'handleSetSearchFilters', {
      city: '',
      prefecture: '',
      category: '',
      condition: '',
      fromDate: '',
      toDate: '',
    });
    invoke(props, 'onSearchPress');
    if (searchEventFired) {
      invoke(props, 'handleSetSearchEventFired', false);
    }
    invoke(props, 'fetchLotteries', {
      onError: props.onSearchError,
      onSuccess: props.onSearchSuccess,
      userId: props.authUserId,
    });
  };
  const {current: searchQueryField} = searchQueryRef;
  const searchQuery = searchQueryField && searchQueryField.value();
  return (
    <Animated.View style={[sharedStyles.searchBox, {...style}]}>
      <View style={sharedStyles.searchBoxOverlay} />
      <View style={[sharedStyles.searchBoxInnerContainer]}>
        <View style={sharedStyles.searchBoxRow}>
          <View
            style={[
              sharedStyles.searchBoxDivision,
              sharedStyles.searchBoxDivisionFirst,
            ]}>
            <Dropdown
              label={profile.prefecture}
              data={prefecturesDropdownData}
              onChangeText={prefectureOnChangeText}
              selectedItemColor={'rgba(0, 0, 0, .87)'}
              baseColor={'rgba(0,0,0,0.3)'}
              value={searchFilters.prefecture}
            />
          </View>
          <View
            style={[
              sharedStyles.searchBoxDivision,
              sharedStyles.searchBoxDivisionSecond,
            ]}>
            <Dropdown
              label={profile.city}
              data={cityDropdownData}
              onChangeText={cityOnChangeText}
              selectedItemColor={'rgba(0, 0, 0, .87)'}
              baseColor={'rgba(0,0,0,0.3)'}
              value={searchFilters.city}
            />
          </View>
        </View>
        <View style={sharedStyles.searchBoxRow}>
          <View
            style={[
              sharedStyles.searchBoxDivision,
              sharedStyles.searchBoxDivisionFirst,
            ]}>
            <TextField
              blurOnSubmit={true}
              outlined
              activeLineWidth={1}
              placeholder={'yyyy/mm/dd'}
              label={'From'}
              value={searchFilters.fromDate}
              keyboardType="numbers-and-punctuation"
              onBlur={handleBlur('fromDate')}
              tintColor={'rgba(0,0,0,0.3)'}
              onChangeText={handleChange.fromDate()}
              placeholderTextColor={'rgba(0,0,0,0.3)'}
              error={errors.fromDate}
              ref={fromDateRef}
            />
          </View>
          <View
            style={[
              sharedStyles.searchBoxDivision,
              sharedStyles.searchBoxDivisionSecond,
            ]}>
            <TextField
              outlined
              placeholder={'yyyy/mm/dd'}
              label={'To'}
              activeLineWidth={1}
              keyboardType="numbers-and-punctuation"
              value={searchFilters.toDate}
              blurOnSubmit={true}
              onBlur={handleBlur('toDate')}
              tintColor={'rgba(0,0,0,0.3)'}
              onChangeText={handleChange.toDate()}
              placeholderTextColor={'rgba(0,0,0,0.3)'}
              error={errors.toDate}
              ref={toDateRef}
            />
          </View>
        </View>
        <View style={sharedStyles.searchBoxRow}>
          <View
            style={[
              sharedStyles.searchBoxDivision,
              sharedStyles.searchBoxDivisionFirst,
            ]}>
            <Dropdown
              label={importLottery.category}
              baseColor={'rgba(0,0,0,0.3)'}
              selectedItemColor={'rgba(0, 0, 0, .87)'}
              data={lotteryItemCategories}
              onChangeText={categoryOnChangeText}
              value={searchFilters.category}
            />
          </View>
          <View
            style={[
              sharedStyles.searchBoxDivision,
              sharedStyles.searchBoxDivisionSecond,
            ]}>
            <Dropdown
              baseColor={'rgba(0,0,0,0.3)'}
              label={importLottery.condition}
              selectedItemColor={'rgba(0, 0, 0, .87)'}
              data={lotteryItemConditions}
              onChangeText={conditionOnChangeText}
              value={searchFilters.condition}
            />
          </View>
        </View>
        <View style={sharedStyles.searchBoxRow}>
          <View style={sharedStyles.searchBoxDivision}>
            <TextField
              outlined
              blurOnSubmit={true}
              label={'Search'}
              activeLineWidth={1}
              placeholder={'What are you looking for?'}
              onBlur={handleBlur('searchQuery')}
              onChangeText={handleChange.searchQuery()}
              tintColor={'rgba(0,0,0,0.38)'}
              placeholderTextColor={'rgba(0,0,0,0.3)'}
              maxLength={100}
              minLength={2}
              error={errors.searchQuery}
              ref={searchQueryRef}
            />
          </View>
        </View>
        <View style={sharedStyles.searchBoxButtonView}>
          <View style={sharedStyles.searchBoxDivision}>
            <Button
              disabled={
                !searchQuery &&
                !searchFilters.prefecture &&
                !searchFilters.city &&
                !searchFilters.fromDate &&
                !searchFilters.toDate &&
                !searchFilters.category &&
                !searchFilters.condition
              }
              raised={true}
              primary
              text={'Search'}
              icon="search"
              style={{container: sharedStyles.mainButtonContainer}}
              onPress={handleSearchPress}
            />
          </View>
          <View style={sharedStyles.resetButtonView}>
            <Button
              disabled={
                // !searchQuery &&
                // !searchFilters.prefecture &&
                // !searchFilters.city &&
                // !searchFilters.fromDate &&
                // !searchFilters.toDate &&
                // !searchFilters.category &&
                // !searchFilters.condition
                !searchEventFired
              }
              raised={true}
              primary
              text={'Reset'}
              style={{container: sharedStyles.mainButtonContainer}}
              icon="youtube-searched-for"
              onPress={handleResetSearchFilters}
            />
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

SearchBox.propTypes = {
  style: PropTypes.object,
  onSearchPress: PropTypes.func,
  onSearchSuccess: PropTypes.func,
  onSearchError: PropTypes.func,
  searchFilters: PropTypes.object,
  fetchLotteries: PropTypes.func,
  searchEventFired: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    searchFilters: getSearchFiltersSelector(state),
    searchEventFired: getSearchEventFiredSelector(state),
    authUserId: getUserIdSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSearch: payload => dispatch(handleSearch(payload)),
    handleSetSearchFilters: payload => dispatch(setSearchFilters(payload)),
    handleSetSearchEventFired: payload =>
      dispatch(setSearchEventFired(payload)),
    fetchLotteries: payload => dispatch(handleFetchLotteries(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBox);
