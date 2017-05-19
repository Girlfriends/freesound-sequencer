import React from "react";
import SimpleSound from './simpleSound.jsx';
import oauth2 from 'simple-oauth2';

export default class FreesoundSequencer extends React.Component {
	componentDidMoun
	render() {
		const cred = require('../credentials/freesound.json');
		const auth = oauth2.create({
			client: {
				id: cred["client-id"],
				secret: cred["client-secret"]
			},
			auth: {
				tokenHost: 'https://freesound.org/apiv2/oauth2/authorize/'
			}
		});
		return (
			<div>
				<p>{ "Indeed, there is an app here" }</p>
				<SimpleSound src="moose"/>
				<SimpleSound src="cat"/>
				<SimpleSound src="bird"/>
			</div>
		)
	}
}


