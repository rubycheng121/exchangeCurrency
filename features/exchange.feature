Feature: The exchanger contract can correctly exchange "A" country currency to "B" country currency
	As a exchanger contract
	I want to exchange "A" country currency to "B" country currency
	So that I can send the correct amount of the "B" country currency to the Client X

  Scenario: verify the Client X’s exchanging request
    Given I have the rate and rules for exchanging currency between A and B
    When I get the exchanging request
	  Then I should get the result of verify the Client X’s exchanging request
		Then I should decrease the country A’s currency of Client X according the rate
		Then I should increase the country B’s currency of Client X according the rate
