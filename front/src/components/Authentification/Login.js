import React, { useState }from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import {NavLink} from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../store/actions";
import Typography from "@material-ui/core/Typography";





function Login(props) {
    const [state,setState]=useState({loginError:false});
    const [user,setUser]=useState({mail:"",password:""});

   const  login = async () => {
        try {
            await props.login(user.mail,user.password);
        } catch (e) {
            setState({loginError:true});
        }
    };
    return (


    <React.Fragment>
        <Grid
            container
            item
            direction="row"
            justify="center"
            alignItems="center"
            xs={12} sm={12}>

            <Grid item sm={6} container spacing={2} style={{backgroundColor:"white",padding:"2%",borderRadius:"5px"}}>

                <Grid item sm={12} xs={12}>
                    <Typography variant={"h6"}>
                        Connexion
                    </Typography>
                </Grid>

                <Grid item sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="Mail"
                        name="mail"
                        color={"secondary"}
                        variant="outlined"
                        value={user.mail}
                        onChange={(event)=>{
                            setUser({...user,mail:event.target.value})
                        }}
                    />
                </Grid>
                <Grid item sm={12} xs={12}>
                    <TextField
                        fullWidth
                        label="mot de passe"
                        color={"secondary"}
                        name="password"
                        variant="outlined"
                        value={user.password}
                        onChange={(event)=>{
                            setUser({...user,password:event.target.value})
                        }}
                    />
                </Grid>




                <Grid container
                      item
                      direction="row"
                      justify="flex-start"
                      alignItems="center"
                      xs={12} sm={12}>

                    <Grid item xs={12} sm={2}>
                        <Grid item sm={12} xs={12}>
                            <Link component={NavLink} to="/auth/SignUp" color={"secondary"}>
                                Créer un compte
                            </Link>
                        </Grid>
                    </Grid>

                </Grid>


                <Grid container
                      item
                      direction="row"
                      justify="center"
                      alignItems="center"
                      xs={12} sm={12}>

                    <Grid item xs={12} sm={4}>
                        <Button variant="contained" color="secondary"  onClick={()=>{login()}}>
                            Connexion
                        </Button>
                    </Grid>

                </Grid>

            </Grid>


        </Grid>
    </React.Fragment>

    );
}

const mapDispatchToProps = {
    login,
};

export default connect (null,mapDispatchToProps)(Login);


