module.exports = {
	networks: {
		// default
		development: {
			 host: "localhost",
			 port: 7545,
			 network_id: 5777,
		},
        ropsten: {
			host: "127.0.0.1",
			port: 8545,
			network_id: 3,
			gas: 4700000
        },
	}
};