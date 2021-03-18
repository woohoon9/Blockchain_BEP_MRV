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
        buildings: [{id:"", name:""}],
        buildingID: '',
        electricityMMBTU: 0,
        electricityKWH: 0,
        naturalGasMMBTU: 0,
        naturalGasSCF: 0,
        chilledWaterMMBTU: 0,
        chilledWaterKTON: 0,
        steamMMBTU: 0,
        steamKLBS: 0,
        totalMMBTU: 0,
        coalMMBTU: 0,
        gHGNaturalGasMMBTU: 0,
        oilMMBTU: 0,
        coalKG: 0,
        naturalGasKG: 0,
        oilKG: 0,
        totalCO2EKG: 0,
        totalCO2ETON: 0

    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value

        });
    };

    const selectBuilding = async (event) => {
        var bID = event.target.value;
        console.log(bID)
        await setValues({
            ...values,
            buildingID: event.target.value
        })


        var url = "http://34.236.242.165:8080/api/mrv/building/baseline/" + bID;
        const response = await axios.get(url, {headers: {'Access-Control-Allow-Origin' : 'http://34.236.242.165:8080',}});
        console.log(response.data)

        setValues({
            ...values,
            buildingID: bID,
            electricityMMBTU: response.data.electricityMMBTU,
            electricityKWH: response.data.electricityKWH,
            naturalGasMMBTU: response.data.naturalGasMMBTU,
            naturalGasSCF: response.data.naturalGasSCF,
            chilledWaterMMBTU: response.data.chilledWaterMMBTU,
            chilledWaterKTON: response.data.chilledWaterKTON,
            steamMMBTU: response.data.steamMMBTU,
            steamKLBS: response.data.steamKLBS,
            totalMMBTU: response.data.totalMMBTU,
            coalMMBTU: response.data.coalMMBTU,
            gHGNaturalGasMMBTU: response.data.gHGNaturalGasMMBTU,
            oilMMBTU: response.data.oilMMBTU,
            coalKG: response.data.coalKG,
            naturalGasKG: response.data.naturalGasKG,
            oilKG: response.data.oilKG,
            totalCO2EKG: response.data.totalCO2EKG,
            totalCO2ETON: response.data.totalCO2ETON
        })

    }

    const loadData = (event) => {
        console.log("loadData")
    };


    const handleSave = (event) => {
        console.log(values["buildingID"])
        console.log(values["electricityMMBTU"])
        apiPost(values["buildingID"], values["electricityMMBTU"], values["electricityKWH"], values["naturalGasMMBTU"], values["naturalGasSCF"], values["chilledWaterMMBTU"], values["chilledWaterKTON"], values["steamMMBTU"], values["steamKLBS"], values["totalMMBTU"], values["coalMMBTU"], values["gHGNaturalGasMMBTU"], values["oilMMBTU"], values["coalKG"], values["naturalGasKG"], values["oilKG"], values["totalCO2EKG"], values["totalCO2ETON"] )

    };

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

    const apiGet = async (id) => {
        var url = "http://34.236.242.165:8080/api/mrv/building/baseline/" + id;
        const response = await axios.get(url, {headers: {'Access-Control-Allow-Origin' : 'http://34.236.242.165:8080',}});
        console.log(response)
        // await this.setState({argValue: response.data});
    }

    const apiPost = async (buildingId, electricityMMBTU, electricityKWH, naturalGasMMBTU, naturalGasSCF, chilledWaterMMBTU, chilledWaterKTON, steamMMBTU, steamKLBS, totalMMBTU, coalMMBTU, gHGNaturalGasMMBTU, oilMMBTU, coalKG, naturalGasKG, oilKG, totalCO2EKG, totalCO2ETON ) => {
        var url = "http://34.236.242.165:8080/api/mrv/building/baseline";
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
        alert("Successfully create baseline model")
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
                                type="number"
                                step="0.01"
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
                                type="number"
                                step="0.01"
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
                                type="number"
                                step="0.01"
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
                                type="number"
                                step="0.01"
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
                                type="number"
                                step="0.01"
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
                                type="number"
                                step="0.01"
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
                                type="number"
                                step="0.01"
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
                                type="number"
                                step="0.01"
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
                                type="number"
                                step="0.01"
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
                                type="number"
                                step="0.01"
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
                                type="number"
                                step="0.01"
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
                                type="number"
                                step="0.01"
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
                                type="number"
                                step="0.01"
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
                                type="number"
                                step="0.01"
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
                                type="number"
                                step="0.01"
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
                                type="number"
                                step="0.01"
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
                                type="number"
                                step="0.01"
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
