import React, {createRef} from 'react';
import invoke from 'lodash/invoke';
import PropTypes from 'prop-types';
import {OutlinedTextField} from 'react-native-material-textfield';

const Filter = props => {
  const filterTextfieldRef = createRef();
  const handleChange = value => {
    if (!value) {
      filterTextfieldRef.current.blur();
    }
    invoke(props, 'onFilterChange', value);
  };

  return (
    <OutlinedTextField
      blurOnSubmit={true}
      // outlined
      label={'Search'}
      tintColor={'rgba(0,0,0,0.3)'}
      baseColor="rgba(0, 0, 0, 0.3)"
      onChangeText={handleChange}
      placeholderTextColor={'rgba(0,0,0,0.3)'}
      activeLineWidth={0.5}
      disabledLineWidth={0.5}
      ref={filterTextfieldRef}
    />
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func,
};

export default Filter;
