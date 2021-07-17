import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from 'styled-components';

const Wrapper = styled.div`
text-align: center;
margin: 4rem;
font-size: 2rem;
`;

const RedirectHandler = () => {
	const [loading, setLoading] = useState(false);
	const { shortened } = useParams();

	useEffect(() => {
		setLoading(true);
		fetch(`/api/redirections/path/${shortened}`)
			.then(res => {
				if (res.status === 404) {
					setLoading(false);
					return;
				}
				return res.json()
			})
			.then(data => {
				if (data) {
					window.location = data.redirectUrl;
				}
			})
			.catch(err => {
				console.log(err);
				setLoading(false);
			})
	}, [shortened]);

	return (<Wrapper>
		{loading
			? <>
				Redirecting... <i className='fa fa-spinner fa-spin' />
			</>
			:
			`404 | Redirection doesn't exist.`
		}
	</Wrapper>
	);
}

export default RedirectHandler;