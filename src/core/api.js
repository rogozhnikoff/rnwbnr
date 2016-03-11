// todo: make delaying, for demonstrating statuses

const __baseurl = "http://my.staging.demio.com/rest/testing";
import {clone, map, keys} from 'lodash'
import LOG from '../util/log';

const param = (hash) => {
	return map(
			hash,
			(v, k) => k + '=' + encodeURIComponent(v)
	).join('&');
};

export default {
	get(uri) {
		LOG("[API:GET] START", clone({uri}));
		return fetch(__baseurl + uri);
	},
	post(uri, data) {
		LOG("[API:POST] START", clone({uri, data}), param(data));
		return fetch(__baseurl + uri, {
			method: "post",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: param(data)
		})
	}
}