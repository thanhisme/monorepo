import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { devtools } from 'valtio/utils';

import './index.css';
import { Router } from './routes';
import { actions, state } from './state';
import { getTokenPayload } from './util';
import { Loader } from './components/Loader';
import { SnackBar } from './components/SnackBar';
import { makeRequest } from './api';

devtools(state, { name: 'app state' });
const App: React.FC = () => {
	const currentState = useSnapshot(state);

	useEffect(() => {
		console.log('App useEffect - check token and send to proper page');

		actions.startLoading();

		const accessToken = localStorage.getItem('accessToken');

		// if there's not access token, we'll be shown the default
		// state.currentPage of AppPage.Welcome
		if (!accessToken) {
			actions.stopLoading();
			return;
		}

		const { exp: tokenExp, pollID } = getTokenPayload(accessToken);
		const currentTimeInSeconds = Date.now() / 1000;

		// Remove old token
		// if token is within 10 seconds, we'll prevent
		// them from connecting (poll will almost be over)
		// since token duration and poll duration are
		// approximately at the same time
		if (tokenExp < currentTimeInSeconds - 10) {
			localStorage.removeItem('accessToken');
			actions.stopLoading();
			return;
		}

		async function checkPoll(accessToken: string) {
			const { data, error } = await makeRequest<{
				poll: any;
			}>(`/polls/${pollID}`);

			if (error) {
				actions.stopLoading();
				return;
			}
			console.log('data', data);
			if (Object.keys(data).length === 0) {
				console.log('in here');
				localStorage.removeItem('accessToken');
				actions.stopLoading();
				return;
			} else {
				console.log('here');
				actions.setPollAccessToken(accessToken); // needed for socket.io connection
				// socket initialization on server sends updated poll to the client
				actions.initializeSocket();
				console.log('tehre');
			}
		}

		checkPoll(accessToken);

		// reconnect to poll
	}, []);

	useEffect(() => {
		console.log('App useEffect - check current participant');
		const myID = currentState.me?.id;

		if (
			myID &&
			currentState.socket?.connected &&
			!currentState.poll?.participants[myID]
		) {
			actions.startOver();
		}
	}, [currentState.poll?.participants]);

	return (
		<>
			<Loader isLoading={currentState.isLoading} color="orange" width={120} />
			{currentState.wsErrors.map((error) => (
				<SnackBar
					key={error.id}
					type="error"
					title={error.type}
					message={error.message}
					show={true}
					onClose={() => actions.removeWsError(error.id)}
					autoCloseDuration={5000}
				/>
			))}
			<Router />
		</>
	);
};

export default App;
