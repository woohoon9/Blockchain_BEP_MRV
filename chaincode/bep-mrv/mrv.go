package main

import (
	"log"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
	"github.com/woohoon9/Blockchain_BEP_MRV/chaincode/bep-mrv/chaincode"
)

func main() {
	mrvChaincode, err := contractapi.NewChaincode(&chaincode.SmartContract{})
	if err != nil {
		log.Panicf("Error creating bep-mrv chaincode: %v", err)
	}

	if err := mrvChaincode.Start(); err != nil {
		log.Panicf("Error starting bep-mrv chaincode: %v", err)
	}
}
