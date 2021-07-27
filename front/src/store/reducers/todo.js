import {GET_TODOS} from "../actions/actionTypes";


export const initialState = {
    todos: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TODOS:
            return {
                ...state,
                todos: action.todosData,
            };
        default:
            return state;
    }
};

export default reducer;