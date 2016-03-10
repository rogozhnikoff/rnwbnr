// todo: make delaying, for demonstrating statuses

const __baseurl = "http://my.staging.demio.com/rest/testing";
import {clone} from 'lodash'

export default {
	get(uri) {
		console.log("[API:GET] START", clone({uri}));
		return fetch(__baseurl + uri)
				.then((res) => {
					console.log('[API:GET] END', clone({uri}), clone(res))
					return res.json()
				});
	},
	post(uri, data) {
		console.log("[API:POST] START", clone({uri, data}));
		return fetch(__baseurl + uri, {
			method: "post",
			headers: {
				"Content-type": "application/x-www-form-urlencoded"
			},
			body: JSON.stringify(data)
		}).then((res) => {
			console.log("[API:POST] END", clone({uri, data}), clone(res));
			return res.json()
		})
	}
}