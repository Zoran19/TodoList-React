import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import Link from "@material-ui/core/Link";
import {signUp} from "../../store/actions";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";





 function SignUp(props) {
     const [state,setState]=useState({signUpError:false});
     const [user,setUser]=useState({mail:"",password:""});

   const  submitSignUp = async () => {
         try {
             await props.signUp(user.mail,user.password);
         } catch (e) {
             setState({ signUpError: true });
         }
     };

    return (

        <React.Fragment>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                xs={12} sm={12}>

                <Grid item sm={6} container spacing={2} style={{backgroundColor:"white",padding:"2%",borderRadius:"5px"}}>

                    <Grid item sm={12} xs={12}>
                        <Typography variant={"h6"}>
                            Créer un compte
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

                        <Grid item xs={12} sm={4}>
                            <Grid item sm={12} xs={12}>
                                <Link component={NavLink} to="/auth/login" color={"secondary"}>
                                    Déja un compte ? Se connecter
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
                            <Button   variant="contained" color="secondary" onClick={()=>{submitSignUp()}}>
                                Créer mon compte
                            </Button>
                        </Grid>

                    </Grid>

                </Grid>


            </Grid>
        </React.Fragment>

    );
}








const mapDispatchToProps = {
    signUp,
};

export default connect (null,mapDispatchToProps)(SignUp);