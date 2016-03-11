import {map, clone} from 'lodash';

const log = () => {
	console.log(map(arguments, (a) => clone(a)))
};

export default log;