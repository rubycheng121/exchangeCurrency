'use strict'

module.exports = mode => {
	const path = require('path')
	const fs = require('fs')

	const config = require('./config.json')

	const provider = config[mode].provider

	const Web3 = require('web3')
	const web3 = new Web3(new Web3.providers.HttpProvider(provider))

	const exchangerContract_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'build', 'exchangerContract.abi')))
	const exchangerContract_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, '..', 'build', 'exchangerContract.bin')).toString()

	const exchangerContract = web3.eth.contract(exchangerContract_abi)

	return (new Promise((res, rej) => {
		const _rate =80 /* var of type uint256 here */ ;
		const company1ID =1 /* var of type uint256 here */ ;
		const company1name ='A' /* var of type string here */ ;
		const company2ID =2 /* var of type uint256 here */ ;
		const company2name ='B' /* var of type string here */ ;

		exchangerContract.new(
			_rate
			, {
			from: web3.eth.coinbase,
			gas: '4700000',
			data: exchangerContract_bytecode
		}, (err, exchangerContract) => {
			if (err) {
				return rej(err)
			}

			if (exchangerContract.address !== undefined && exchangerContract.address !== null) {
				console.log('exchangerContract_ADDRESS', exchangerContract.address)
				return res(exchangerContract.address)
			}
		})
		console.log('deploey end');
	}))
}
