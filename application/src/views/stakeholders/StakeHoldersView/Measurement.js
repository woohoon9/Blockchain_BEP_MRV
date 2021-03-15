import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Box, Button, Card, CardContent, CardHeader, Divider, Grid,
    makeStyles, TextField
} from '@material-ui/core';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Page from "../../../components/Page";
import Typography from "@material-ui/core/Typography";
import ElectricityMain from "./ElectricityMain";
import NaturalGasMain from "./NaturalGasMain";
import ChilledWaterMain from "./ChilledWaterMain";
import SteamMain from "./SteamMain";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

function TabPanel2(props) {
    const { children, value, index, buildingID ,...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel2.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps2(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Measurement = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [vals, setVals] = useState({
        tabValue: 0,
        buildingID: '',
        buildings: []
    });

    const handleChange = (event, newValue) => {
        setVals(
            {
                ...vals,
                tabValue: newValue
            }
        )
    };



    return (
        <Page
            className={classes.root}
            title="Measurement"
        >
            <AppBar position="static">
                <Tabs value={vals.tabValue} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="1. Electricity" {...a11yProps2(0)} />
                    <Tab label="2. Natural Gas" {...a11yProps2(1)} />
                    <Tab label="3. Chilled Water" {...a11yProps2(2)} />
                    <Tab label="4. Steam" {...a11yProps2(3)} />
                </Tabs>
            </AppBar>
            <TabPanel2 value={vals.tabValue} index={0}>
                <ElectricityMain />
            </TabPanel2>
            <TabPanel2 value={vals.tabValue} index={1}>
                <NaturalGasMain />
            </TabPanel2>
            <TabPanel2 value={vals.tabValue} index={2}>
                <ChilledWaterMain />
            </TabPanel2>
            <TabPanel2 value={vals.tabValue} index={3}>
                <SteamMain />
            </TabPanel2>
        </Page>

    );
};

export default Measurement;
