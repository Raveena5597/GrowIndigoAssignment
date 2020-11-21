import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import history from '../history';
import axios from 'axios';


const useStyles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class DetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.location.state;
        console.log(this.state)
        this.state = {
            mobile: this.state.mobileno,
            name: '',
            email: '',
        }
    }
    sendDetails = async () => {
        const n = this.state.name;
        console.log('name=' + n);
        const e = this.state.email;
        console.log('email=' + e);

        const m = this.state.mobile;
        console.log('mobiel=' + m);

        await axios.post("http://localhost:8000/createuser", {
            name: n,
            email: e,
            mobile: m
        })
            .then(data => history.push('/success', this.state))
            .catch(err => console.log(err));
    };

    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>

                    </Avatar>
                    <Typography component="h1" variant="h5">
                        User Details
        </Typography>
                    <div className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="name"
                                    label="Name"
                                    type="text"
                                    id="name"
                                    value={this.state.name}
                                    onChange={n => this.setState({ name: n.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="email"
                                    label="Email Id"
                                    type="email"
                                    id="email"
                                    value={this.state.email}
                                    onChange={e => this.setState({ email: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                        <Button xs={12}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.sendDetails}>
                            Submit
          </Button>

                    </div>
                </div>
            </Container>
        );
    }
}
export default withStyles(useStyles)(DetailsPage);
