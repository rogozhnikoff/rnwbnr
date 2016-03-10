const util = {
	hex2rgba: function hex2rgba(hex, opacity) {
		const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$$/i
		hex = hex.replace(shorthandRegex, function (m, r, g, b) {
			return r + r + g + g + b + b;
		})
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$$/i.exec(hex);
		const colors = [
			parseInt(result[1], 16),
			parseInt(result[2], 16),
			parseInt(result[3], 16),
			opacity || 1
		];
		return result ? 'rgba(' + colors.join(', ') + ')' : null
	},
	lighten(col, amt) {
		var usePound = false;

		if (col[0] == "#") {
			col = col.slice(1);
			usePound = true;
		}

		var num = parseInt(col, 16);

		var r = (num >> 16) + amt;

		if (r > 255) r = 255;
		else if (r < 0) r = 0;

		var b = ((num >> 8) & 0x00FF) + amt;

		if (b > 255) b = 255;
		else if (b < 0) b = 0;

		var g = (num & 0x0000FF) + amt;

		if (g > 255) g = 255;
		else if (g < 0) g = 0;

		return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
	},
	darken() {
		util.lighten(col, amt * -1)
	}
};

export default util;