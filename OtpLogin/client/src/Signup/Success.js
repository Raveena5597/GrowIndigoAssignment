import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Container, CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const useStyles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});
class Success extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.form}>
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        <strong>Details saved successfully</strong>
                    </Alert>
                </div>
            </Container>
        );
    }
}
export default withStyles(useStyles)(Success);