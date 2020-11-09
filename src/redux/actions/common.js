const { SET_LIST_OF_TASKS, ADD_NEW_TASK, EDIT_TASK, CHANGE_COLUMN_NAME, DELETE_TASK } = require("./actionTypes")

export const setListOfTasks = (listId, newList) => ({
    type: SET_LIST_OF_TASKS,
    payload: {
        listId,
        newList
    }
})

export const addNewTask = (listId, taskId, taskContent) => ({
    type: ADD_NEW_TASK,
    payload: {
        listId,
        taskId,
        taskContent
    }
})

export const editTask = (listId, taskId, taskContent) => ({
    type: EDIT_TASK,
    payload: {
        listId,
        taskId,
        taskContent
    }
})

export const changeColumnTitle = (listId, columnName) => ({
    type: CHANGE_COLUMN_NAME,
    payload: {
        listId,
        columnName
    }
})

export const deleteTask = (listId, taskId) => ({
    type: DELETE_TASK,
    payload: {
        listId,
        taskId
    }
})