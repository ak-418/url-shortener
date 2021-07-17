import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Listings, Shortener } from '../../components';

const Wrapper = styled.div`

`;
const Landing = () => {
	const [allUrls, setUrls] = useState([]);
	const [loading, setLoading] = useState({ fetch: true, create: false });
	const [created, setCreated] = useState(null);

	useEffect(() => {
		fetch('/api/redirections/all')
			.then(res => res.json())
			.then(data => {
				setUrls(data);
				setLoading({ fetch: false, create: false })
			});
	}, []);

	async function shortenUrl(toUrl) {
		const options = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ to: toUrl })
		}
		setLoading({ ...loading, create: true });
		fetch('/api/redirections/create', options)
			.then(res => res.json())
			.then(data => { setUrls([data, ...allUrls]); setLoading({ ...loading, create: false }); setCreated(data) })
			.catch(err => { console.log(err); setLoading({ ...loading, create: false }) })
	};


return (<Wrapper>
		<Shortener
			handleSubmit={shortenUrl}
			loading={loading.create}
			created={created}
			reset={() => setCreated(null)}
		/>
		<Listings
			data={allUrls}
			loading={loading.fetch}
		/>
	</Wrapper>
	);
}

export default Landing;