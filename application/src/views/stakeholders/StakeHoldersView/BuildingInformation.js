import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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
import hlsdk from 'src/utils/hlfutils';

const useStyles = makeStyles(() => ({
    root: {}
}));

const BuildingInformation = ({ className, ...rest }) => {
    const classes = useStyles();
    const [values, setValues] = useState({
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
        console.log("test")
        console.log(hlsdk.getRootPath());
        console.log(hlsdk.getWalletPath());
        // alert(hlsdk.getRNFSPath());

    };

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
