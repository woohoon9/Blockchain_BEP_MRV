import React, {useState} from 'react';
import {
    Button,
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
import axios from "axios";

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
    // const [customers] = useState(data);
    const [values, setValues] = useState({
        customers: [],
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

    const selectBuilding = (event) => {
        var bID = event.target.value;
        setValues({
            ...values,
            buildingID: event.target.value
        })

        getData(bID)

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

    const getData = async (id) => {
        var url = "http://34.236.242.165:8080/api/mrv/building/es/" + id;
        const response = await axios.get(url, {headers: {'Access-Control-Allow-Origin': 'http://34.236.242.165:8080',}})
        console.log(response.data.esList)
        setValues({
            ...values,
            buildingID: id,
            customers: response.data.esList
        })

    }

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
                <Divider />
            </Card>
            <Container maxWidth={false}>
                <Box mt={3}>
                    <Results customers={values.customers} />
                </Box>
                <Toolbar />
            </Container>
        </Page>
    );
};

export default EnergyAuditorsView;
