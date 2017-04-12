
const path = require('path')
const web3 = require('web3')
const exchangRequest = require(process.cwd() + '/script/model/exchangRequest');
const {defineSupportCode} = require('cucumber');
var assert = require('assert');

defineSupportCode(function({Given, When, Then, And}) {
  //let request=exchangRequest.newRequest();
  Given('I have the rate and rules for exchanging currency between A and B', function () {
    // Write code here that turns the phrase above into concrete actions
    assert.equal(exchangRequest.getContract(), 'exchangerContract', 'exchangerContract should be deploey already. ');

  })

  When('I get the exchanging request', function() {
    assert.equal(exchangRequest.getRequest(), true, 'should getRequest success and return true. ');
  })


  Then('I should get the result of verify the Client X’s exchanging request', function () {
    assert.equal(exchangRequest.getVerifyResult(), true, 'the verify result should be true. ');
  })

  Then('I should decrease the country A’s currency of Client X according the rate', function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback();
  });

  Then('I should increase the country B’s currency of Client X according the rate', function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback();
  });

});
