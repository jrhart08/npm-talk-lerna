import React from 'react';
import PropTypes from 'prop-types';
import constant from 'lodash/constant';
import noop from 'lodash/noop';
import identity from 'lodash/identity';

export const IdentityRenderer = ({ value }) => value;

/**
 * Provides standard Select functionality, since dropdowns/tiles/choiceboxes
 * all have the same Select behavior.
 */
export default Component => class Select extends React.PureComponent {
  static propTypes = {
    /** select options (not configurator options) */
    options: PropTypes.array.isRequired,
    value: PropTypes.any, // eslint-disable-line react/forbid-prop-types
    onChange: PropTypes.func,
    /** option-level */
    // optionRenderer: PropTypes.func,
    keyBy: PropTypes.func,
    disableBy: PropTypes.func,
    compareBy: PropTypes.func,
    /** component-level */
    disabled: PropTypes.bool,
    nullable: PropTypes.bool,
  };

  static defaultProps = {
    value: undefined,
    onChange: noop,
    // optionRenderer: IdentityRenderer,
    keyBy: identity,
    disableBy: constant(false),
    compareBy: (option, value) => option === value,
    disabled: false,
    nullable: false,
  };

  handleChange = (option) => {
    if (this.props.disabled || this.props.disableBy(option)) {
      return;
    }

    // only trigger if value changes
    if (!this.props.compareBy(option, this.props.value)) {
      this.props.onChange(option);
    } else if (this.props.nullable) {
      this.props.onChange(undefined);
    }
  };

  render = () => <Component {...this.props} onChange={this.handleChange} />;
};
