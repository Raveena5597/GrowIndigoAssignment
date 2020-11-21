import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import history from '../history';
import '../App.css';
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


class SignUp extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            mobileno: '',
            name:'',
            email:'',
            otp:'',
            isLogin:false
        };
    }

    sendOtp = async () => {
        const mobileno = 91 + this.state.mobileno;
        console.log(mobileno);
        await axios.get("http://localhost:8000/verify/getcode", {
            params: {
                phonenumber: mobileno,
                channel: 'sms'
            }
        })
            .then(data => history.push('/verifyotp', this.state))
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
                        Sign up
                    </Typography>
                    <div className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="mobile"
                                    label="Mobile No."
                                    type="number"
                                    id="mobile"
                                    value={this.state.mobileno}
                                    onChange={e => this.setState({mobileno: e.target.value})}
                                    maxLength="10"
                                    pattern="\d{10}"
                                />
                            </Grid>
                        </Grid>
                        <Button xs={12}
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={(this.state.mobileno.length!==10) || !isNumeric(this.state.mobileno)} 
                            color="primary"
                            className={classes.submit}
                            onClick={this.sendOtp}>
                            Sign Up
</Button>
                        <Grid container justify="flex-end">
                            <Grid item xs={12}>
                                <Link href="./Login">
                                    Already have an account? Sign in
</Link>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Container>
        );
    }
}

export default withStyles(useStyles)(SignUp);