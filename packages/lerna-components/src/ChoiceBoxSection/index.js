import styled from 'styled-components';
import { celesteApprox } from '../colors';

export default styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;

  input {
    border: 1px solid ${celesteApprox};
    margin: 7px;
    padding: 0 12px;
    height: 42px;
    width: 70px;
    position: relative;
    font-size: 14px;

    &:first-of-type {
      margin-left: 0px;
    }

    &.error {
      border-bottom: 3px solid red;
    }
  }

  .input-label {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }


  @media (max-width: 767px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;

    .choice {
      width: 83px;
      margin-bottom: 0px;
    }
  }
`;
