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
	PV 						float64 `json:"pv"`
}

type BaselineModel struct {
	Type   					string `json:"objectType"`
	ID     					string `json:"id"`
	ElectricityMMBTU		float64 `json:"electricityMMBTU"`
	NaturalGasMMBTU			float64 `json:"naturalGasMMBTU"`
	ChilledWaterMMBTU		float64 `json:"chilledWaterMMBTU"`
	SteamMMBTU				float64 `json:"steamMMBTU"`
	ElectricityKWH			float64 `json:"electricityKWH"`
	NaturalGasSCF			float64 `json:"naturalGasSCF"`
	ChilledWaterKTON		float64 `json:"chilledWaterKTON"`
	SteamKLBS				float64 `json:"steamKLBS"`
	TotalMMBTU				float64 `json:"totalMMBTU"`
	CoalMMBTU				float64 `json:"coalMMBTU"`
	GHGNaturalGasMMBTU		float64 `json:"gHGNaturalGasMMBTU"`
	OilMMBTU				float64 `json:"oilMMBTU"`
	CoalKG					float64 `json:"coalKG"`
	NaturalGasKG			float64 `json:"naturalGasKG"`
	OilKG					float64 `json:"oilKG"`
	TotalCO2EKG				float64 `json:"totalCO2EKG"`
	TotalCO2ETON			float64 `json:"totalCO2ETON"`
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
	NaturalGas					float64 `json:"naturalGas"`
	Oil							float64 `json:"oil"`
	GHGEmissionsReduction		float64 `json:"ghgEmissionReduction"`
}

type CCAs struct{
	CCAList 		[]CCAByOne		`json:"ccList"`
}

type ESAByOne struct {
	Item						string  `json:"item"`
	Electricity					float64 `json:"electricity"`
	NaturalGas					float64 `json:"naturalGas"`
	ChilledWater 				float64	`json:"chilledWater"`
	Steam						float64 `json:"steam"`
	EnergySavings				float64 `json:"energySaving"`
}

type ESAs struct{
	ESAList			[]ESAByOne		`json:"esList"`
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
	var mrvId = mrvInput.ID + "-" + mrvInput.EnergyType + "-" + mrvInput.Year

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
	emptydb := BuildingIDName{}
	emptydb.ID = ""
	emptydb.Name = ""
	buildingIDNameList = append(buildingIDNameList, emptydb)
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
	mrvDataMap := make(map[string]Mrv)

	for _, energyType := range energyTypes {
		for _, year := range years {
			mrvKey := buildingID + "-" + energyType + "-" + year

			mrvDataJSON, err := ctx.GetStub().GetState(mrvKey)
			if err != nil {
				return nil, fmt.Errorf("fail to get mrv data: %v", err)
			}

			if len(mrvDataJSON) > 0 {

				var mrvData Mrv
				err = json.Unmarshal(mrvDataJSON, &mrvData)
				if err != nil {
				return nil, fmt.Errorf("fail to unmarshal Mrv data: %v", err)
			}

				mrvDataMap[mrvKey] = mrvData
			}
		}
	}

	esas := ESAs{}
	mrvDataList := []ESAByOne{}
	baseline := ESAByOne{"Baseline (MMBTU)", baselineModel.ElectricityMMBTU, baselineModel.NaturalGasMMBTU, baselineModel.ChilledWaterMMBTU, baselineModel.SteamMMBTU, 0}
	mrvDataList = append(mrvDataList, baseline)

	returnedEsas, err := s.calES(ctx, esas, mrvDataMap, buildingID)
	if err != nil {
		return nil, fmt.Errorf("failed to get calculated EnergySaings data: %v", err)
	}

	return returnedEsas, nil
}

func (s *SmartContract) calES(ctx contractapi.TransactionContextInterface, esas ESAs, mrvData map[string]Mrv, buildingID string) (*ESAs, error) {

	mrvDataList := esas.ESAList
	var years = []string{"First", "Second", "Third","Fourth", "Fifth"}
	var energyTypes = []string{"electricity", "naturalGas", "chilledWater", "steam"}

	var totalElec float64
	var totalNaturalGas float64
	var totalChilledWater float64
	var totalSteam float64
	for _, year := range years{

		es:= ESAByOne{}
		es.Item = year + " year (MMBTU)"

		for _, energyType := range energyTypes{
			mrvKey := buildingID + "-" +  energyType+ "-" + year
			mrv := mrvData[mrvKey]

			fmt.Println(mrvKey)
			fmt.Println(mrv)
			switch energyType {
			case "electricity" :
				es.Electricity = mrv.Sum
				totalElec = totalElec + mrv.Sum
			case "naturalGas" :
				es.NaturalGas = mrv.Sum
				totalNaturalGas = totalNaturalGas + mrv.Sum
			case "chilledWater" :
				es.ChilledWater = mrv.Sum
				totalChilledWater = totalChilledWater + mrv.Sum
			case "steam" :
				es.Steam = mrv.Sum
				totalSteam = totalSteam + mrv.Sum
			}
		}

		mrvDataList = append(mrvDataList, es)

	}

	totalMrv := ESAByOne{"Total Savings", totalElec, totalNaturalGas, totalChilledWater, totalSteam, 0}
	mrvDataList = append(mrvDataList, totalMrv)
	esas.ESAList = mrvDataList

	return &esas, nil
}

func (s *SmartContract) calCC(ctx contractapi.TransactionContextInterface) {


}