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
	Type	string `json:"objectType"`
	ID 		string `json:"id"`
}

type BuildingInfoList struct {
	BuildingInfoList	[]BuildingInfo 	`json:"buildingInfoList"`
}

type BuildingInfo struct {
	Type string `json:"objectType"`
	ID	string	`json:"id"`
	BuildingName string `json:"name"`
	BuildingNumber string `json:"number"`
	BuildingAddress string `json:"address"`
	SubstantialCompletion string `json:"substantialCompletion"`
	GreenBuildingCertificate string `json:"greenBuildingCertificate"`
}

type ResultStatus struct {
	Status 	string  `json:"status"`
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

func (s *SmartContract) CreateMrvByTransient(ctx contractapi.TransactionContextInterface) (*Mrv, error) {

	transientMap, err := ctx.GetStub().GetTransient();
	if err != nil {
		return nil, fmt.Errorf("error getting transient: %v", err)
	}

	transientAssetJSON, ok := transientMap["createMrv"]
	if !ok {
		//log error to stdout
		return nil, fmt.Errorf("asset not found in the transient map input")
	}

	var mrvInput Mrv
	err = json.Unmarshal(transientAssetJSON, &mrvInput)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal JSON: %v", err)
	}

	err = ctx.GetStub().PutState(mrvInput.ID, transientAssetJSON)
	if err != nil {
		return nil, fmt.Errorf("failed to put asset: %v", err)
	}

	return &mrvInput, nil
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

func (s *SmartContract) CreateBuildingInfoByTransient(ctx contractapi.TransactionContextInterface) (*BuildingInfo, error) {

	transientMap, err := ctx.GetStub().GetTransient();
	if err != nil {
		return nil, fmt.Errorf("error getting transient: %v", err)
	}

	transientAssetJSON, ok := transientMap["createBuildingInfo"]
	if !ok {
		//log error to stdout
		return nil, fmt.Errorf("asset not found in the transient map input")
	}

	var buildingInfoInput BuildingInfo
	err = json.Unmarshal(transientAssetJSON, &buildingInfoInput)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal JSON: %v", err)
	}

	err = ctx.GetStub().PutState(buildingInfoInput.ID, transientAssetJSON)
	if err != nil {
		return nil, fmt.Errorf("failed to put asset: %v", err)
	}

	buildingInfoListJSON, err := ctx.GetStub().GetState("buildingInfoList")
	if err != nil {
		return nil, fmt.Errorf("failed to get buildingInfoList: %v", err)
	}

	var buildingInfoList BuildingInfoList
	err = json.Unmarshal(buildingInfoListJSON, &buildingInfoInput)
	buildingInfoList.BuildingInfoList = append(buildingInfoList.BuildingInfoList, buildingInfoInput)

	appenedBuildingInfoList, err := json.Marshal(buildingInfoList)
	ctx.GetStub().PutState("buildingInfoList", appenedBuildingInfoList)

	return &buildingInfoInput, nil
}

func (s *SmartContract) GetBuildingInfo(ctx contractapi.TransactionContextInterface, id string) (*BuildingInfo, error) {

	buildingInfoJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if buildingInfoJSON == nil {
		return nil, fmt.Errorf("the asset %s does not exist", id)
	}

	var buildingInfo BuildingInfo
	err = json.Unmarshal(buildingInfoJSON, &buildingInfo)
	if err != nil {
		return nil, err
	}

	return &buildingInfo, nil
}

func (s *SmartContract) GetBuildingInfoList(ctx contractapi.TransactionContextInterface) (*BuildingInfoList, error) {

	buildingInfoListJSON, err := ctx.GetStub().GetState("buildingInfoList")
	if err != nil {
		return nil, fmt.Errorf("failed to get buildingInfoList: %v", err)
	}

	var buildingInfoList BuildingInfoList
	err = json.Unmarshal(buildingInfoListJSON, &buildingInfoList)
	if err != nil {
		return nil, err
	}

	return &buildingInfoList, nil


}