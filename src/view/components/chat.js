"use strict";

import React, {
		Component,
		StyleSheet,
		Text,
		View,
		ListView,
		TouchableOpacity,
		TextInput,
		Dimensions
		} from 'react-native';

const {width, height} = Dimensions.get('window');
const DS = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import LOG from '../../util/log';

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
		if(this.state.field === '') {return}
		this.props.onMessageSubmit(this.state.field);
		this.setState({
			field: ''
		});
	}

	renderMessage(m, xxx, index) {
		const i = parseInt(index);
		const {serverDate, onMessageDelete} = this.props;
		const bgStyle = i % 2 === 0 ? $$('message-odd') : $$('message-even');
		const statusStyle = $$('message-status-' + m.status);

		const _date = m.created_at ? moment((new Date(m.created_at))).from((new Date(serverDate))) : null;


		return <View style={[$$('message'), bgStyle, statusStyle]} key={m.id}>
				<View style={$$('message-content')}>
					<Text style={$$('message-text')}>{m.message}</Text>
					<Text style={$$('message-date')}>{_date}</Text>
				</View>
			<TouchableOpacity style={$$('message-delete')} onPress={() => onMessageDelete(m.id)}>
					<View style={$$('message-delete-icon')} />
			</TouchableOpacity>
		</View>
	}

	render() {
		const {style, messages, inProcess} = this.props;
		const {field} = this.state;
		const dataSource = DS.cloneWithRows(messages);

		LOG('RENDER:CHAT', this.props);

		const inProcessComp = inProcess ? <Text style={$$('chat-process')}>interacting with server...</Text> : null;

		return (<View style={[$$('chat'), style]}>
			{inProcessComp}
			<ListView
					style={$$('list')}
					dataSource={dataSource}
					renderRow={this.renderMessage.bind(this)}
			/>
			<View style={$$('field')}>
				<TextInput style={$$('field-input')} value={field}
						onChangeText={(newField) => this.setState({field: newField})}
						onSubmitEditing={this.onPress.bind(this)}
				/>
				<TouchableOpacity style={$$('field-submit')}>
					<Text style={$$('field-submit-text')} onPress={this.onPress.bind(this)}>{'Send'}</Text>
				</TouchableOpacity>
			</View>
		</View>)
	}
}

import {create, color} from '../style';
const $$ = create({
	'chat': {
		paddingTop: 16,
		flex: 1,
	},
	'list': {

	},

	'chat-process': {
		position: 'absolute',
		top: 0, left: 0, right: 0,
		textAlign: 'center',
		fontSize: 12,
		height: 16
	},
	'message': {
		backgroundColor: color.lightgray,
		flex: 1,
		flexDirection: 'row',
		borderTopColor: color.lightgray,
		borderTopWidth: 1,
		borderBottomColor: color.gray,
		borderBottomWidth: 1,
		paddingLeft: 7,
		paddingRight: 7,
		paddingTop: 2,
		paddingBottom: 2,
	},

	'message-status-adding': {
		backgroundColor: color.gray
	},
	'message-status-deleting': {
		backgroundColor: color.indigo
	},
	'message-status-saved': {
		backgroundColor: color.lightgray
	},
	'message-status-error': {
		backgroundColor: color.red
	},

	'message-odd': {},
	'message-even': {},
	'message-content': {
		flex: 9,
	},
	'message-text': {
		//color: 'white'
	},
	'message-date': {
		fontSize: 8,
	},

	'field': {
		alignItems: 'center',
		flexDirection: 'row',
		padding: 7,
		height: 50,
	},
	'field-input': {
		//height: 35,
		flex: 8,
		borderWidth: 1,
		borderColor: color.lightgray,
		borderRadius: 5,
		textAlign: 'center',
	},
	'field-submit': {
		flex: 2,
	},
	'field-submit-text': {
		flex: 1,
		textAlign: 'center',
		color: color.blue,
	},

	'message-delete': {
		flex: 1,
		alignItems: 'center',
		marginTop: 8
	},
	'message-delete-icon': {
		flex: 1,
		backgroundColor: color.red,
		height: 15, width: 15,
		borderRadius: 15/2,
	}
});

export default Chat;