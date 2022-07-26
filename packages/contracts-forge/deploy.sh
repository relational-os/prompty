#!/bin/bash
source .env.local

forge script src/scripts/DeployPrompty.s.sol:DeployPrompty --ffi --chain-id $CHAIN_ID --rpc-url $RPC_URL \
  --private-key $DEPLOYER_PRIVATE_KEY --broadcast --verify --etherscan-api-key $ETHERSCAN_API_KEY
