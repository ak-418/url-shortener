import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Listings, Shortener } from '../../components';

const Wrapper = styled.div`

`;
const Landing = () => {
	const [allUrls, setUrls] = useState([]);

	useEffect(() => {
		fetch('/api/redirections/all')
			.then(res => res.json())
			.then(data => setUrls(data));
	}, []);

	async function shortenUrl(toUrl) {
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ to: toUrl })
		}
		fetch('/api/redirections/create', options)
			.then(res => res.json())
			.then(data => console.log('=data', data))
			.catch(err => { console.log(err) })
	};

	console.log("---here")
	return (<Wrapper>
		<Shortener
			handleSubmit={shortenUrl}
		/>
		<Listings
			data={allUrls}
		/>
	</Wrapper>
	);
}

export default Landing;