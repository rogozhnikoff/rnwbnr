import {StyleSheet} from 'react-native';
import {map, reduce, assign} from 'lodash'

import util from './util/style'

/* tnx http://tintui.com/ for color tables */
const color = {
	red: '#FF3B30',
	cherry: '#FF2D55',
	blue: '#007AFF',
	aqua: '#34AADC',
	sky: '#5AC8FA',
	green: '#4CD964',
	orange: '#FF9500',
	yellow: '#FFCC00',
	beige: '#D6CEC3',
	indigo: '#5856D6',
	gray: '#8E8E93',
	lightgray: '#C7C7CC',
};

const font = {
	family: {
		//base,
		//sansSerif,
		//serif,
		//cursive
	},
	size: {
		//base,
		//large,
		//small,
	},
	lineHeight: function (fontSize, lh) {
		return fontSize * (lh || 1.6)
	}
};

const THEME = {
	'container': {
		flex: 1,
	},
	'paragraph': {
		marginTop: 2,
		marginBottom: 3,
	},
	'label': {
		backgroundColor: util.lighten(color.blue, 60),
		paddingTop: 2,
		paddingBottom: 2,
		paddingLeft: 5,
		paddingRight: 5,
		borderRadius: (12 + 2 + 2) / 2,
	},
	'label-text': {
		color: 'white',
		fontSize: 12,
	},
	'text-gray': {
		color: color.gray,
	}
};




// todo: catch and console.warn cases when styles by id isn't found
const $$ = function $$(classNames, componentStyles = {}) {
	if (classNames.indexOf(' ') === -1) {
		return componentStyles[classNames] || THEME[classNames];
	}

	return assign.apply(null,
			map(
					classNames.split(/\s+/g),
					(className) => componentStyles[className] || THEME[className]
			)
	);
};

const create = function create(componentStyles) {
	return (classNames) => {
		// todo: memoize for production faster
		return $$(classNames, componentStyles)
	}
};


export default {
	util,
	color,
	font,

	THEME,
	create,
	$$
}