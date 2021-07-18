import React from 'react';
import styled, { css } from 'styled-components';
import { Row, Col } from 'react-styled-flexboxgrid';
import { Link } from 'react-router-dom';
const header = {
  index: 'No.', from: 'Shortened URL', to: 'Target URL', clicks: 'Clicks', createdAt: 'Created at'
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
  ${(props) => props.header ? `word-break: break-word` : `word-break: break-all`}`
  ;

const WrapperDiv = styled.div`
  margin: 3rem auto;
  ${(props) => props.loading && css`
    margin: 5rem;
    text-align: center
  `};
  width: 80%;
`;

const NoResults = styled.div`
  text-align: center;
  font-size: 2rem;
  color: lightblue;
`;

const Listings = (props) => {
  const { data, loading } = props;

  function renderExistingUrls() {
    return data.map((item, index) => renderRow(item, index + 1))
  }

  function renderRow({ from, to, clicks, createdAt }, index) {
    const dateObj = new Date(createdAt);
    return (<StyledRow className={!index ? 'header' : 'entry'} index={index} key={from} header={!index}>
      <StyledCol xs={false} sm={1} header={!index}>
        {!index ? 'No. ' : index}
      </StyledCol>
      <StyledCol xs={4} sm={3} header={!index}>
        {index ? <Link to={from}>
          {from}
        </Link> : from}
      </StyledCol>
      <StyledCol xs={5} sm={4} header={!index}>
        {index ? <a href={to}>
          {to}
        </a> : to}
      </StyledCol>
      <StyledCol xs={3} sm={2} header={!index}>
        {clicks}
      </StyledCol>
      <StyledCol xs={false} sm={2} header={!index}>
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
          </> :
          <NoResults id='empty-result'>No URLs added so far!</NoResults>}
    </WrapperDiv>
  );
}

export default Listings;