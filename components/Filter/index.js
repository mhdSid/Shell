import React, {createRef} from 'react';
import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';
import {OutlinedTextField} from 'react-native-material-textfield';
import {filter as filterTexts} from '../../constants/Texts';
import {View} from 'react-native';
import styles from './filter.style';

const Filter = props => {
  const {lang} = props;
  const filterTextfieldRef = createRef();
  const handleChange = value => {
    if (!value) {
      filterTextfieldRef.current.blur();
    }
    invoke(props, 'onFilterChange', value);
  };

  return (
    <View style={styles.filterViewContainer}>
      <OutlinedTextField
        blurOnSubmit={true}
        label={filterTexts[lang].filterLabel}
        tintColor={'rgba(0,0,0,0.3)'}
        baseColor="rgba(0, 0, 0, 0.3)"
        onChangeText={handleChange}
        placeholderTextColor={'rgba(0,0,0,0.3)'}
        activeLineWidth={0.5}
        disabledLineWidth={0.5}
        ref={filterTextfieldRef}
      />
    </View>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func,
  lang: PropTypes.string,
};

export default Filter;
