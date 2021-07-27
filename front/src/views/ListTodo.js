import React, {useEffect} from 'react';
import CardTodo from "../components/CardTodo";
import {getTodos} from "../store/actions";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import AddBoxIcon from '@material-ui/icons/AddBox';
import {makeStyles} from "@material-ui/core/styles";
import {NavLink} from "react-router-dom";





const useStyles = makeStyles((theme) => ({

    sectionTodo:{
        backgroundColor:"#ebecf0",
    },
    buttonSectionAdd:{
        color:"grey",
        "&:hover":{
            backgroundColor:"#c0392b",
            color:"white",
        },
    },

}));





 function ListTodo(props) {


     useEffect(()=>{
       props.getTodos();
     },[])

     const classes = useStyles();


     return (
        <div>
            <Typography variant={"h4"} style={{color:"white"}}><u><strong>LISTES DES TACHES</strong></u></Typography>
            <br/>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={2}
            >

                <Grid item>
                    <Card className={classes.sectionTodo} >
                        <Grid item>
                            <CardContent>
                                <Typography gutterBottom variant="h5"  style={{textAlign:"left",backgroundColor:"#c0392b",borderRadius:"5px",color:"white",paddingLeft:"15px"}}>
                                  A FAIRE
                                </Typography>
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    {props.todos.map((todo) => {
                                            if (todo.state === "todo") {
                                                return(<Grid item key={todo._id}>
                                                    <CardTodo id={todo._id} title={todo.title}
                                                              description={todo.description} finishDisabled={false} todoDisabled={true} progressDisabled={false}/>
                                                </Grid>
                                            )}
                                        }
                                    )}
                                </Grid>
                            </CardContent>
                        </Grid>
                        <CardActions>
                            <Grid container
                                  direction="row"
                                  justify="center"
                                  alignItems="center">

                                <Grid item>
                                    <Button   className={classes.buttonSectionAdd} startIcon={<AddBoxIcon />} component={NavLink} to={`/app/todo/create/todo`}>
                                        Ajouter une autre carte
                                    </Button>
                                </Grid>
                            </Grid>

                        </CardActions>
                    </Card>
                </Grid>





                <Grid item>
                    <Card className={classes.section}>
                        <Grid item>
                            <CardContent>
                                <Typography gutterBottom variant="h5"   style={{textAlign:"left",backgroundColor:"#2980b9",borderRadius:"5px",color:"white",paddingLeft:"15px"}}>
                                   EN COURS
                                </Typography>
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    {props.todos.map((todo) => {
                                            if (todo.state === "progress") {
                                                return(<Grid item key={todo._id}>
                                                        <CardTodo id={todo._id} title={todo.title}
                                                                  description={todo.description} finishDisabled={false} todoDisabled={false} progressDisabled={true}/>
                                                    </Grid>
                                                )}
                                        }
                                    )}
                                </Grid>
                            </CardContent>
                        </Grid>
                        <CardActions>
                            <Grid container
                                  direction="row"
                                  justify="center"
                                  alignItems="center">

                                <Grid item>
                                    <Button  className={classes.buttonSectionAdd}  startIcon={<AddBoxIcon />} component={NavLink} to={`/app/todo/create/progress`}>
                                        Ajouter une autre carte
                                    </Button>
                                </Grid>
                            </Grid>

                        </CardActions>
                    </Card>

                </Grid>



                <Grid item>
                    <Card className={classes.section}>
                        <Grid item>
                            <CardContent>
                                <Typography gutterBottom variant="h5" style={{textAlign:"left",backgroundColor:"#9ACD32",borderRadius:"5px",color:"white",paddingLeft:"15px"}} >
                                    TERMINER
                                </Typography>
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                    spacing={2}
                                >
                                    {props.todos.map((todo) => {
                                            if (todo.state === "finish") {
                                                return(<Grid item key={todo._id}>
                                                        <CardTodo id={todo._id} title={todo.title}
                                                                  description={todo.description} finishDisabled={true} todoDisabled={false} progressDisabled={false}/>
                                                    </Grid>
                                                )}
                                        }
                                    )}
                                </Grid>
                            </CardContent>
                        </Grid>
                        <CardActions>
                            <Grid container
                                  direction="row"
                                  justify="center"
                                  alignItems="center">

                                <Grid item>
                                    <Button  className={classes.buttonSectionAdd}  startIcon={<AddBoxIcon />} component={NavLink} to={`/app/todo/create/finish`}>
                                        Ajouter une autre carte
                                    </Button>
                                </Grid>
                            </Grid>

                        </CardActions>
                    </Card>

                </Grid>


            </Grid>
        </div>

    );
}


const mapStateToProps = (state) => {
    return {
        todos: state.todo.todos
    };
};

const mapDispatchToProps = {
    getTodos,
};

export default connect(mapStateToProps,mapDispatchToProps)(ListTodo)