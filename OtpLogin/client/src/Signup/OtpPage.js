import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import history from '../history';
import axios from 'axios';

function isNumeric(n) {
    return !isNaN(parseInt(n)) && isFinite(n);
}

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

class OtpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.location.state;
        console.log(this.state)
        this.state = {
            mobileno: this.state.mobileno,
            name: '',
            email: '',
            otp: '',
            isLogin: this.state.isLogin
        };
    }

    verifyCode = async () => {
        console.log('Verify' + this.state)
        const mobileno = 91 + this.state.mobileno;
        await axios.get("http://localhost:8000/verify/verifycode", {
            params: {
                phonenumber: mobileno,
                code: this.state.otp
            }
        })
            .then(response => this.parseData(response))
            .catch(err => console.log(err));
    }

    parseData(response) {
        if (response.data.valid) {
            if (this.state.isLogin)
                this.findUser()
            else
                history.push('./userdetails', this.state);
        } else {
            window.alert('Invalid OTP.');
        }
    }

    findUser = async () => {
        console.log('Verify' + this.state)
        const mobileno = this.state.mobileno;
        await axios.get("http://localhost:8000/findUser", {
            params: {
                mobileno: mobileno
            }
        })
            .then(response => this.parseUserResponse(response))
            .catch(err => console.log(err));
    }

    parseUserResponse(response) {
        if (response.data.userexists) {
            window.alert('You are logged in.');
        } else {
            window.alert('You are not registered with us. Please signup.');
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Verify OTP
                </Typography>
                    <div className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="otp"
                                    label="otp"
                                    type="number"
                                    value={this.state.otp}
                                    onChange={e => this.setState({ otp: e.target.value })}
                                    id="otp"
                                />
                            </Grid>
                        </Grid>
                        <Button xs={12}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={(this.state.otp.length !== 6) || !isNumeric(this.state.otp)}
                            onClick={this.verifyCode}>
                            Verify
                            </Button>
                    </div>
                </div>
            </Container>
        );
    }
}

export default withStyles(useStyles)(OtpPage);
