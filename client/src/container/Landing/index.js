import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Listings, Shortener } from '../../components';

const Wrapper = styled.div`

`;
const Landing = () => {
	const [allUrls, setUrls] = useState([]);
	const [loading, setLoading] = useState(false);
	const [created, setCreated] = useState(null);

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
		setLoading(true);
		fetch('/api/redirections/create', options)
			.then(res => res.json())
			.then(data => { setUrls([data, ...allUrls]); setLoading(false); setCreated(data) })
			.catch(err => { console.log(err); setLoading(false) })
	};

	console.log("---here")
	return (<Wrapper>
		<Shortener
			handleSubmit={shortenUrl}
			loading={loading}
			created={created}
			reset={() => setCreated(null)}
		/>
		<Listings
			data={allUrls}
		/>
	</Wrapper>
	);
}

export default Landing;