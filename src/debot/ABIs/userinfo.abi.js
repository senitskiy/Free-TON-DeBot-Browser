const USERINFO_ABI = {
	"ABI version": 2,
	"header": ["time"],
	"functions": [
		{
			"name": "getAccount",
			"inputs": [
				{"name":"answerId","type":"uint32"}
			],
			"outputs": [
				{"name":"value","type":"address"}
			]
		},
		{
			"name": "getPublicKey",
			"inputs": [
				{"name":"answerId","type":"uint32"}
			],
			"outputs": [
				{"name":"value","type":"uint256"}
			]
		}
	],
	"data": [
	],
	"events": [
	]
};

export default USERINFO_ABI;
