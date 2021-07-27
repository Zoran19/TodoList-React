import {GET_TODOS, UPDATE_ONE_TODO} from "./actionTypes";

import { restAPI } from "../../config/axiosConfig";

const saveTodos = (todosData) => {
    return {
        type: GET_TODOS,
        todosData,
    };
};

export const getTodos = () => {
    return (dispatch) => {
        return restAPI
            .get("/todos")
            .then((response) => {
                return dispatch(saveTodos(response.data));
            });
    };
};

// export const getOneTodo = (todoId) => {
//     return (dispatch) => {
//         return restAPI
//             .get("/todos/" + todoId )
//             .then((response) => {
//                 return dispatch(saveTodos(response.data));
//             });
//     };
// };

export const createTodo = (title,description,state) => {
    return (dispatch) => {
        return restAPI
            .post("/todos" ,{
                todo:{ title,
                    description,
                    state
                }

            })
            .then(() => {
                return dispatch(getTodos());
            });
    };
};

export const deleteTodo = (todoId) => {
    return (dispatch) => {
        return restAPI
            .delete("/todos/" + todoId)
            .then(() => {
                return dispatch(getTodos());
            });
    };
};


export const modifyTodo = (todoId,dto) => {
    return (dispatch) => {
        return restAPI
            .put("/todos/" + todoId,{
                todo: dto
            })
            .then(() => {
                return dispatch(getTodos());
            });
    };
};