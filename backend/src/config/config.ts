export const PORT = 8080;
export const environment = {
	development: {
		serverURL: `http://localhost:${PORT}/`,
		dbString: 'mongodb://localhost:27017/movsearch'
	},
	production: {
		serverURL: `http://localhost:${PORT}/`,
		dbString: 'mongodb://localhost:27017/8070-movsearch'
	}
};
