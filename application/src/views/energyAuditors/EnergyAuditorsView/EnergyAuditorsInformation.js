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
        buildingID: 'Building ID',
        buildingName: 'Building name',
        buildingNumber: '0',
        address: 'Building address',
        substantialCompletion: 'Substantial completion',
        greenBuildingCertificate: 'Green building certificate'
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleSave = (event) => {
        console.log(values["buildingID"])
        apiPost(values["buildingID"], values["buildingName"], values["buildingNumber"], values["address"], values["substantialCompletion"], values["greenBuildingCertificate"])

    };

    const apiGet = async (id) => {
        var url = "http://localhost:8080/api/mrv/building/info/" + id;
        const response = await axios.get(url, {headers: {'Access-Control-Allow-Origin' : 'http://localhost:8080',}});
        console.log(response)
        // await this.setState({argValue: response.data});
    }

    const apiPost = async (buildingId, buildingName, buildingNumber, buildingAddress, substantialCompletion, greenBuildingCertificate) => {
        var url = "http://localhost:8080/api/mrv/building/info";
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
        // await this.setState({invokeResult: response.data.status});
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
                            md={12}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Please specify the building ID"
                                label="Building ID"
                                name="buildingID"
                                onChange={handleChange}
                                required
                                value={values.buildingID}
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
                                label="Building number"
                                name="Building Number"
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
