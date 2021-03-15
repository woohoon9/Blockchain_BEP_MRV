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
	Type					string 	`json:"objectType"`
	ID 						string 	`json:"id"`
	Unit					string  `json:"unit"`
	Year					string 	`json:"year"`
	EnergyType				string 	`json:"energyType"`
	Jan 					float64 `json:"jan"`
	Feb 					float64 `json:"feb"`
	Mar 					float64 `json:"mar"`
	Apr 					float64 `json:"apr"`
	May						float64 `json:"may"`
	Jun 					float64 `json:"jun"`
	Jul						float64 `json:"jul"`
	Aug						float64 `json:"aug"`
	Sep 					float64 `json:"sep"`
	Oct 					float64 `json:"oct"`
	Nov 					float64 `json:"nov"`
	Dec 					float64 `json:"dec"`
	Sum						float64 `json:"sum"`
}

type BaselineModel struct {
	Type   					string `json:"objectType"`
	ID     					string `json:"id"`
	ElectricityMMBTU		string `json:"electricityMMBTU"`
	NaturalGasMMBTU			string `json:"naturalGasMMBTU"`
	ChilledWaterMMBTU		string `json:"chilledWaterMMBTU"`
	SteamMMBTU				string `json:"steamMMBTU"`
	ElectricityKWH			string `json:"electricityKWH"`
	NaturalGasSCF			string `json:"naturalGasSCF"`
	ChilledWaterKTON		string `json:"chilledWaterKTON"`
	SteamKLBS				string `json:"steamKLBS"`
	TotalMMBTU				string `json:"totalMMBTU"`
	CoalMMBTU				string `json:"coalMMBTU"`
	GHGNaturalGasMMBTU		string `json:"gHGNaturalGasMMBTU"`
	OilMMBTU				string `json:"oilMMBTU"`
	CoalKG					string `json:"coalKG"`
	NaturalGasKG			string `json:"naturalGasKG"`
	OilKG					string `json:"oilKG"`
	TotalCO2EKG				string `json:"totalCO2EKG"`
	TotalCO2ETON			string `json:"totalCO2ETON"`
}

type BuildingList struct {
	BuildingList 			map[string]BuildingInfo 	`json:"buildingList"`
}

type BuildingInfoList struct {
	BuildingInfoList	[]BuildingInfo 	`json:"buildingInfoList"`
}

type BuildingIDNames struct{
	BuildingIDNames 	[]BuildingIDName 	`json:"buildingList"`
}

type BuildingIDName struct {
	ID 			string `json:"id"`
	Name 		string `json:"name"`
}

type BuildingInfo struct {
	Type 						string `json:"objectType"`
	ID							string `json:"id"`
	BuildingName 				string `json:"name"`
	BuildingNumber 				string `json:"number"`
	BuildingAddress 			string `json:"address"`
	SubstantialCompletion 		string `json:"substantialCompletion"`
	GreenBuildingCertificate 	string `json:"greenBuildingCertificate"`
}

type CCAByOne struct {
	Item						string  `json:"item"`
	Coal						float64 `json:"coal"`
	Natural						float64 `json:"natural"`
	Gas							float64	`json:"gas"`
	Oil							float64 `json:"oil"`
	GHGEmissionsReduction		float64 `json:"ghgEmissionReduction"`
}

type CCAs struct{
	CCAList 		[]CCAByOne		`json:"ccaList"`
}

type ESAByOne struct {
	Item						string  `json:"item"`
	Electricity					float64 `json:"electricity"`
	Natural 					float64 `json:"natural"`
	Gas							float64 `json:"gas"`
	Chilled 					float64	`json:"chilled"`
	Water						float64 `json:"water"`
	Steam						float64 `json:"steam"`
	EnergySavings				float64 `json:"evergySavings"`
}

type ESAs struct{
	ESAList			[]ESAByOne		`json:"esaList"`
}

