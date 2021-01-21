package chaincode

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing an Mrv
type SmartContract struct {
	contractapi.Contract
}

// Mrv data
type Mrv struct {
	ID string `json:"ID"`
}

// CreateMrv issue MRV data
func (s *SmartContract) CreateMrv(ctx contractapi.TransactionContextInterface, id string) error {

	mrv := Mrv{
		ID: id,
	}

	mrvJSON, err := json.Marshal(mrv)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(id, mrvJSON)
}

// GetMrv returns MRV data
func (s *SmartContract) GetMrv(ctx contractapi.TransactionContextInterface, id string) (*Mrv, error) {

	mrvJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if mrvJSON == nil {
		return nil, fmt.Errorf("the asset %s does not exist", id)
	}

	var mrv Mrv
	err = json.Unmarshal(mrvJSON, &mrv)
	if err != nil {
		return nil, err
	}

	return &mrv, nil
}
