import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import identity from 'lodash/identity';
import ChoiceBoxSection from '../ChoiceBoxSection';
import ChoiceBox from '../ChoiceBox';
import withSelect from '../withSelect';

const ChoiceBoxSelect = ({
  value,
  renderer,
  optionRenderer,
  options,
  keyBy,
  labelBy,
  imageBy,
  onChange,
  hrefBy,
  indexable,
  ...rest
}) => {
  const OptionRenderer = renderer || optionRenderer;

  const selectOptions = options.map((option) => {
    // common props
    const choiceBoxProps = {
      key: keyBy(option),
      selected: value === option,
      onClick: () => onChange(option),
      href: hrefBy(option),
      indexable,
    };

    if (OptionRenderer) {
      return (
        <ChoiceBox {...choiceBoxProps}>
          <OptionRenderer value={option} />
        </ChoiceBox>
      );
    }
    return (
      <ChoiceBox
        {...choiceBoxProps}
        label={labelBy(option)}
        imageSrc={imageBy(option)}
      />
    );
  });

  return (
    <ChoiceBoxSection {...rest}>
      {selectOptions}
    </ChoiceBoxSection>
  );
};

/* eslint-disable react/forbid-prop-types */
ChoiceBoxSelect.propTypes = {
  // select options (not configurator options)
  options: PropTypes.array.isRequired,
  value: PropTypes.any,
  // option => option.keyProp
  keyBy: PropTypes.func,
  // developer can supply either:
  // (a) a custom renderer (renderer or optionRenderer)
  // (b) labelBy and imageBy selectors
  labelBy: PropTypes.func,
  imageBy: PropTypes.func,
  renderer: PropTypes.func,
  optionRenderer: PropTypes.func,
  onChange: PropTypes.func,
  disabled: PropTypes.bool, // TODO implement UI for ChoiceBoxSelect.disabled
  nullable: PropTypes.bool,
  hrefBy: PropTypes.func,
  indexable: PropTypes.bool,
};

ChoiceBoxSelect.defaultProps = {
  value: undefined,
  // supply either (a) a renderer or (b) `labelBy` and `imageBy` props
  renderer: null, // synonymous with `optionRenderer` but kept for consistency with `ThdSelect`
  optionRenderer: null,
  labelBy: identity,
  imageBy: identity,
  keyBy: identity,
  onChange: noop,
  disabled: false,
  nullable: false,
  hrefBy: noop,
  indexable: false,
};

export default withSelect(ChoiceBoxSelect);
