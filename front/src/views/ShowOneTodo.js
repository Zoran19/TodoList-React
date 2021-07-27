import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {deleteTodo, modifyTodo} from "../store/actions";
import {connect} from "react-redux";
import {NavLink, useParams} from "react-router-dom";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});


function ShowOneTodo(props) {
    const classes = useStyles();
    let history = useHistory();
    let { id } = useParams();
    const found = props.todos?.find(element=> element._id===id);
    const [state,setState]=useState({deleteError:false});
    const [state2,setState2]=useState({finishError:false});

    const  submitDeleteTodo = async () => {
        try {
            await props.deleteTodo(found._id);

        } catch (e) {
            setState({ deleteError: true });
        }
    };

    const  submitFinishTodo = async (newState) => {

        try {
            props.modifyTodo(found._id, {title: found.title, description: found.description ,state:newState});
        }
        catch (e) {
            setState2({ finishError: true });
        }
    };


    if (!found)
    {
        history.push("/app/home")
    }

    return (
            <React.Fragment >
                {found  &&
                <Grid container
                      item
                      direction="row"
                      justify="center"
                      alignItems="center"
                      xs={12} sm={12}  >
                    <Grid item>
                <Card className={classes.root}>
                    <CardActionArea>
                        {found.state==="todo"? <h3 style={{backgroundColor:"#c0392b",color:"white",padding:"2%"}}><strong>A FAIRE</strong></h3>
                            : found.state==="progress"?<h3 style={{backgroundColor:"#2980b9",color:"white",padding:"2%"}}><strong>EN COURS</strong></h3>
                                : found.state==="finish"?<h3 style={{backgroundColor:"#9ACD32",color:"white",padding:"2%"}}><strong>TERMINER</strong></h3>
                                    :null}

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {found.title.toUpperCase()}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {found.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" variant="contained" color="primary" style={{backgroundColor: "#9ACD32"}} onClick={() => {submitFinishTodo("finish")}}>
                            Terminer
                        </Button>
                        <Button size="small" variant="contained" color="primary" style={{backgroundColor: "#2980b9"}}
                                component={NavLink} to={`/app/todos/modify/${id}`} >
                            Modifier
                        </Button>
                        <Button size="small" variant="contained" color="primary" style={{backgroundColor: "#c0392b"}} onClick={() => {submitDeleteTodo()}}>
                            Supprimer
                        </Button>
                    </CardActions>
                </Card>
                    </Grid>
                </Grid>

                }
                <Button  startIcon={<ArrowBackIcon />} component={NavLink} to={`/app/home`} style={{backgroundColor: "#16a085",marginTop:"4%",marginBottom:"5%"}}  variant="contained" color="primary"> Retourner à la liste des tâches</Button>
            </React.Fragment>

);
}

const mapStateToProps = (state) => {
    return {
        todos: state.todo.todos
    };
};



const mapDispatchToProps = {
    deleteTodo,
    modifyTodo,
};

export default connect(mapStateToProps,mapDispatchToProps)(ShowOneTodo)