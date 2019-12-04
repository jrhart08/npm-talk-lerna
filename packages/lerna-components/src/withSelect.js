import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import constant from 'lodash/constant';
import noop from 'lodash/noop';
import identity from 'lodash/identity';

export const IdentityRenderer = ({ value }) => value;

/**
 * Provides standard Select functionality, since dropdowns/tiles/choiceboxes
 * all have the same Select behavior.
 */
export default (Component) => {
  const Select = (props) => {
    const handleChange = useCallback((option) => {
      if (props.disabled || props.disableBy(option)) {
        return;
      }

      // only trigger if value changes
      if (option !== props.value) {
        props.onChange(option);
      } else if (props.nullable) {
        props.onChange(undefined);
      }
    });

    return <Component {...props} onChange={handleChange} />;
  };

  Select.propTypes = {
    /** select options (not configurator options) */
    options: PropTypes.array.isRequired,
    value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    onChange: PropTypes.func,
    /** option-level */
    // optionRenderer: PropTypes.func,
    keyBy: PropTypes.func,
    disableBy: PropTypes.func,
    /** component-level */
    disabled: PropTypes.bool,
    nullable: PropTypes.bool,
  };

  Select.defaultProps = {
    value: undefined,
    onChange: noop,
    // optionRenderer: IdentityRenderer,
    keyBy: identity,
    disableBy: constant(false),
    disabled: false,
    nullable: false,
  };

  return Select;
};
