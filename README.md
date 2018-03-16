# Todoeth

> Crypto-economically incentivised todo list

## Setup
- Install the Go implementation of Ethereum, [Geth](https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum)

- Install [Swarm](http://swarm-guide.readthedocs.io/en/latest/installation.html)

- Install project dependencies:
```
npm install
```

## Deploy contracts
Deploy the smart contracts before running the application or tests (you only
need to compile the contracts if their code has changed):
```
# npm run compile
npm run deploy
```

\* Note: the local Ethereum node will need to be running

## Test
Execute the smart contract tests:
```
npm test
```

\* Note: the local Ethereum node and Swarm will need to be running

## Run
- Run the application on a local server:
```
npm start
```

- Run a local Ethereum node:
```
npm run blockchain
```

- Add environment variable for Geth database and keystore directory:
```
export DATADIR=/tmp/BZZ/`date +%s`
```

- Create a new Geth account (you can leave the passphrase empty):
```
geth --datadir $DATADIR account new
# => Address: {5ebca1fb9ac4f534a65851c57b1ba794b28b7677}
export BZZKEY=5ebca1fb9ac4f534a65851c57b1ba794b28b7677
```

- Run Swarm:
```
swarm --bzzaccount $BZZKEY --datadir $DATADIR --ethapi '' --maxpeers 0 --nodiscover --verbosity 5 --corsdomain '*'
```

## Build
Build the application for production:
```
npm run build
```
