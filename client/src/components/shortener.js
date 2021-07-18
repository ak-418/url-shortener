import React, { useState } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-styled-flexboxgrid';
import { Link } from 'react-router-dom';

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
	box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
	margin: 1rem auto;
	text-align: center;
	width: 80%;
`;

const Shortener = (props) => {
	const { handleSubmit, loading, created, reset } = props;
	const [toUrl, setToUrl] = useState(null);

	return (
		<form onSubmit={(e) => { e.preventDefault(); handleSubmit(toUrl) }} id='form'>
			<Wrapper >
				{created ? <>
					<Col id={'success-msg'} xs={12}>Shortened URL created!
						<p>Access it at <Link to={`${created.from}`}>https://{window.location.host}/{created.from}</Link></p></Col>
					<Col xs={12}>
						<Button
							type='button'
							disabled={loading}
							onClick={reset}
							style={{ marginTop: '1rem' }}
						>
							Create another
						</Button>
					</Col>
				</>
					: <>
						<Col xs={9}>
							<Input
								id='url'
								type='url'
								placeholder="Enter the URL to be shortened"
								required={true}
								onChange={(e) => setToUrl(e.target.value)}
							/>
						</Col>
						<Col xs={3}>
							<Button
								id='button'
								type='submit'
								disabled={loading}
							>
								{loading ? <i className='fa fa-spinner fa-spin' /> : 'Shorten URL'}
							</Button>
						</Col>
					</>
				}

			</Wrapper>
		</form>

	);
}

export default Shortener;