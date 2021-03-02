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
import DataPage from "./Data";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

function TabPanel(props) {
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

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
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
            title="SteamMain"
        >
            <Card>
                <CardHeader
                    title="Steam"
                />
                <Divider />
            </Card>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="First Year" {...a11yProps(0)} />
                    <Tab label="Second Year" {...a11yProps(1)} />
                    <Tab label="Third Year" {...a11yProps(2)} />
                    <Tab label="Fourth Year" {...a11yProps(3)} />
                    <Tab label="Fifth Year" {...a11yProps(4)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <DataPage year="First" type="steam" />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DataPage year="Second" type="steam" />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <DataPage year="Third" type="steam" />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <DataPage year="Fourth" type="steam" />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <DataPage year="Fifth" type="steam" />
            </TabPanel>
        </Page>

    );
};

export default Measurement;
