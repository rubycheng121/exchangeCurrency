'use strict'

module.exports = callback => {
	const path = require('path')
	const fs = require('fs')

	const Web3 = require('web3')
	const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

	const exchangerContract_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'Contract', 'build', 'exchangerContract.abi')))
	const exchangerContract_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, '..', '..', 'Contract', 'build', 'exchangerContract.bin')).toString()

	const bankContract_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'Contract', 'build', 'Bank.abi')))
	const bankContract_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, '..', '..', 'Contract', 'build', 'Bank.bin')).toString()

	const exchangerContract = web3.eth.contract(exchangerContract_abi)
	const bankContract = web3.eth.contract(bankContract_abi)

	let exchangerContract_address
	let bankContract_address
	const _rate =80 /* var of type uint256 here */ ;

	exchangerContract.new(
		_rate,
		 {
		from: web3.eth.coinbase,
		gas: '4700000',
		data: exchangerContract_bytecode
	}, (err, exchangerContract) => {
		if (err !== undefined && err !== null)
			console.log(err)
		if (exchangerContract.address !== undefined && exchangerContract.address !== null) {
			exchangerContract_address = exchangerContract.address

					bankContract.new({
						from: web3.eth.coinbase,
						gas: 44444444,
						data: bankContract_bytecode
					}, (err, bankContract) => {
						if (err !== undefined && err !== null)
							console.log(err)
						if (bankContract.address !== undefined && bankContract.address !== null) {
							bankContract_address = bankContract.address

							fs.writeFile(path.resolve(__dirname, '..', 'config.json'), JSON.stringify({
								exchangerContract: {
									address: exchangerContract_address
								},
								bankContract: {
									address: bankContract_address
								}
							}, null, '\t'), err => {
								if (err !== undefined && err !== null) console.log(err)
								else callback()
							})
						}
					})
				}

	})
}
