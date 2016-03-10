"use strict";

import React, {
		Component,
		StyleSheet,
		Text,
		View,
		Dimensions
		} from 'react-native';

const {width, height} = Dimensions.get('window');

// stream need codecs h264 and audio mp4a(aac)
import Video from 'react-native-video';



class Viewer extends Component {
	loadStart() {
		console.log('loadStart', arguments)
	}

	setDuration() {
		console.log('setDuration', arguments)
	}

	setTime() {
		console.log('setTime', arguments)
	}

	onEnd() {
		console.log('onEnd', arguments)
	}

	videoError() {
		console.log('videoError', arguments)
	}

	render() {
		const {uri, streaming, message, style} = this.props;

		//const overlay = streaming ? null : (<View style={$$('viewer-overlay')}>
		//	<Text>{message}</Text>
		//</View>);
		//	{overlay}

		return (<View style={[$$('viewer'), style]}>
			<Video
					source={{uri}}
					style={$$('viewer-video')}
					rate={1.0}                   // 0 is paused, 1 is normal.
					volume={1.0}                 // 0 is muted, 1 is normal.
					muted={false}                // Mutes the audio entirely.
					paused={false}               // Pauses playback entirely.

					repeat={false}                // Repeat forever.
					onLoadStart={this.loadStart} // Callback when video starts to load
					onLoad={this.setDuration}    // Callback when video loads
					onProgress={this.setTime}    // Callback every ~250ms with currentTime
					onEnd={this.onEnd}           // Callback when playback finishes
					onError={this.videoError}    // Callback when video cannot be loaded
			/>
		</View>)
	}
}
//resizeMode="cover"           // Fill the whole screen at aspect ratio.
const $$ = require('../style').create({
	'viewer': {
		alignItems: 'center',
		paddingTop: 3
	},
	'viewer-video': {
		flex: 1,
		height: 100,
		width: 200,
	},
	'viewer-overlay': {
		position: 'absolute',
		top: 0, left: 0, right: 0, bottom: 0
	},
})

module.exports = Viewer