import React, {createRef, useEffect, useState} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import sharedStyles from '../../assets/styles/sharedStyles';
import PropTypes from 'prop-types';
import {Animated} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import {prefectures, cities} from '../../Constants/Countries';
import {importAd, profile} from '../../Constants/Texts';
import {getUserSelector} from '../Profile/Selectors';
import {OutlinedTextField, TextField} from 'react-native-material-textfield';
import {Button} from 'react-native-material-ui';
import {handleSearch} from '../../redux/Search/Search';
import {setSearchFilters} from '../../redux/Search/actions';
import {invoke} from 'lodash';
import {getSearchFiltersSelector} from './Selectors';
import {adStatuses, adCategories} from '../../Constants/Ads';

const SearchBox = props => {
  const {user, searchFilters, style} = props;
  let userOriginalPrefecture = '';
  let userOriginalCity = '';
  let userPrefecture;
  if (user) {
    userOriginalPrefecture = user.prefecture;
    userOriginalCity = user.city;
    userPrefecture = prefectures.Japan.find(
      item => item.kanji === user.prefecture,
    ).name;
  }
  const [cityDropdownData, setCityDropdownData] = useState(
    userPrefecture ? cities[userPrefecture].map(item => ({value: item})) : [],
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
  const statusOnChangeText = value => {
    invoke(props, 'handleSetSearchFilters', {status: value});
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
        if (Date.parse(value) > 0) {
          let fromDate = `${value}`;
          console.log('fromDate: ', fromDate);
          if (fromDate.length === 4 || fromDate.length === 7) {
            fromDate = `${fromDate}/`;
          }
          invoke(props, 'handleSetSearchFilters', {fromDate});
          setErrors({
            ...errors,
            fromDate: false,
          });
        } else {
          setErrors({
            ...errors,
            fromDate: 'From date should be formatted like yyyy/mm/dd',
          });
        }
      };
    },
    toDate: () => {
      return value => {
        if (Date.parse(value) > 0) {
          let toDate = `${value}`;
          console.log('toDate: ', toDate);
          if (toDate.length === 4 || toDate.length === 7) {
            toDate = `${toDate}/`;
          }
          invoke(props, 'handleSetSearchFilters', {toDate});
          setErrors({
            ...errors,
            toDate: false,
          });
        } else {
          setErrors({
            ...errors,
            toDate: 'To date should be formatted like yyyy/mm/dd',
          });
        }
      };
    },
    searchQuery: () => {
      return value => {
        if (value && value.length >= 2 && value.length <= 100) {
          setErrors({
            ...errors,
            searchQuery: false,
          });
        } else {
          setErrors({
            ...errors,
            searchQuery: 'Length should be between 2 and 100 characters.',
          });
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
    invoke(props, 'handleSearch', {
      searchQuery: searchQueryField && searchQueryField.value(),
      onError: props.onSearchError,
      onSuccess: props.onSearchSuccess,
    });
    invoke(props, 'onSearchPress');
  };
  useEffect(() => {
    invoke(props, 'handleSetSearchFilters', {
      city: userOriginalCity,
      prefecture: userOriginalPrefecture,
    });
  }, []);
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
            <Dropdown
              label={importAd.category}
              baseColor={'rgba(0,0,0,0.3)'}
              selectedItemColor={'rgba(0, 0, 0, .87)'}
              data={adCategories}
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
              label={importAd.status}
              selectedItemColor={'rgba(0, 0, 0, .87)'}
              data={adStatuses}
              onChangeText={statusOnChangeText}
              value={searchFilters.status}
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
              placeholder={'yyyy/mm/dd'}
              label={'From'}
              value={searchFilters.fromDate}
              keyboardType="number-pad"
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
              keyboardType="number-pad"
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
          <View style={sharedStyles.searchBoxDivision}>
            <TextField
              outlined
              blurOnSubmit={true}
              label={'Search'}
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
        <View style={sharedStyles.searchBoxButton}>
          <Button
            disabled={errors.fromDate || errors.toDate || errors.searchQuery}
            raised={true}
            primary
            text={'Search'}
            icon="search"
            onPress={handleSearchPress}
          />
        </View>
      </View>
    </Animated.View>
  );
};

SearchBox.propTypes = {
  style: PropTypes.object,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  onSearchPress: PropTypes.func,
  onSearchSuccess: PropTypes.func,
  onSearchError: PropTypes.func,
  searchFilters: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    user: getUserSelector(state),
    searchFilters: getSearchFiltersSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleSearch: payload => dispatch(handleSearch(payload)),
    handleSetSearchFilters: payload => dispatch(setSearchFilters(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBox);
