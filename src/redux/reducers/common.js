import { ADD_NEW_TASK, CHANGE_COLUMN_NAME, DELETE_TASK, EDIT_TASK, SET_LIST_OF_TASKS } from "../actions/actionTypes";

export default function (state = {}, action) {
    switch (action.type) {
        case SET_LIST_OF_TASKS: {
            return {
                ...state,
                [action.payload.listId]: {
                    ...state[action.payload.listId],
                    data: action.payload.newList
                }
            }
        }
        case ADD_NEW_TASK: {
            return {
                ...state,
                [action.payload.listId]: {
                    ...state[action.payload.listId],
                    data: [
                        ...state[action.payload.listId].data,
                        {
                            id: action.payload.taskId,
                            content: action.payload.taskContent
                        }
                    ]
                }
            }
        }
        case EDIT_TASK: {
            return {
                ...state,
                [action.payload.listId]: {
                    ...state[action.payload.listId],
                    data: [
                        ...state[action.payload.listId].data.slice(0, state[action.payload.listId].data.findIndex(item => item.id === action.payload.taskId)),
                        {
                            id: action.payload.taskId,
                            content: action.payload.taskContent
                        },
                        ...state[action.payload.listId].data.slice(state[action.payload.listId].data.findIndex(item => item.id === action.payload.taskId) + 1, state[action.payload.listId].data.length),
                    ]
                }
            }
        }
        case CHANGE_COLUMN_NAME: {
            return {
                ...state,
                [action.payload.listId]: {
                    ...state[action.payload.listId],
                    name: action.payload.columnName
                }
            }
        }
        case DELETE_TASK: {
            return {
                ...state,
                [action.payload.listId]: {
                    ...state[action.payload.listId],
                    data: [
                        ...state[action.payload.listId].data.filter(item => item.id !== action.payload.taskId)
                    ]
                }
            }
        }
        default:
            return state;
    }
}
