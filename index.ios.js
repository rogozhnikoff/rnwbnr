'use strict';

import Root from './src/root';
import {AppRegistry} from 'react-native';
import {map, clone, cloneDeep, toArray, isArguments} from 'lodash';


const __ENV = 'development';
//const __ENV = 'production';

// hack console.log for immutable console print
!function () {
	const _originalLog = console.log;
	console.log = function () {
		if(__ENV === 'production') return;
		return _originalLog.apply(
				console,
				map(
						toArray(arguments),
						(a) => isArguments(a) ? cloneDeep(toArray(a)) : cloneDeep(a)
				)
		)
	};
}();

AppRegistry.registerComponent('rndemio', () => Root);