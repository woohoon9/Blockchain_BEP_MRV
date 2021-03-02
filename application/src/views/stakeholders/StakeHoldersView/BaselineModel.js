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

const BaselineModel = ({ className, ...rest }) => {
    const classes = useStyles();
    const [values, setValues] = useState({
        electricityMMBTU: 'electricity (MMBtu)',
        electricityKWH: 'electricity (KWh)',
        naturalGasMMBTU: 'Natural Gas (MMBtu)',
        naturalGasSCF: 'Natural Gas (scf)',
        chilledWaterMMBTU: 'Chilled Water (MMBtu)',
        chilledWaterKTON: 'Chilled Water (Kton)',
        steamMMBTU: 'Steam (MMBtu)',
        steamKLBS: 'Steam (klbs)',
        totalMMBTU: 'Total (MMBtu)',
        coalMMBTU: 'Coal (MMBtu)',
        GHGNaturalGasMMBTU: 'Natural Gas (MMBtu)',
        oilMMBTU: 'Oil (MMBtu)',
        coalKG: 'Coal (kg)',
        naturalGasKG: 'Natural Gas (kg)',
        oilKG: 'Oil (kg)',
        totalCO2EKG: 'Total (Co2e, kg)',
        totalCO2ETON: 'Total (Co2e, Tons)'

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
                    title="Baseline Energy Consumption"
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
                                helperText="Please specify the Electricity"
                                label="Electricity (MMBtu)"
                                name="electricityMMBTU"
                                onChange={handleChange}
                                required
                                value={values.electricityMMBTU}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Please specify the Electricity"
                                label="Electricity (KWh)"
                                name="electricityKWH"
                                onChange={handleChange}
                                required
                                value={values.electricityKWH}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Natural Gas (MMBtu)"
                                name="naturalGasMMBTU"
                                onChange={handleChange}
                                required
                                value={values.naturalGasMMBTU}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Natural Gas (scf)"
                                name="naturalGasSCF"
                                onChange={handleChange}
                                required
                                value={values.naturalGasSCF}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Chilled Water (BBMtu)"
                                name="chilledWaterMMBTU"
                                onChange={handleChange}
                                required
                                value={values.chilledWaterBBMTU}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Chilled Water (Kton)"
                                name="chilledWaterKTON"
                                onChange={handleChange}
                                required
                                value={values.chilledWaterKTON}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Steam (BBMtu)"
                                name="steamMMBTU"
                                onChange={handleChange}
                                required
                                value={values.steamBBMTU}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Steam (klbs)"
                                name="steamKLBS"
                                onChange={handleChange}
                                required
                                value={values.steamKLBS}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Total (MMBtu)"
                                name="totalMMBTU"
                                onChange={handleChange}
                                required
                                value={values.totalMMBTU}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardHeader
                    subheader="The information can be edited"
                    title="GHG Source from Baseline Energy Consumption"
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
                            <TextField
                                fullWidth
                                label="Coal (MMBtu)"
                                name="coalMMBTU"
                                onChange={handleChange}
                                required
                                value={values.coalMMBTU}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Natural Gas (MMBtu)"
                                name="GHGNaturalGasMMBTU"
                                onChange={handleChange}
                                required
                                value={values.GHGNaturalGasMMBTU}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Oil (MMBtu)"
                                name="oilMMBTU"
                                onChange={handleChange}
                                required
                                value={values.oilMMBTU}
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardHeader
                    subheader="The information can be edited"
                    title="GHG emissions"
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
                            <TextField
                                fullWidth
                                label="Coal (kg)"
                                name="coalKG"
                                onChange={handleChange}
                                required
                                value={values.coalKG}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Natural Gas (kg)"
                                name="naturalGasKG"
                                onChange={handleChange}
                                required
                                value={values.naturalGasKG}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={4}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Oil (kg)"
                                name="oilKG"
                                onChange={handleChange}
                                required
                                value={values.oilKG}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Total (Co2e, kg)"
                                name="totalCO2EKG"
                                onChange={handleChange}
                                required
                                value={values.totalCO2EKG}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Total (Co2e, Tons)"
                                name="totalCO2ETON"
                                onChange={handleChange}
                                required
                                value={values.totalCO2ETON}
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

BaselineModel.propTypes = {
    className: PropTypes.string
};

export default BaselineModel;
