import { setListOfTasks, deleteTask, editTask, addNewTask, changeColumnTitle } from '../../../redux/actions/common'
import * as actionTypes from '../../../redux/actions/actionTypes'

describe('common actions', () => {

    it('should create an action to replace an entire list of tasks', () => {
        const listId = 'firstColumn';
        const taskId = 1;
        const taskContent = 'some task';
        const newList = [{ id: taskId, content: taskContent }];
        const expectedAction = {
            type: actionTypes.SET_LIST_OF_TASKS,
            payload: {
                listId,
                newList
            }
        }
        expect(setListOfTasks(listId, newList)).toEqual(expectedAction);
    });

    it('should create an action to add a new task', () => {
        const listId = 'firstColumn';
        const taskId = 1;
        const taskContent = 'some task';
        const expectedAction = {
            type: actionTypes.ADD_NEW_TASK,
            payload: {
                listId,
                taskId,
                taskContent
            }
        }
        expect(addNewTask(listId, taskId, taskContent)).toEqual(expectedAction);
    });

    it('should create an action to edit a task', () => {
        const listId = 'firstColumn';
        const taskId = 1;
        const taskContent = 'some task';
        const expectedAction = {
            type: actionTypes.EDIT_TASK,
            payload: {
                listId,
                taskId,
                taskContent
            }
        }
        expect(editTask(listId, taskId, taskContent)).toEqual(expectedAction);
    });

    it('should create an action to edit a column name', () => {
        const listId = 'firstColumn';
        const columnName = 'column name';
        const expectedAction = {
            type: actionTypes.CHANGE_COLUMN_NAME,
            payload: {
                listId,
                columnName
            }
        }
        expect(changeColumnTitle(listId, columnName)).toEqual(expectedAction);
    });

    it('should create an action to delete a task', () => {
        const listId = 'firstColumn';
        const taskId = 1;
        const expectedAction = {
            type: actionTypes.DELETE_TASK,
            payload: {
                listId,
                taskId
            }
        }
        expect(deleteTask(listId, taskId)).toEqual(expectedAction);
    });


})