type ResultStatus struct {
	Status 	string `json:"status"`
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

	mrvInput.Sum = mrvInput.Jan + mrvInput.Feb + mrvInput.Mar + mrvInput.Apr + mrvInput.May + mrvInput.Jun + mrvInput.Jul +mrvInput.Aug + mrvInput.Sep + mrvInput.Oct + mrvInput.Nov + mrvInput.Dec
	var mrvId = mrvInput.ID + "-" + mrvInput.EnergyType + "-" + mrvInput.Unit + "-" + mrvInput.Year

	mrvInputJSON, err := json.Marshal(mrvInput)
	if err != nil {
		return nil, fmt.Errorf("fail to marshal mrv data: %v", err)
	}

	err = ctx.GetStub().PutState(mrvId , mrvInputJSON)
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

	_ , err = s.addBuilding(ctx, buildingInfoInput)
	if err != nil {
		return nil, fmt.Errorf("fail to put building list: %v", err)
	}

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

func (s *SmartContract) CreateBaselineModelByTransient(ctx contractapi.TransactionContextInterface)  (*BaselineModel, error) {

	transientMap, err := ctx.GetStub().GetTransient();
	if err != nil {
		return nil, fmt.Errorf("error getting transient: %v", err)
	}

	transientAssetJSON, ok := transientMap["createBaselineModel"]
	if !ok {
		//log error to stdout
		return nil, fmt.Errorf("asset not found in the transient map input")
	}

	fmt.Println(transientAssetJSON)

	var baselineModelInput BaselineModel
	err = json.Unmarshal(transientAssetJSON, &baselineModelInput)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal JSON: %v", err)
	}

	fmt.Println(transientAssetJSON)
	fmt.Println(baselineModelInput)

	var baselineModelKey = "baselinemodel-" + baselineModelInput.ID

	fmt.Println(baselineModelKey)
	baselineModelJSON, err := ctx.GetStub().GetState(baselineModelKey)
	if err != nil {
		return nil, fmt.Errorf("failed to get baselinemodel: %v", err)
	}

	if len(baselineModelJSON) > 0 {
		return nil, fmt.Errorf("failed to get baselinemodel :: exist")
	}

	err = ctx.GetStub().PutState(baselineModelKey, transientAssetJSON)
	if err != nil {
		return nil, fmt.Errorf("failed to put asset: %v", err)
	}

	return &baselineModelInput, nil
}


func (s *SmartContract) GetBaselineModel(ctx contractapi.TransactionContextInterface, buildingID string)  (*BaselineModel, error) {

	var baselineModelKey = "baselinemodel-" + buildingID
	baselineModelJSON, err := ctx.GetStub().GetState(baselineModelKey)
	if err != nil {
		return nil, fmt.Errorf("failed to get baselinemodel: %v", err)
	}

	var baselineModel BaselineModel
	err = json.Unmarshal(baselineModelJSON, &baselineModel)
	if err != nil {
		return nil, fmt.Errorf("failed to unmarshal JSON: %v", err)
	}

	return &baselineModel, nil
}

// Get Building Info
func (s *SmartContract) addBuilding(ctx contractapi.TransactionContextInterface, buildingInfo BuildingInfo) (*BuildingList, error) {

	var buildingList BuildingList

	buildingListJSON, err := ctx.GetStub().GetState("buildingList")
	if err != nil {
		return nil, fmt.Errorf("failed to get buildingInfo: %v", err)
	}

	if len(buildingListJSON) == 0 {

		buildingList = BuildingList{}
		bList := make(map[string]BuildingInfo)
		buildingList.BuildingList = bList
	}else{
		err = json.Unmarshal(buildingListJSON, &buildingList)
		if err != nil{
			return nil, fmt.Errorf("fail to get building info: %v", err)
		}
	}

	_ , ok := buildingList.BuildingList[buildingInfo.ID]
	if ok {
		return nil, fmt.Errorf("failed to add building info :: Building info exist")
	}

	buildingList.BuildingList[buildingInfo.ID] = buildingInfo
	addedBuildingListJSON, err := json.Marshal(buildingList)
	if err != nil {
		return nil, fmt.Errorf("failed to put buildingInfo: %v", err)
	}

	ctx.GetStub().PutState("buildingList", addedBuildingListJSON)

	return &buildingList, nil

}

