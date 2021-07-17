import React from 'react';
import styled, { css } from 'styled-components';
import { Row, Col } from 'react-styled-flexboxgrid';
import { Link } from 'react-router-dom';
const header = {
  index: 'No.', from: 'Shortened URL', to: 'Target URL', clicks: 'Times clicked', createdAt: 'Created at'
}
const StyledRow = styled(Row)`
  padding: 0.7rem 0;
  ${(props) => props.header && css`
    font-weight: bold;
    color: #000;
  `}
  ${(props) => props.index && props.index % 2 !== 0 && css`
     background-color: #f9f9f9;
  `}
`;

const StyledCol = styled(Col)`
  margin: auto;
`;

const WrapperDiv = styled.div`
  margin: 3rem;
  ${(props) => props.loading && css`
    margin: 5rem;
    text-align: center
  `};

`;

const Listings = (props) => {
  const { data, loading } = props;

  function renderExistingUrls() {
    return data.map((item, index) => renderRow(item, index + 1))
  }

  function renderRow({ from, to, clicks, createdAt }, index) {
    const dateObj = new Date(createdAt);
    return (<StyledRow index={index} key={from} header={!index}>
      <StyledCol xs={1}>
        {!index ? 'No. ' : index}
      </StyledCol>
      <StyledCol xs={3}>
        {index ? <Link to={from}>
          {from}
        </Link> : from}
      </StyledCol>
      <StyledCol xs={4}>
        {index ? <a href={to}>
          {to}
        </a> : to}
      </StyledCol>
      <StyledCol xs={2}>
        {clicks}
      </StyledCol>
      <StyledCol xs={2}>
        {index ? `${dateObj.toLocaleDateString('en-IN')},  ${dateObj.toLocaleTimeString('en-US')}`
          : createdAt}
      </StyledCol>
    </StyledRow>)
  };

  return (
    <WrapperDiv loading={loading}>

      {loading ?
        <i className='fa fa-spinner fa-spin' />
        : data && data.length ?
          <>
            {renderRow(header)}
            {renderExistingUrls()}
          </> : 'No URLs added so far!'}
    </WrapperDiv>
  );
}

export default Listings;