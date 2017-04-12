'use strict'

module.exports = mode => {
	const path = require('path')
	const fs = require('fs')

	const config = require('./config.json')

	const provider = config[mode].provider

	const Web3 = require('web3')
	const web3 = new Web3(new Web3.providers.HttpProvider(provider))

	const bank_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'build', 'bank.abi')))
	const bank_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, '..', 'build', 'bank.bin')).toString()

	const bank = web3.eth.contract(bank_abi)

	return (new Promise((res, rej) => {
		const _realBankID =123 /* var of type uint256 here */ ;
		const _exchangeRule =80 /* var of type uint256 here */ ;

		bank.new(
			_realBankID,
			_exchangeRule,
	 {
			from: web3.eth.coinbase,
			gas: '4700000',
			data: bank_bytecode
		}, (err, bank) => {
			if (err) {
				return rej(err)
			}

			if (bank.address !== undefined && bank.address !== null) {
				console.log('bank_ADDRESS', bank.address)
				return res(bank.address)
			}
		})
		console.log('deploey end');
	}))
}