func (s *SmartContract) GetBuildingList(ctx contractapi.TransactionContextInterface) (*BuildingIDNames, error) {

	buildingInfoListJSON, err := ctx.GetStub().GetState("buildingList")
	if err != nil {
		return nil, fmt.Errorf("failed to get buildingInfo: %v", err)
	}

	var buildingInfoList BuildingList
	err = json.Unmarshal(buildingInfoListJSON, &buildingInfoList)

	var buildingIDNameList []BuildingIDName
	for k, v := range buildingInfoList.BuildingList {
		bd := BuildingIDName{}
		bd.ID = k
		bd.Name = v.BuildingName
		buildingIDNameList = append(buildingIDNameList, bd)
	}

	buildingList := BuildingIDNames{}
	buildingList.BuildingIDNames = buildingIDNameList

	return &buildingList, nil
}

func (s *SmartContract) GetCCA(ctx contractapi.TransactionContextInterface, buildingID string) (*CCAs, error) {

	var baselineModelKey = "baselinemodel-" + buildingID
	baselineModelJSON , err := ctx.GetStub().GetState(baselineModelKey)
	if err != nil {
		return nil, fmt.Errorf("fail to get baselinemodel for building ID %s: %v", buildingID, err)
	}

	var baselineModel BaselineModel
	err = json.Unmarshal(baselineModelJSON, &baselineModel)
	if err != nil {
		return nil, fmt.Errorf("fail to unmarshal baseliemodel: %v", err)
	}

	var energyTypes = []string{"electricity", "naturalGas", "chilledWater", "steam"}
	var years = []string{"First", "Second", "Third","Fourth", "Fifth"}
	var mrvDataMap map[string]Mrv

	for _, energyType := range energyTypes {
		for _, year := range years{
			mrvKey := buildingID + "-" + energyType + "-" + year

			mrvDataJSON, err := ctx.GetStub().GetState(mrvKey)
			if err != nil {
				return nil, fmt.Errorf("fail to get mrv data: %v", err)
			}

			var mrvData Mrv
			err = json.Unmarshal(mrvDataJSON, &mrvData)
			if err != nil {
				return nil, fmt.Errorf("fail to unmarshal Mrv data: %v", err)
			}

			mrvDataMap[mrvKey] = mrvData
		}
	}


	var ccas CCAs

	return &ccas, nil
}

func (s *SmartContract) GetESA(ctx contractapi.TransactionContextInterface, buildingID string) (*ESAs, error) {

	var baselineModelKey = "baselinemodel-" + buildingID
	baselineModelJSON , err := ctx.GetStub().GetState(baselineModelKey)
	if err != nil {
		return nil, fmt.Errorf("fail to get baselinemodel for building ID %s: %v", buildingID, err)
	}

	var baselineModel BaselineModel
	err = json.Unmarshal(baselineModelJSON, &baselineModel)
	if err != nil {
		return nil, fmt.Errorf("fail to unmarshal baseliemodel: %v", err)
	}

	var energyTypes = []string{"electricity", "naturalGas", "chilledWater", "steam"}
	var years = []string{"First", "Second", "Third","Fourth", "Fifth"}
	var mrvDataMap map[string]Mrv

	for _, energyType := range energyTypes {
		for _, year := range years{
			mrvKey := buildingID + "-" + energyType + "MMBTU" + "-" + year

			mrvDataJSON, err := ctx.GetStub().GetState(mrvKey)
			if err != nil {
				return nil, fmt.Errorf("fail to get mrv data: %v", err)
			}

			var mrvData Mrv
			err = json.Unmarshal(mrvDataJSON, &mrvData)
			if err != nil {
				return nil, fmt.Errorf("fail to unmarshal Mrv data: %v", err)
			}

			mrvDataMap[mrvKey] = mrvData
		}
	}

	var esas ESAs


	return &esas, nil
}