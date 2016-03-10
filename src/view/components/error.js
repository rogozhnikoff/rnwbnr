"use strict";

import React, {
		Component,
		Text,
		View
		} from 'react-native';


const $$ = require('../style').create({
	'error': {},
	'error-text': {},
});


class Error extends Component {
	render() {
		const {message} = this.props;

		if(!message) {
			return null
		}
		return (<View style={[$$('error'), this.props.style]}>
			<Text style={$$('error-text')}>{message}</Text>
		</View>)
	}
}

export default Error;