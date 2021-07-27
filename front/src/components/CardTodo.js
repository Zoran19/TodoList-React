import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {deleteTodo, modifyTodo} from "../store/actions";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import CreateIcon from '@material-ui/icons/Create';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ButtonGroup from "@material-ui/core/ButtonGroup";









const useStyles = makeStyles({
    todos:{
        maxWidth: 345,
        backgroundColor:"#ffffff",
       boxShadow: "1px 1px 5px grey",

        "&:hover":{
            backgroundColor: "#f7f5f2",
           // transform:  "scale(1.5);",
            "& $todoIcon":{
                display:"initial",
            },

        },


    },
    title:{
        margin:"5%",
        border:"1px solid #2ecc71",
        backgroundColor:"#2ecc71",
        borderRadius:"5px",
        boxShadow: "2px 2px 10px black",
        marginBottom:"10%",
        padding:"5%",
    },
    description:{
        padding:"10%",
    },

    todoIcon:{
        display:"none",
    },

    buttonStateToDo:{
        backgroundColor:"#c0392b",
        color:"white",
        "&:hover":{
            backgroundColor:"#ff4f4f",
        },
    },
    buttonStateProgress:{
        backgroundColor:"#2980b9",
        color:"white",
        "&:hover":{
            backgroundColor:"#28a0ef",
        },
    },

    buttonStateFinish:{
        backgroundColor:"#9ACD32",
        color:"white",
        "&:hover":{
            backgroundColor:"#16a085",
        },
    }
});




 function CardTodo(props) {
    const classes = useStyles();

     const [state,setState]=useState({creationError:false});
     const found = props.todos.find(element=> element._id===props.id);
     const [todo,setTodo]=useState({title:`${found.title}`,description:`${found.description}`,state:`${found.state}`});

     const  submitModifyTodo = async (newState) => {

         try {
             props.modifyTodo(props.id, {...todo,state:newState});
         }
         catch (e) {
             setState({ creationError: true });
         }
     };

     return (

        <Card className={`${classes.todos}`} >
            <CardActionArea component={NavLink} to={`/app/todos/${props.id}`}>

                <CardContent>
                    <Grid container
                          item
                          direction="row"
                          justify="center"
                          alignItems="center"
                          sm={12}
                          >

                        <Grid item sm={11}>
                            <Typography  align={"left"} variant="h5" component="h2" >
                            {props.title.toUpperCase()}
                        </Typography>
                        </Grid>
                        <Grid item sm={1}>
                            <ListItemIcon  className={classes.todoIcon}>
                                <CreateIcon  />
                            </ListItemIcon>
                        </Grid>
                    </Grid>


                </CardContent>
            </CardActionArea>
            <CardActions>


                <ButtonGroup variant="text"  aria-label=" text  button group" spacing={1} >
                    <Button className={classes.buttonStateFinish} variant="contained"  disabled={props.finishDisabled} onClick={()=>{submitModifyTodo("finish")}}>Terminer</Button>
                    <Button  className={classes.buttonStateProgress} variant="contained"  disabled={props.progressDisabled} onClick={()=>{submitModifyTodo("progress")}}>En Cours</Button>
                    <Button className={classes.buttonStateToDo} variant="contained"  disabled={props.todoDisabled} onClick={()=>{submitModifyTodo("todo")}}>A Faire</Button>
                </ButtonGroup>


            </CardActions>
        </Card>
    );
}

const mapStateToProps = (state) => {
    return {
        todos: state.todo.todos
    };
};


const mapDispatchToProps = {
    modifyTodo,
};



export default connect(mapStateToProps,mapDispatchToProps)(CardTodo);