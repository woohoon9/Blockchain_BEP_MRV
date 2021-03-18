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
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {}
}));

const BuildingInformation = ({ className, ...rest }) => {
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
                    subheader="The information can be edited"
                    title="Building Information"
                />
                <Divider />
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Select Building"
                                name="buildingID"
                                onChange={selectBuilding}
                                required
                                select
                                SelectProps={{ native: true }}
                                value={values.buildingID}
                                variant="outlined"
                            >
                                {values.buildings.map((option) => (
                                    <option
                                        key={option.id}
                                        value={option.id}
                                    >
                                        {option.name}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <Box
                                display="flex"
                                justifyContent="flex-end"
                                p={2}
                            >
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={getBuilding}
                                >
                                    Get Building
                                </Button>
                            </Box>
                        </Grid>

                    </Grid>


                </CardContent>
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Please specify the building name"
                                label="Building name"
                                name="buildingName"
                                onChange={handleChange}
                                required
                                value={values.buildingName}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Please specify the building number"
                                label="Building Number"
                                name="buildingNumber"
                                onChange={handleChange}
                                required
                                value={values.buildingNumber}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                onChange={handleChange}
                                required
                                value={values.address}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Substantial Completion"
                                name="substantialCompletion"
                                onChange={handleChange}
                                required
                                value={values.substantialCompletion}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Green Building Certificate"
                                name="greenBuildingCertificate"
                                onChange={handleChange}
                                required
                                value={values.greenBuildingCertificate}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    p={2}
                >
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </Box>
            </Card>
        </form>
    );
};

BuildingInformation.propTypes = {
    className: PropTypes.string
};

export default BuildingInformation;
