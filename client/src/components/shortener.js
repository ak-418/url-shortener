import React, { useState } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-styled-flexboxgrid';

const Input = styled.input`
	padding: 0px 5px;
  font-size: 1rem;
  display: block;
  width: 100%;
  line-height: 1.5;
  min-height:35px;
  color: #000;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
`;
const Button = styled.button`
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  color: #fff;
  font-size:0.9rem;
  background: #388fc9;
  border: 1px solid #388fc9;
  padding: 0.375rem 0.75rem;
  cursor:pointer;
  border-radius: 0.25rem;
  min-height:35px;
`;

const Wrapper = styled(Row)`
	padding: 3rem;
	box-shadow: 1px 2px 3px 0px #DDDDDD;
	margin: 1rem auto;
	text-align: center;
`;

const Shortener = (props) => {
	const { handleSubmit } = props;
	const [toUrl, setToUrl] = useState(null);

	return (
		<form onSubmit={(e) => { e.preventDefault(); handleSubmit(toUrl) }}>
			<Wrapper style={{ width: "80%" }}>
				<Col xs={9}>
					<Input
						type='url'
						required={true}
						onChange={(e) => setToUrl(e.target.value)}
					/>
				</Col>
				<Col xs={3}>
					<Button
						type='submit'
					>
						Shorten me
					</Button>
				</Col>
			</Wrapper>
		</form>

	);
}

export default Shortener;