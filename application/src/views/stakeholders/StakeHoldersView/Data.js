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

const DataPage = ({ className, year, type, ...rest }) => {
    const classes = useStyles();
    const yearName = year + " Year";
    const [values, setValues] = useState({
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "May",
        jun: "Jun",
        jul: "Jul",
        aug: "Aug",
        sep: "Sep",
        oct: "Oct",
        nov: "Nov",
        dec: "Dec"
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
                    title={yearName}
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
                                label="Jun"
                                name="jun"
                                onChange={handleChange}
                                required
                                value={values.jun}
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
                                label="Dec"
                                name="dec"
                                onChange={handleChange}
                                required
                                value={values.dec}
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
                                label="Jul"
                                name="jul"
                                onChange={handleChange}
                                required
                                value={values.jul}
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
                                label="Jan"
                                name="jan"
                                onChange={handleChange}
                                required
                                value={values.jan}
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
                                label="Aug"
                                name="aug"
                                onChange={handleChange}
                                required
                                value={values.aug}
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
                                label="Feb"
                                name="feb"
                                onChange={handleChange}
                                required
                                value={values.feb}
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
                                label="Sep"
                                name="sep"
                                onChange={handleChange}
                                required
                                value={values.sep}
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
                                label="Mar"
                                name="mar"
                                onChange={handleChange}
                                required
                                value={values.mar}
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
                                label="Oct"
                                name="oct"
                                onChange={handleChange}
                                required
                                value={values.oct}
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
                                label="Apr"
                                name="apr"
                                onChange={handleChange}
                                required
                                value={values.apr}
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
                                label="Nov"
                                name="nov"
                                onChange={handleChange}
                                required
                                value={values.nov}
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
                                label="May"
                                name="may"
                                onChange={handleChange}
                                required
                                value={values.may}
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

DataPage.propTypes = {
    className: PropTypes.string
};

export default DataPage;
