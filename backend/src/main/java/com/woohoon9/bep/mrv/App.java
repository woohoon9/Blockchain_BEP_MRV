package com.woohoon9.bep.mrv;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.woohoon9.bep.mrv.model.Mrv;
import org.hyperledger.fabric.gateway.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedInputStream;
import java.io.File;
import java.security.InvalidKeyException;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.PublicKey;
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
    public ResponseEntity<?> createMrv(@RequestBody String id){

        String resultStr = "";

        try {
            byte[] result = getContract(channelName, chaincodeName).submitTransaction("createMrv", id);
            resultStr = new String(result, UTF_8);

        }catch(Exception e){
            e.printStackTrace();
        }

        return new ResponseEntity<>(resultStr, HttpStatus.CREATED);

    }

    @RequestMapping(value = "/mrv/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getMrv(@PathVariable String id){
        String resultStr = "";

        try{
            byte[] result = getContract(channelName, chaincodeName).submitTransaction("GetMrv", id);
            resultStr = new String(result, UTF_8);

        }catch(Exception e){
            e.printStackTrace();
        }

        return new ResponseEntity<>(resultStr, HttpStatus.OK);
    }

    @RequestMapping(value = "/mrv/transient", method = RequestMethod.POST)
    public ResponseEntity<?> createMrvTransient(@RequestBody Mrv mrv) throws JsonProcessingException {

        String resultStr = "";

        logger.info("============================ mrv info ==================================\n" + getMapper().writeValueAsString(mrv)+ "\n========================================================================\n");

        try{

            HashMap<String, byte[]> mrvInput = new HashMap<>();
            mrvInput.put("createMrv", getMapper().writeValueAsBytes(mrv));
            byte[] result = getContract(channelName, chaincodeName).createTransaction("CreateMrvByTransient").setTransient(mrvInput).submit();
            resultStr = new String(result, UTF_8);

        }catch(Exception e){
            e.printStackTrace();
        }

        return new ResponseEntity<>(resultStr, HttpStatus.CREATED);
    }

//    @RequestMapping(value = "/manager/product/{id}", method = RequestMethod.GET)
//    public ResponseEntity<?> getProduct(@PathVariable String id) {
//        ProductRecord resultProduct = null;
//
//        try {
//
//            byte[] result = getContract(channelName, chaincodeName).submitTransaction("getProduct", id);
//            resultProduct = getMapper().readValue(new String(result, UTF_8), ProductRecord.class);
//
//        }catch(Exception e){
//            e.printStackTrace();
//        }
//
//        return new ResponseEntity<>(resultProduct, HttpStatus.OK);
//    }
//
//    @RequestMapping(value = "/manager/product", method = RequestMethod.POST)
//    public ResponseEntity<?> createProduct(@RequestBody ProductInfo productInfo){
//        String resultStr = "";
//        ProductKey key = null;
//
//        try {
//            byte[] result = getContract(channelName, chaincodeName).submitTransaction("registProducts", productInfo.getName(), productInfo.getQty(), productInfo.getOwner());
//            resultStr = new String(result, UTF_8);
//            key = getMapper().readValue(new String(result, UTF_8), ProductKey.class);
//
//        }catch(Exception e){
//            e.printStackTrace();
//        }
//
//        return new ResponseEntity<>(key, HttpStatus.CREATED);
//    }

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
