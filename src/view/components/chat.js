"use strict";

import React, {
		Component,
		StyleSheet,
		Text,
		View,
		ListView,
		TouchableOpacity,
		TextInput
		} from 'react-native';

const DS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

import {
		map
		} from 'lodash'

import moment from 'moment';

class Chat extends Component {
	constructor(props) {
		super(props);

		this.state = {
			field: ''
		}
	}
	onPress() {
		this.setState({
			field: ''
		});
		this.props.onMessageSubmit(this.state.field);
	}

	renderMessage(m, xxx, index) {
		console.log('m.status', m.status);
		var i = parseInt(index),
				bgStyle = i % 2 === 0 ? $$('message-odd') : $$('message-even'),
				statusStyle = $$('message-status-' + m.status);

		return <View style={[$$('message'), bgStyle, statusStyle]} key={m.id}>
			<Text style={$$('message-text')}>{m.message}</Text>
			<Text style={$$('message-date')}>{moment((new Date(m.created_at))).fromNow(true)}</Text>
			<TouchableOpacity style={$$('message-delete')} onPress={() => this.props.onMessageDelete(m.id)}>
				<Text style={$$('message-delete-icon')}>{'x'}</Text>
			</TouchableOpacity>
		</View>
	}

	render() {
		const {style, messages} = this.props;
		const {field} = this.state;
		const dataSource = DS.cloneWithRows(messages);

		console.log('RENDER:CHAT', this.props);

		return (<View style={[$$('chat'), style]}>
			<ListView
					style={$$('list')}
					dataSource={dataSource}
					renderRow={this.renderMessage.bind(this)}
			/>
			<View style={$$('field')}>
				<TextInput style={$$('field-input')} value={field}
						onChangeText={(newField) => this.setState({field: newField})}
						multiline
				/>
				<TouchableOpacity style={$$('field-submit')}>
					<Text style={$$('field-submit-text')} onPress={this.onPress}>{'Send'}</Text>
				</TouchableOpacity>
			</View>
		</View>)
	}
}

import {create, color} from '../style';
const $$ = create({
	'chat': {},
	'list': {},
	'message': {
		backgroundColor: color.lightgray
	},

	'message-status-adding': {
		backgroundColor: color.gray
	},
	'message-status-deleting': {
		backgroundColor: color.pink
	},
	'message-status-saved': {
		backgroundColor: color.green
	},
	'message-status-error': {
		backgroundColor: color.red
	},

	'message-odd': {},
	'message-even': {},
	'message-text': {
		color: 'white'
	},
	'message-date': {},

	'field': {},
	'field-input': {},
	'field-submit': {},
	'field-submit-text': {},

	'message-delete': {},
	'message-delete-icon': {},
});

export default Chat;