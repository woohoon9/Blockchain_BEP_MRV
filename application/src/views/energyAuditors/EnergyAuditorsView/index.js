import React, {useState} from 'react';
import {
    Card, CardContent,
    CardHeader,
    Container, Divider, Grid,
    makeStyles, TextField
} from '@material-ui/core';
import Page from 'src/components/Page';
import Box from '@material-ui/core/Box';
import data from "./data";
import Toolbar from "./Toolbar";
import Results from "./Results";
import {Tool} from "react-feather";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const EnergyAuditorsView = () => {
    const classes = useStyles();
    const [customers] = useState(data);

    return (
        <Page
            className={classes.root}
            title="Customers"
        >
            <Card>
                <CardHeader
                    title="Energy Saving Auditors"
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
                        name="buildingName"
                        required
                        value="CTRB"
                        variant="outlined"
                    />
                </Grid>
                    </Grid>
                </CardContent>
                <Divider />
            </Card>
            <Container maxWidth={false}>
                <Box mt={3}>
                    <Results customers={customers} />
                </Box>
                <Toolbar />
            </Container>
        </Page>
    );
};

export default EnergyAuditorsView;
