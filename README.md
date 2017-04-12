# Exchanger


### testrpc

1. 安裝

  ```npm install -g node-gyp```

  ```npm install -g ethereumjs-testrpc```

2. 執行

  ```testrpc -p 8545 -a 100 -l 88888888```

### deploy contract (solcjs@0.4.8)

1. ```cd Contract```
2. ```mkdir build``` (one time)
3. ```cd build_script```
4. ```npm install -g solc@0.4.8 && npm install``` (one time)
5. ```npm run solc && npm run release``` (or ```npm run solc && npm run debug``` for testrpc)

## Unit Test (mocha)
### testing (solcjs@0.4.8)

0. ```testrpc -l 88888888 -p 8545``` or connect to private chain
1. ```cd Contract```
2. ```mkdir build``` (one time)
3. ```cd build_script```
4. ```npm install -g solc@0.4.8 && npm install``` (one time)
5. ```npm run solc``` (if contract has changed)
6. ```cd ../../Test```
7. ```testrpc -p 8546 -l 88888888```
8. ```npm install && npm test```

## Cucumber.js
### start ###

0. ```testrpc -l 88888888 -p 8545``` or connect to private chain
1. npm instll
2. node node_modules/cucumber/bin/cucumber.js 
