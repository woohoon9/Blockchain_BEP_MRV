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

const DataPage = ({ className, year, type,  ...rest }) => {
    const classes = useStyles();
    const yearName = year + " Year";
    const [values, setValues] = useState({
        unit: '',
        buildingID: '',
        buildings: [],
        jan: 0,
        feb: 0,
        mar: 0,
        apr: 0,
        may: 0,
        jun: 0,
        jul: 0,
        aug: 0,
        sep: 0,
        oct: 0,
        nov: 0,
        dec: 0
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleSave = (event) => {
        apiPost(values["buildingID"], values["unit"], year, type, values["jan"], values["feb"], values["mar"], values["apr"], values["may"], values["jun"], values["jul"], values["aug"], values["sep"], values["oct"], values["nov"], values["dec"])

    };

    const selectUnit = (event) => {
        setValues({
            ...values,
            unit: event.target.value
        })
    }

    const selectBuilding = async (event) => {
        var bID = event.target.value;
        setValues({
            ...values,
            buildingID: event.target.value
        })

        var url = "http://34.236.242.165:8080/api/mrv/" + bID + "-" + type + "-" + year;
        const response = await axios.get(url, {headers: {'Access-Control-Allow-Origin': 'http://34.236.242.165:8080',}})
        console.log(response.data)
        setValues({
            ...values,
            buildingID: bID,
            jan: response.data.jan,
            feb: response.data.feb,
            mar: response.data.mar,
            apr: response.data.apr,
            may: response.data.may,
            jun: response.data.jun,
            jul: response.data.jul,
            aug: response.data.aug,
            sep: response.data.sep,
            oct: response.data.oct,
            nov: response.data.nov,
            dec: response.data.dec
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

    const apiGet = async (id) => {
        var url = "http://34.236.242.165:8080/api/mrv/building/info/" + id;
        const response = await axios.get(url, {headers: {'Access-Control-Allow-Origin' : 'http://34.236.242.165:8080',}});
        console.log(response)
    }

    const apiPost = async (buildingId, unit, year, type, jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec) => {
        var url = "http://34.236.242.165:8080/api/mrv/transient";
        const response = await axios.post(url, {
            "objectType": "MrvData",
            "id":buildingId,
            "unit": unit,
            "year": year,
            "energyType": type,
            "jan": jan,
            "feb": feb,
            "mar": mar,
            "apr": apr,
            "may": may,
            "jun": jun,
            "jul": jul,
            "aug": aug,
            "sep": sep,
            "oct": oct,
            "nov": nov,
            "dec": dec
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
                    title={yearName}
                />
                <Divider />
                <Card>
                    <CardHeader
                        title="Select Building"
                    />
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
                                label="Jun"
                                name="jun"
                                onChange={handleChange}
                                required
                                value={values.jun}
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
                                label="Dec"
                                name="dec"
                                onChange={handleChange}
                                required
                                value={values.dec}
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
                                label="Jul"
                                name="jul"
                                onChange={handleChange}
                                required
                                value={values.jul}
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
                                label="Jan"
                                name="jan"
                                onChange={handleChange}
                                required
                                value={values.jan}
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
                                label="Aug"
                                name="aug"
                                onChange={handleChange}
                                required
                                value={values.aug}
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
                                label="Feb"
                                name="feb"
                                onChange={handleChange}
                                required
                                value={values.feb}
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
                                label="Sep"
                                name="sep"
                                onChange={handleChange}
                                required
                                value={values.sep}
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
                                label="Mar"
                                name="mar"
                                onChange={handleChange}
                                required
                                value={values.mar}
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
                                label="Oct"
                                name="oct"
                                onChange={handleChange}
                                required
                                value={values.oct}
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
                                label="Apr"
                                name="apr"
                                onChange={handleChange}
                                required
                                value={values.apr}
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
                                label="Nov"
                                name="nov"
                                onChange={handleChange}
                                required
                                value={values.nov}
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
                                label="May"
                                name="may"
                                onChange={handleChange}
                                required
                                value={values.may}
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

DataPage.propTypes = {
    className: PropTypes.string
};

export default DataPage;
