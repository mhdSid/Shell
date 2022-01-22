import React, {createRef, useState} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import styles from './searchBox.style';
import PropTypes from 'prop-types';
import {Animated} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import {prefectures, cities} from '../../constants/Countries';
import {
  importLottery,
  profile,
  validationMessages,
  searchBox as searchBoxTexts,
} from '../../constants/Texts';
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
} from '../../constants/Lotteries';
import {handleFetchLotteries} from '../../redux/Home/FetchLotteries';
import {getUserIdSelector} from '../Profile/Selectors';
import {getLangSelector} from '../Settings/Selectors';
import {resetHomeLotteries, setPageToken} from '../../redux/Home/actions';

const SearchBox = props => {
  const {searchFilters, style, searchEventFired, lang} = props;
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
        invoke(props, 'handleSetSearchFilters', {fromDate: value});
        if (value) {
          if (Date.parse(value) > 0) {
            const {current: toDateField} = toDateRef;
            const fromDate = new Date(value).getTime();
            const toDate = toDateField.value()
              ? new Date(toDateField.value()).getTime()
              : null;
            if (toDate && toDate <= fromDate) {
              setErrors({
                ...errors,
                fromDate: validationMessages[lang].search.fromDateLessThanToDate,
              });
            } else {
              setErrors({
                ...errors,
                fromDate: false,
                toDate: toDate ? false : errors.toDate,
              });
            }
          } else {
            setErrors({
              ...errors,
              fromDate: validationMessages[lang].search.fromDate,
            });
          }
        }
      };
    },
    toDate: () => {
      return value => {
        invoke(props, 'handleSetSearchFilters', {toDate: value});
        if (value) {
          if (Date.parse(value) > 0) {
            const {current: fromDateField} = fromDateRef;
            const toDate = new Date(value).getTime();
            const fromDate = fromDateField.value()
              ? new Date(fromDateField.value()).getTime()
              : null;
            if (fromDate && fromDate >= toDate) {
              setErrors({
                ...errors,
                toDate: validationMessages[lang].search.toDateGreaterThanFromDate,
              });
            } else {
              setErrors({
                ...errors,
                toDate: false,
                fromDate: fromDate ? false : errors.fromDate,
              });
            }
          } else {
            setErrors({
              ...errors,
              toDate: validationMessages[lang].search.toDate,
            });
          }
        }
      };
    },
    searchQuery: () => {
      return value => {
        invoke(props, 'handleSetSearchFilters', {searchText: value});
        if (value) {
          if (value.length >= 2 && value.length <= 100) {
            setErrors({
              ...errors,
              searchQuery: false,
            });
          } else {
            setErrors({
              ...errors,
              searchQuery: validationMessages[lang].search.searchQuery,
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
    invoke(props, 'handleSetPageToken', null);
    invoke(props, 'handleSearch', {
      onError: props.onSearchError,
      onSuccess: props.onSearchSuccess,
    });
    invoke(props, 'handleSetSearchEventFired', true);
    invoke(props, 'onSearchPress');
  };
  const handleResetSearchFilters = () => {
    invoke(props, 'handleSetSearchFilters', {
      searchText: '',
      city: '',
      prefecture: '',
      category: '',
      condition: '',
      fromDate: '',
      toDate: '',
    });
    invoke(props, 'handleResetHomeLotteries', []);
    invoke(props, 'handleSetPageToken', null);
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
  return (
    <Animated.View style={[styles.searchBoxAnimatedViewContainer, {...style}]}>
      <View style={styles.searchBoxOverlayViewContainer} />
      <View style={[styles.searchBoxInnerViewContainer]}>
        <View style={styles.searchBoxSectionBlockContainer}>
          <View
            style={[
              styles.searchBoxSectionBlockDivision,
              styles.searchBoxSectionBlockDivisionMarginRight,
            ]}>
            <Dropdown
              label={profile[lang].prefecture}
              data={prefecturesDropdownData}
              onChangeText={prefectureOnChangeText}
              selectedItemColor={'rgba(0, 0, 0, .87)'}
              baseColor={'rgba(0,0,0,0.3)'}
              value={searchFilters.prefecture}
            />
          </View>
          <View
            style={[
              styles.searchBoxSectionBlockDivision,
              styles.searchBoxSectionBlockDivisionMarginLeft,
            ]}>
            <Dropdown
              label={profile[lang].city}
              data={cityDropdownData}
              onChangeText={cityOnChangeText}
              selectedItemColor={'rgba(0, 0, 0, .87)'}
              baseColor={'rgba(0,0,0,0.3)'}
              value={searchFilters.city}
            />
          </View>
        </View>
        <View style={styles.searchBoxSectionBlockContainer}>
          <View
            style={[
              styles.searchBoxSectionBlockDivision,
              styles.searchBoxSectionBlockDivisionMarginRight,
            ]}>
            <TextField
              blurOnSubmit={true}
              outlined
              autoCapitalize={false}
              autoCorrect={false}
              returnKeyType="done"
              activeLineWidth={1}
              placeholder={searchBoxTexts[lang].fromDatePlaceholder}
              label={searchBoxTexts[lang].fromDateLabel}
              value={searchFilters.fromDate}
              onSubmitEditing={handleSearchPress}
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
              styles.searchBoxSectionBlockDivision,
              styles.searchBoxSectionBlockDivisionMarginLeft,
            ]}>
            <TextField
              outlined
              autoCapitalize={false}
              autoCorrect={false}
              placeholder={searchBoxTexts[lang].toDatePlaceholder}
              label={searchBoxTexts[lang].toDateLabel}
              returnKeyType="done"
              onSubmitEditing={handleSearchPress}
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
        <View style={styles.searchBoxSectionBlockContainer}>
          <View
            style={[
              styles.searchBoxSectionBlockDivision,
              styles.searchBoxSectionBlockDivisionMarginRight,
            ]}>
            <Dropdown
              label={importLottery[lang].category}
              baseColor={'rgba(0,0,0,0.3)'}
              selectedItemColor={'rgba(0, 0, 0, .87)'}
              data={lotteryItemCategories[lang]}
              onChangeText={categoryOnChangeText}
              value={searchFilters.category}
            />
          </View>
          <View
            style={[
              styles.searchBoxSectionBlockDivision,
              styles.searchBoxSectionBlockDivisionMarginLeft,
            ]}>
            <Dropdown
              baseColor={'rgba(0,0,0,0.3)'}
              label={importLottery[lang].condition}
              selectedItemColor={'rgba(0, 0, 0, .87)'}
              data={lotteryItemConditions[lang]}
              onChangeText={conditionOnChangeText}
              value={searchFilters.condition}
            />
          </View>
        </View>
        <View style={styles.searchBoxSectionBlockContainer}>
          <View style={styles.searchBoxSectionBlockDivision}>
            <TextField
              outlined
              autoCapitalize={false}
              autoCorrect={false}
              blurOnSubmit={true}
              label={searchBoxTexts[lang].searchQueryLabel}
              returnKeyType="done"
              activeLineWidth={1}
              placeholder={searchBoxTexts[lang].searchQueryPlaceholder}
              onBlur={handleBlur('searchQuery')}
              onSubmitEditing={handleSearchPress}
              onChangeText={handleChange.searchQuery()}
              tintColor={'rgba(0,0,0,0.38)'}
              placeholderTextColor={'rgba(0,0,0,0.3)'}
              maxLength={100}
              minLength={2}
              value={searchFilters.searchText}
              error={errors.searchQuery}
              ref={searchQueryRef}
            />
          </View>
        </View>
        <View style={styles.searchBoxBottomButtonViewContainer}>
          <View style={styles.searchBoxSectionBlockDivision}>
            <Button
              disabled={
                !searchFilters.searchText &&
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
              style={{container: styles.searchButtonContainer}}
              onPress={handleSearchPress}
            />
          </View>
          <View style={styles.s}>
            <Button
              disabled={!searchEventFired}
              raised={true}
              primary
              text={'Reset'}
              style={{container: styles.searchButtonContainer}}
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
  lang: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    searchFilters: getSearchFiltersSelector(state),
    searchEventFired: getSearchEventFiredSelector(state),
    authUserId: getUserIdSelector(state),
    lang: getLangSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSearch: payload => dispatch(handleSearch(payload)),
    handleSetSearchFilters: payload => dispatch(setSearchFilters(payload)),
    handleSetSearchEventFired: payload =>
      dispatch(setSearchEventFired(payload)),
    fetchLotteries: payload => dispatch(handleFetchLotteries(payload)),
    handleSetPageToken: payload => dispatch(setPageToken(payload)),
    handleResetHomeLotteries: payload => dispatch(resetHomeLotteries(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBox);
