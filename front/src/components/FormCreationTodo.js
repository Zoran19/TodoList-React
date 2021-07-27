import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import Button from "@material-ui/core/Button";
import {createTodo} from "../store/actions";
import { connect } from "react-redux";
import {useHistory, useParams} from "react-router-dom";
import Typography from "@material-ui/core/Typography";





 function FormCreationTodo(props) {

     const [state,setState]=useState({creationError:false});
     const [todo,setTodo]=useState({mail:"",password:""});

     const { list } = useParams();
     let history = useHistory();

     const  submitCreationTodo = async () => {
         try {
             await props.createTodo(todo.title,todo.description,list);
             history.push("/app/home")
         } catch (e) {
             setState({ creationError: true });
         }
     };


    const [selectedDateBegin, setSelectedDateBegin] = React.useState(Date.now());
    const [selectedDateFinish, setSelectedDateFinish] = React.useState(Date.now());

    const handleDateChangeBegin = (date) => {
        setSelectedDateBegin(date);
    };

    const handleDateChangeFinish = (date) => {
        setSelectedDateFinish(date);
    };

    return (

        <React.Fragment>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                xs={12} sm={12}>

                <Grid item sm={6} xs={12} container spacing={2} style={{backgroundColor:"white",padding:"2%",borderRadius:"5px",margin:"2%",marginBottom:"5%",}}>
                    <Grid item sm={12} xs={12}>
                        <Typography variant="h3">Créer une Tâche</Typography>
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Titre de la Tâche"
                            name="title"
                            variant="outlined"
                            value={todo.title}
                            onChange={(event)=>{
                                setTodo({...todo,title:event.target.value})
                            }}
                        />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            name="Description"
                            variant="outlined"
                            multiline={true}
                            rows={10}
                            value={todo.description}
                            onChange={(event)=>{
                                setTodo({...todo,description:event.target.value})
                            }}
                        />
                    </Grid>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid item
                              container
                              direction="row"
                              justify="center"
                              alignItems="center"
                              sm={12} xs={12}>

                            <Grid item sm={6} xs={12}>
                                <KeyboardDatePicker
                                    fullWidth
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="à commencer"
                                    format="dd/MM/yyyy"
                                    value={selectedDateBegin}
                                    onChange={handleDateChangeBegin}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <KeyboardDatePicker
                                    fullWidth
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="à finir au plus tard"
                                    format="dd/MM/yyyy"
                                    value={selectedDateFinish}
                                    onChange={handleDateChangeFinish}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </MuiPickersUtilsProvider>

                    <Grid container
                          item
                          direction="row"
                          justify="center"
                          alignItems="center"
                          xs={12} sm={12}>

                        <Grid item xs={12} sm={2}>
                            <Button variant="contained" color="secondary" onClick={()=>{submitCreationTodo()}}>
                               Créer
                            </Button>
                        </Grid>

                    </Grid>

                </Grid>


            </Grid>
        </React.Fragment>


    );
}


const mapDispatchToProps = {
    createTodo,
};

export default connect(null,mapDispatchToProps)(FormCreationTodo)