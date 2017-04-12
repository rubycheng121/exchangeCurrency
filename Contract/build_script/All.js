'use strict'

const path = require('path')
const fs = require('fs')

const exchangerContract_build = require('./exchangerContract.js')

const bankContract_build = require('./bank.js')

// "release" or "debug"
const mode = "debug"

const result = {}

exchangerContract_build(mode)
	.then(exchangerContract_address => {
		result.exchangerContract = {
			address: exchangerContract_address
		}
	})
bankContract_build(mode)
		.then(bankContract_address => {
			result.bankContract = {
				address: bankContract_address
			}



		// load coinbase
		const config = require('./config.json')
		const provider = config[mode].provider
		const Web3 = require('web3')
		const web3 = new Web3(new Web3.providers.HttpProvider(provider))
		result.coinbase = web3.eth.coinbase
		result.provider = provider

		// in build dir
		fs.writeFileSync(path.resolve(__dirname, '../../script/', 'deployResult', 'result.json'), JSON.stringify(result, null, 4))
		// for frontend address
		const address_str = `var exchangerContract_ADDRESS = '${result.exchangerContract.address}';
		var bankContract_address = '${result.bankContract.address}';`
		fs.writeFileSync(path.resolve(__dirname, '../../script/', 'deployResult', 'address.js'), address_str)

		// for frontend abi
		const exchangerContract_abi = fs.readFileSync(path.resolve(__dirname, '..', 'build', 'exchangerContract.abi'))

		const abi_str = `var exchangerContract_abi = ${exchangerContract_abi};`
		fs.writeFileSync(path.resolve(__dirname, '../../script/', 'deployResult', 'abi.js'), abi_str)

		console.log('all good')
	})
	.catch(err => console.log(err))
