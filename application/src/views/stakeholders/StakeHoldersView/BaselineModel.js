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

const buildings = [
    {
        id: '',
        name: ''
    },
];

const useStyles = makeStyles(() => ({
    root: {}
}));

const BaselineModel = ({ className, ...rest }) => {
    const classes = useStyles();
    const [values, setValues] = useState({
        buildings: [],
        buildingID: '',
        electricityMMBTU: '',
        electricityKWH: '',
        naturalGasMMBTU: '',
        naturalGasSCF: '',
        chilledWaterMMBTU: '',
        chilledWaterKTON: '',
        steamMMBTU: '',
        steamKLBS: '',
        totalMMBTU: '',
        coalMMBTU: '',
        gHGNaturalGasMMBTU: '',
        oilMMBTU: '',
        coalKG: '',
        naturalGasKG: '',
        oilKG: '',
        totalCO2EKG: '',
        totalCO2ETON: ''

    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value

        });
    };

    const loadData = (event) => {
        console.log("loadData")
    };


    const handleSave = (event) => {
        apiPost(values["buildingID"], values["electricityMMBTU"], values["electricityKWH"], values["naturalGasMMBTU"], values["naturalGasSCF"], values["chilledWaterMMBTU"], values["chilledWaterKTON"], values["steamMMBTU"], values["steamKLBS"], values["totalMMBTU"], values["coalMMBTU"], values["gHGNaturalGasMMBTU"], values["oilMMBTU"], values["coalKG"], values["naturalGasKG"], values["oilKG"], values["totalCO2EKG"], values["totalCO2ETON"] )
    };

    const getBuilding = async () => {
        var url = "http://localhost:8080/api/mrv/building/list";
        const response = await axios.get(url, {headers: {'Access-Control-Allow-Origin': 'http://localhost:8080',}})
        console.log(response.data.buildingList)
        setValues({
            buildings: response.data.buildingList
        })

        alert("Successfully get building list")
    }

    const apiGet = async (id) => {
        var url = "http://localhost:8080/api/mrv/building/baseline/" + id;
        const response = await axios.get(url, {headers: {'Access-Control-Allow-Origin' : 'http://localhost:8080',}});
        console.log(response)
        // await this.setState({argValue: response.data});
    }

    const apiPost = async (buildingId, electricityMMBTU, electricityKWH, naturalGasMMBTU, naturalGasSCF, chilledWaterMMBTU, chilledWaterKTON, steamMMBTU, steamKLBS, totalMMBTU, coalMMBTU, gHGNaturalGasMMBTU, oilMMBTU, coalKG, naturalGasKG, oilKG, totalCO2EKG, totalCO2ETON ) => {
        var url = "http://localhost:8080/api/mrv/building/baseline";
        const response = await axios.post(url, {
            "objectType": "BuidlingModel",
            "id": buildingId,
            "electricityMMBTU": electricityMMBTU,
            "naturalGasMMBTU": naturalGasMMBTU,
            "chilledWaterMMBTU": chilledWaterMMBTU,
            "steamMMBTU": steamMMBTU,
            "electricityKWH": electricityKWH,
            "naturalGasSCF": naturalGasSCF,
            "chilledWaterKTON": chilledWaterKTON,
            "steamKLBS": steamKLBS,
            "totalMMBTU": totalMMBTU,
            "coalMMBTU": coalMMBTU,
            "gHGNaturalGasMMBTU": gHGNaturalGasMMBTU,
            "oilMMBTU": oilMMBTU,
            "coalKG": oilMMBTU,
            "naturalGasKG": naturalGasKG,
            "oilKG": oilKG,
            "totalCO2EKG": totalCO2EKG,
            "totalCO2ETON": totalCO2ETON
        }, {headers: {'Access-Control-Allow-Origin' : '*','Access-Control-Allow-Headers':'*'}});
        console.log(response.data);
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

                <Card>
                    <CardHeader
                        title="Select Building"
                    />
                    <CardContent>
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
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Select Building"
                                name="buildingID"
                                onChange={handleChange}
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
                    </CardContent>
                </Card>
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
                                value={values.chilledWaterMMBTU}
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
                                value={values.steamMMBTU}
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
                                name="gHGNaturalGasMMBTU"
                                onChange={handleChange}
                                required
                                value={values.gHGNaturalGasMMBTU}
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
