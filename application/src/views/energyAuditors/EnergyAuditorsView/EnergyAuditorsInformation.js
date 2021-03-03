import React, { useState } from 'react';
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
    makeStyles, Container
} from '@material-ui/core';
import Toolbar from "../../customer/CustomerListView/Toolbar";
import Results from "../../customer/CustomerListView/Results";
import Page from "../../../components/Page";
import data from "./data";

const useStyles = makeStyles(() => ({
    root: {}
}));

const EnergyAuditorsView = ({ className, ...rest }) => {
    const classes = useStyles();
    const [customers] = useState(data);

    return (
        <Page
            className={classes.root}
            title="Customers"
        >
            <Container maxWidth={false}>
                <Toolbar />
                <Box mt={3}>
                    <Results customers={customers} />
                </Box>
            </Container>
        </Page>
    );
};

EnergyAuditorsView.propTypes = {
    className: PropTypes.string
};

export default EnergyAuditorsView;
