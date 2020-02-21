import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Picto from './Picto';

const Icon = ({name, url, title}) => {

  return (
    <Container>
      {(url !== '') ? (
        <a href={url} title={title}>
          <Picto icon={name} />
        </a>
        ):(
        <Picto icon={name} />
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #EEEEEE;
  border-radius: 10px;
  cursor: pointer;
  margin: 0px;

  &:hover {
    background-color: #EDE7F6;
  }

  img {
    border-radius: 5px;
  }

  @media (max-width: 1224px) {
    width: 40px;
    height: 40px;
    margin: 5px;
  }
;`

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  url: PropTypes.string,
};

Icon.defaultProps = {
  title: '',
  url: '',
};
 
export default Icon;