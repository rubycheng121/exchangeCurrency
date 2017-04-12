'use strict'

const path = require('path')
const fs = require('fs')
const config = require('./config.json')
const assert = require('assert')

const mode = "debug"
const provider = config[mode].provider
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider(provider))
//const projectContract_build = require('./projectContract.js')
const result = {}
const exchangerContract_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../../Contract/build', 'exchangerContract.abi')))
const exchangerContract_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname,'../../Contract/build', 'exchangerContract.bin')).toString()
let exchangerContract = web3.eth.contract(exchangerContract_abi)


module.exports = {
  getContract: function(){
    //do something
    return true
  },
  getRequest: function(){
    //do something
    return true
  },
  getVerifyResult: function(){
    //do something
    return true
  },
  getDeductRewardPointsResult: function(){
    //do something
    return true
  },
  getIncreaseRewardPointsResult: function(){
    //do something
    return true
  },
   test : function( data ){
    // print out the data
    // fs.writeFileSync(path.resolve(__dirname, '..', 'deployResult', 'test.js'), "test")
  }
};
