import styled, { css } from 'styled-components';
import * as col from '../colors';

export const ChoiceDescription = styled.div`
  display: table-caption;
  justify-content: center;
  line-height: 20px;
  caption-side: bottom;
  height:40px;
`;
export const ChoiceDescriptionLabel = styled.div`
    position: relative;
    top: 50%;
    transform: translateY(-50%);
`;
export const ChoiceBorder = styled.div`
  border: 1px solid ${col.celesteApprox};
  margin: 0 10px 10px 0;
  padding: 4px;

  ${props => props.selected && css`
    padding: 3px;
    border: 2px solid ${col.blazeOrangeApprox};

    ${ChoiceDescription} {
      color: ${col.thdOrange} !important;
      a {
        color: ${col.thdOrange} !important;
      }
    }
  `}
`;

export const BoxChoice = styled.div`
  display: table;
  padding: 5px;
  margin-bottom: 10px;
  margin-right: 10px;
  cursor: pointer;
  text-align: center;

  &:last-of-type {
    margin-right: 0px;
  }
`;

export const ChoiceImage = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  margin: 5px 0px;

  img {
    margin: auto;
  }

  svg {
    margin: 0 auto;

    .selectable {
      fill: ${col.blazeOrangeApprox};
    }
  }
`;
