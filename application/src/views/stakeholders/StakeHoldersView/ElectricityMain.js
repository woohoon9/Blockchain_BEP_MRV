import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Box, Card, CardHeader, Divider,
    makeStyles
} from '@material-ui/core';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Page from "../../../components/Page";
import Typography from "@material-ui/core/Typography";
import Data from "./Data";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

function ElectricityTabPanel(props) {
    const { children, value, index, ...other } = props;

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

ElectricityTabPanel.propTypes = {
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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Page
            className={classes.root}
            title="ElectricityMain"
        >
            <Card>
                <CardHeader
                    title="Electricity"
                />
                <Divider />
            </Card>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="First Year" {...a11yProps2(0)} />
                    <Tab label="Second Year" {...a11yProps2(1)} />
                    <Tab label="Third Year" {...a11yProps2(2)} />
                    <Tab label="Fourth Year" {...a11yProps2(3)} />
                    <Tab label="Fifth Year" {...a11yProps2(4)} />
                </Tabs>
            </AppBar>
            <ElectricityTabPanel value={value} index={0}>
                <Data year="First" type="electricity"/>
            </ElectricityTabPanel>
            <ElectricityTabPanel value={value} index={1}>
                <Data year="Second" type="electricity"/>
            </ElectricityTabPanel>
            <ElectricityTabPanel value={value} index={2}>
                <Data year="Third" type="electricity"/>
            </ElectricityTabPanel>
            <ElectricityTabPanel value={value} index={3}>
                <Data year="Fourth" type="electricity"/>
            </ElectricityTabPanel>
            <ElectricityTabPanel value={value} index={4}>
                <Data year="Fifth" type="electricity"/>
            </ElectricityTabPanel>
        </Page>

    );
};

export default Measurement;
