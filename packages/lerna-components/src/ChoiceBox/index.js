import React from 'react';
import PropTypes from 'prop-types';
import {
  ChoiceDescription,
  ChoiceDescriptionLabel,
  BoxChoice,
  ChoiceImage,
  ChoiceBorder,
} from './styles';

const ChoiceBox = ({
  imageSrc,
  onClick,
  label,
  selected,
  children,
  ...rest
}) => (
  <ChoiceBorder selected={selected} {...rest}>
    <BoxChoice role="presentation" onClick={onClick}>
      {
        children ||
        <React.Fragment>
          <ChoiceImage>
            <img src={imageSrc} alt={label} />
          </ChoiceImage>
          <ChoiceDescription>
            <ChoiceDescriptionLabel>
              {label}
            </ChoiceDescriptionLabel>
          </ChoiceDescription>
        </React.Fragment>
      }
    </BoxChoice>
  </ChoiceBorder>
);

ChoiceBox.propTypes = {
  onClick: PropTypes.func.isRequired,
  imageSrc: PropTypes.string,
  label: PropTypes.string,
  selected: PropTypes.bool,
  children: PropTypes.node,
  href: PropTypes.string,
  indexable: PropTypes.bool,
};

ChoiceBox.defaultProps = {
  imageSrc: '',
  label: '',
  selected: false,
  children: null,
  href: '',
  indexable: false,
};

export default ChoiceBox;
