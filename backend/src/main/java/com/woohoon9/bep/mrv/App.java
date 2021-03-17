package com.woohoon9.bep.mrv;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.woohoon9.bep.mrv.model.*;
import org.hyperledger.fabric.gateway.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.InvalidKeyException;
import java.security.cert.CertificateException;
import java.util.HashMap;

import static java.nio.charset.StandardCharsets.UTF_8;

@RestController
@RequestMapping("/api")
@EnableAutoConfiguration
public class App {

    static {
        System.setProperty("org.hyperledger.fabric.sdk.service_discovery.as_localhost", "true");
    }

    public static final Logger logger = LoggerFactory.getLogger(App.class);
    private static Gateway gateway;
    private static ObjectMapper mapper;

    @Value("${hlf.wallet.path}")
    private String walletPathValue;

    @Value("${hlf.project.root}")
    private String projectRootValue;

    @Value("${hlf.channel.name}")
    private String channelName;

    @Value("${hlf.chaincode.name}")
    private String chaincodeName;

    @Value("${hlf.connectionprofile.path}")
    private String connectionProfilePath;

    @Value("${hlf.connectionprofile.name}")
    private String connectionProfileName;

    @Value("${hlf.wallet.user.name}")
    private String walletUserName;

    @RequestMapping(value = "/mrv", method = RequestMethod.POST)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> createMrv(@RequestBody String id){

        Mrv resultMrv = null;

        try {
            byte[] result = getContract(channelName, chaincodeName).submitTransaction("createMrv", id);
            resultMrv = getMapper().readValue(new String(result, UTF_8), Mrv.class);

        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(resultMrv, HttpStatus.CREATED);

    }

    @RequestMapping(value = "/mrv/{id}", method = RequestMethod.GET)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> getMrv(@PathVariable String id){

        Mrv resultMrv = null;

        try{
            byte[] result = getContract(channelName, chaincodeName).submitTransaction("GetMrv", id);
            resultMrv = getMapper().readValue(new String(result, UTF_8), Mrv.class);

        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(resultMrv, HttpStatus.OK);
    }


    // Create MRV
    @RequestMapping(value = "/mrv/transient", method = RequestMethod.POST)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> createMrvTransient(@RequestBody Mrv mrv) {

        Mrv resultMrv = null;

        try {

            logger.info(getMapper().writeValueAsString(mrv));

            HashMap<String, byte[]> mrvInput = new HashMap<>();
            mrvInput.put("createMrv", getMapper().writeValueAsBytes(mrv));
            byte[] result = getContract(channelName, chaincodeName).createTransaction("CreateMrvByTransient").setTransient(mrvInput).submit();
            resultMrv = getMapper().readValue(new String(result, UTF_8), Mrv.class);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(resultMrv, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/mrv/building/info/{id}", method = RequestMethod.GET)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> getBuildingInfo(@PathVariable String id) {


        BuildingInfo buildingInfo = null;

        try{

            byte[] result = getContract(channelName, chaincodeName).submitTransaction("GetBuildingInfo", id);
            buildingInfo = getMapper().readValue(new String(result, UTF_8), BuildingInfo.class);

        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(buildingInfo, HttpStatus.OK);
    }

    @RequestMapping(value = "/mrv/building/info", method = RequestMethod.POST)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> createBuildingInfo(@RequestBody BuildingInfo buildingInfo) {

        BuildingInfo resultBuildingInfo = null;

        try{

            HashMap<String, byte[]> buildingInfoInput = new HashMap<>();
            buildingInfoInput.put("createBuildingInfo", getMapper().writeValueAsBytes(buildingInfo));
            byte[] result = getContract(channelName, chaincodeName).createTransaction("CreateBuildingInfoByTransient").setTransient(buildingInfoInput).submit();
            resultBuildingInfo = getMapper().readValue(new String(result, UTF_8), BuildingInfo.class);

        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(resultBuildingInfo, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/mrv/building/list", method = RequestMethod.GET)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> getBuildingList() {

        BuildingIDNames buildingList = null;

        try{

            byte[] result = getContract(channelName, chaincodeName).submitTransaction("GetBuildingList");
            buildingList = getMapper().readValue(new String(result, UTF_8), BuildingIDNames.class);

        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(buildingList, HttpStatus.OK);


    }

    @RequestMapping(value = "/mrv/building/baseline", method = RequestMethod.POST)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> createBaselineModel(@RequestBody BaselineModel baselineModel) {

        BaselineModel resultBaselineModel = null;

        try{

            String buildingId = baselineModel.getId();

            if(buildingId != null && buildingId != "") {
                HashMap<String, byte[]> buildingInfoInput = new HashMap<>();
                buildingInfoInput.put("createBaselineModel", getMapper().writeValueAsBytes(baselineModel));
                byte[] result = getContract(channelName, chaincodeName).createTransaction("CreateBaselineModelByTransient").setTransient(buildingInfoInput).submit();
                resultBaselineModel = getMapper().readValue(new String(result, UTF_8), BaselineModel.class);
            }else{
                return new ResponseEntity<>("Error: Building must be selected", HttpStatus.INTERNAL_SERVER_ERROR);
            }

        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(resultBaselineModel, HttpStatus.CREATED);
    }


    @RequestMapping(value = "/mrv/building/baseline/{id}", method = RequestMethod.GET)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> getBaselineModel(@PathVariable String id) {

        BaselineModel resultBaselineModel = null;

        try{

            byte[] result = getContract(channelName, chaincodeName).submitTransaction("GetBaselineModel", id);
            resultBaselineModel = getMapper().readValue(new String(result, UTF_8), BaselineModel.class);

        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(resultBaselineModel, HttpStatus.OK);
    }

    @RequestMapping(value = "/mrv/building/es/{id}", method = RequestMethod.GET)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> getEnergySavings(@PathVariable String id) {

        EnergySavingsList resultEnergySavings = null;

        try{

            byte[] result = getContract(channelName, chaincodeName).submitTransaction("GetESA", id);
            resultEnergySavings = getMapper().readValue(new String(result, UTF_8), EnergySavingsList.class);

        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(resultEnergySavings, HttpStatus.OK);
    }

    @RequestMapping(value = "/mrv/building/cc/{id}", method = RequestMethod.GET)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<?> getCarbonCredit(@PathVariable String id) {

        CarbonCreditList resultCarbonCredit = null;

        try{

            byte[] result = getContract(channelName, chaincodeName).submitTransaction("GetCCA", id);
            resultCarbonCredit = getMapper().readValue(new String(result, UTF_8), CarbonCreditList.class);

        }catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(resultCarbonCredit, HttpStatus.OK);
    }

    private Contract getContract(String channelId, String chaincodeId) throws Exception {

        getGateway();
        Network network = gateway.getNetwork(channelId);
        Contract contract = network.getContract(chaincodeId);

        return contract;
    }

    private Gateway getGateway() throws Exception {
        if(gateway != null){
            return gateway;
        }

        return connectToBlockchain();
    }

    private ObjectMapper getMapper(){

        if(mapper == null){
            mapper = new ObjectMapper();
        }

        return mapper;
    }

    public Gateway connectToBlockchain() throws Exception {

        logger.info("Start to connect Gateway");

        Path projectRoot = Paths.get(projectRootValue);
        Path walletPath = projectRoot.resolve(Paths.get(walletPathValue));
        logger.info("wallet path: " + walletPath.toString());
        Wallet wallet = Wallets.newFileSystemWallet(walletPath);
        if(!(wallet.list().size() > 0)){
            createIdentity(wallet, walletUserName, connectionProfilePath);
        }
        logger.info("wallet list: " + wallet.list().size());

        Path networkConfigPath = Paths.get(connectionProfilePath, connectionProfileName);
        logger.info("Config Path : " + networkConfigPath.toString());

        Gateway.Builder builder = Gateway.createBuilder();
//        builder.identity(wallet, walletUserName).networkConfig(networkConfigPath).discovery(true);
        builder.identity(wallet, walletUserName).networkConfig(new FileInputStream(networkConfigPath.toFile())).discovery(true);

        logger.info("builder connect");
        gateway = builder.connect();

        return gateway;
    }

    private void createIdentity(Wallet wallet, String identityName, String connectionProfilePath) {

        try {

            Path connectionProfile = Paths.get(connectionProfilePath);
            Path credentialPath = connectionProfile.resolve(Paths.get("users", "User1@org1.example.com", "msp"));
            Path certificatePem = credentialPath.resolve(Paths.get("signcerts","User1@org1.example.com-cert.pem"));
            Path privateKey = credentialPath.resolve(Paths.get("keystore","priv_sk"));

            // Load credentials into wallet
            String identityLabel = identityName;
            Identity identity = Identities.newX509Identity("Org1MSP", Identities.readX509Certificate(Files.newBufferedReader(certificatePem)), Identities.readPrivateKey(Files.newBufferedReader(privateKey)));

            wallet.put(identityLabel, identity);

        } catch (IOException | CertificateException | InvalidKeyException e) {
            System.err.println("Error adding to wallet");
            e.printStackTrace();
        }
    }

    public static void main(String... args) {
        SpringApplication.run(App.class, args);
    }
}
