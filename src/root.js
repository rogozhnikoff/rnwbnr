"use strict";

import React, {
		AppRegistry,
		Component,
		StyleSheet,
		Text,
		View,
		StatusBarIOS
		} from 'react-native';

import Viewer from './view/components/viewer';
import Chat from './view/components/chat';
import moment from 'moment';

import ErrorView from './view/components/error';
import {$$} from './view/style'
import {
		pick, assign, map, uniqueId, reject
		} from 'lodash'
import API from './core/api';


StatusBarIOS.setStyle(1);

const richMessages = (m) => assign({}, m, {status: 'saved'}); // adding, deleting, saved

class Root extends Component {
	/* todo: move console.logic to redux */
	constructor(props) {
		super(props);

		this.state = initialState;
	}

	componentDidMount() {
		this.downloadMessages();
		// dirty: refresh messages
		//setInterval(() => {
		//	if (!this.state.messages.inProcess) this.downloadMessages()
		//}, 5000);
	}

	/** ACTIONS */
	downloadMessages() {
		console.log('root::downloadMessages', arguments);

		this.setState({
			messages: assign({}, this.state.messages, {
				inProcess: true
			})
		});

		API.get('/get-list')
				.then((res) => {
					this.setState({
						serverDate: res.headers.get('date').slice(0, -4)
					});
					return res.json()
				})
				.then((res) => this.setState({
					messages: assign({}, this.state.messages, {
						inProcess: false,
						list: map(res, richMessages)
					})
				}))
				.catch(() => console.error('downloadMessages', arguments))
	}

	addMessage(text) {
		console.log('root::addMessage', arguments);

		const _randomId = uniqueId('message_');
		const newMessage = {
			id: _randomId,
			message: text,
			created_at: null,
			status: 'adding'
		};

		this.setState({
			messages: assign({}, this.state.messages, {
				inProcess: true,
				list: this.state.messages.list.concat(newMessage)
			})
		});

		API.post('/save', {message: newMessage.message})
				.then((res) => {
					this.setState({
						serverDate: res.headers.get('date').slice(0, -4)
					});
					return res.json()
				})
				.then((res) => {
					const list = map(this.state.messages.list, (m) => {
						if (m.id === _randomId) {
							return assign({}, res.data, {
								status: res.success ? 'saved' : 'error'
							})
						}
						return m;
					});

					this.setState({
						messages: assign({}, this.state.messages, {
							inProcess: false,
							list
						})
					})
				})
				.catch(() => console.error('addMessage', arguments))
	}

	removeMessage(removeId) {
		console.log('root::removeMessage', arguments);

		this.setState({
			messages: assign({}, this.state.messages, {
				inProcess: true,
				list: this.state.messages.list.map((m) => {
					if (m.id === removeId) {
						return assign({}, m, {
							status: 'deleting'
						})
					}
					return m;
				})
			})
		});

		API.post('/delete', {id: removeId})
				.then((res) => {
					this.setState({
						serverDate: res.headers.get('date').slice(0, -4)
					});
					return res.json()
				})
				.then((res) => {
					const list = (() => {
						if (res.success) {
							return reject(this.state.messages.list, (m) => m.id === removeId);
						} else {
							return map(this.state.messages.list, (m) => {
								if (m.id === removeId) {
									return assign({}, m, {
										status: 'error'
									})
								}
								return m;
							});
						}
					})();

					this.setState({
						messages: assign({}, this.state.messages, {
							inProcess: false,
							list
						})
					})
				})
				.catch(() => console.error('removeMessage', arguments))
	}

	/** END: ACTIONS */

	render() {
		const {messages, stream, appError, serverDate} = this.state;

		return (
				<View style={$$('container')}>
					<View style={$$('container-line')} />
					<ErrorView message={appError} />
					<Viewer {...stream} />
					<Chat messages={messages.list} serverDate={serverDate} inProcess={messages.inProcess}
							onMessageSubmit={this.addMessage.bind(this)} onMessageDelete={this.removeMessage.bind(this)} />
				</View>
		);
	}
}


const initialState = {
	serverDate: (new Date()),
	stream: {
		uri: 'http://vevoplaylist-live.hls.adaptive.level3.net/vevo/ch1/appleman.m3u8',
		streaming: false,
		message: 'Stream starting...',
	},
	appError: null,
	messages: {
		inProcess: false,
		list: [],
	},
};

export default Root;