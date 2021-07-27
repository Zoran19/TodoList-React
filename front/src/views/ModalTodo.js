import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ShowOneTodo from "./ShowOneTodo";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {NavLink, useHistory, useParams} from "react-router-dom";
import {deleteTodo} from "../store/actions";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

 function ModalTodo(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    let history = useHistory();
    const [state,setState]=useState({deleteError:false});





    let { id } = useParams();
    const found = props.todos.find(element=> element._id===id);

    if (!found){history.push("/app/home")}


    const  submitDeleteTodo = async () => {
        try {
            await props.deleteTodo(found._id);

        } catch (e) {
            setState({ deleteError: true });
        }
    };


    return (
        <div>
            <button type="button" onClick={handleOpen}>
                react-transition-group
            </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                {found && <Fade in={open}>
                    <div className={classes.paper}>



                        <Grid container
                              item
                              direction="row"
                              justify="center"
                              alignItems="center"
                              xs={12} sm={12} >
                            <Grid item>
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <p>Categorie tache (ex:terminer)</p>
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
                                        <Button size="small" variant="contained" color="primary" style={{backgroundColor: "#40f218"}}>
                                            Terminer
                                        </Button>
                                        <Button size="small" variant="contained" color="primary" style={{backgroundColor: "#2980b9"}}
                                                component={NavLink} to={`/app/todos/modify/${id}`} >
                                            Modifier
                                        </Button>
                                        <Button size="small" variant="contained" color="primary" style={{backgroundColor: "#c0392b"}} onClick={() => {
                                            submitDeleteTodo()
                                        }}>
                                            Supprimer
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>



                    </div>
                </Fade>}
            </Modal>
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        todos: state.todo.todos
    };
};



const mapDispatchToProps = {
    deleteTodo,
};


export default connect(mapStateToProps,mapDispatchToProps)(ModalTodo)