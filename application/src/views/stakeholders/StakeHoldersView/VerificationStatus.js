import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    makeStyles, Avatar, Typography, Checkbox
} from '@material-ui/core';
import getInitials from "../../../utils/getInitials";

const useStyles = makeStyles(() => ({
    root: {}
}));

const VerficationStatus = ({ className, ...rest }) => {
    const classes = useStyles();
    const [values, setValues] = useState({
        buildings: [],
        buildingID: '',
        buildingName: '',
        buildingNumber: '',
        address: '',
        substantialCompletion: '',
        greenBuildingCertificate: ''
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleSave = (event) => {
        apiPost(values["buildingNumber"], values["buildingName"], values["buildingNumber"], values["address"], values["substantialCompletion"], values["greenBuildingCertificate"])

    };

    const apiGet = async (id) => {
        var url = "http://34.236.242.165:8080/api/mrv/building/info/" + id;
        const response = await axios.get(url, {headers: {'Access-Control-Allow-Origin' : 'http://34.236.242.165:8080',}});
        console.log(response)
        // await this.setState({argValue: response.data});
    }

    const apiPost = async (buildingId, buildingName, buildingNumber, buildingAddress, substantialCompletion, greenBuildingCertificate) => {
        var url = "http://34.236.242.165:8080/api/mrv/building/info";
        const response = await axios.post(url, {
            "objectType": "BuildingInfo",
            "id":buildingId,
            "name": buildingName,
            "number": buildingNumber,
            "address": buildingAddress,
            "substantialCompletion":substantialCompletion,
            "greenBuildingCertificate":greenBuildingCertificate
        }, {headers: {'Access-Control-Allow-Origin' : '*','Access-Control-Allow-Headers':'*'}});
        console.log(response.data);
        alert("Successfully create building data")
    }


    const selectBuilding = async (event) => {
        var bID = event.target.value;
        await setValues({
            ...values,
            buildingID: event.target.value
        })

        await getBuildingInfo(bID);

    }

    const getBuildingInfo = async (id) => {
        var url = "http://34.236.242.165:8080/api/mrv/building/info/" + id;
        const response = await axios.get(url, {headers: {'Access-Control-Allow-Origin': 'http://34.236.242.165:8080',}})
        console.log(response.data)
        setValues({
            ...values,
            buildingID: id,
            buildingName: response.data.name,
            address: response.data.address,
            buildingNumber: response.data.number,
            substantialCompletion: response.data.substantialCompletion,
            greenBuildingCertificate: response.data.greenBuildingCertificate
        })

    }

    const getBuilding = async () => {
        var url = "http://34.236.242.165:8080/api/mrv/building/list";
        const response = await axios.get(url, {headers: {'Access-Control-Allow-Origin': 'http://34.236.242.165:8080',}})
        console.log(response.data.buildingList)
        setValues({
            ...values,
            buildings: response.data.buildingList
        })

        alert("Successfully get building list")
    }


    return (
        <form
            autoComplete="off"
            noValidate
            className={clsx(classes.root, className)}
            {...rest}
        >
            <Card>
                <CardHeader
                    title="Verification Status"
                />
                <Divider />
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <Box
                                alignItems="center"
                                display="flex"
                            >
                                <Button
                                    color="primary"
                                    variant="contained"
                                >
                                    Energy Savings Verification
                                </Button>
                            </Box>
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <Box
                                alignItems="center"
                                display="flex"
                            >
                                <Typography
                                    color="textPrimary"
                                    variant="body1"
                                >
                                    Status
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <Box
                                alignItems="center"
                                display="flex"
                            >
                                <Checkbox
                                    checked={1}
                                    value="true"
                                />
                                <Typography
                                    color="textPrimary"
                                    variant="body1"
                                >
                                   Completed
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <Box
                                alignItems="center"
                                display="flex"
                            >
                                <Button
                                    color="primary"
                                    variant="contained"
                                >
                                    CO2 Emission Verification
                                </Button>
                            </Box>
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <Box
                                alignItems="center"
                                display="flex"
                            >
                                <Typography
                                    color="textPrimary"
                                    variant="body1"
                                >
                                    Status
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <Box
                                alignItems="center"
                                display="flex"
                            >
                                <Checkbox
                                    checked={1}
                                    value="true"
                                />
                                <Typography
                                    color="textPrimary"
                                    variant="body1"
                                >
                                    Completed
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
            </Card>
        </form>
    );
};

VerficationStatus.propTypes = {
    className: PropTypes.string
};

export default VerficationStatus;
