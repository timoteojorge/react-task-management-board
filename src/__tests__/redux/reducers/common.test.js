import {
    ADD_NEW_TASK, CHANGE_COLUMN_NAME, DELETE_TASK, EDIT_TASK, SET_LIST_OF_TASKS
} from '../../../redux/actions/actionTypes';
import reducer from '../../../redux/reducers/common';

const initialState = {
    common: {
        firstColumn: {
            data: [],
            name: 'Column 1'
        },
        secondColumn: {
            data: [],
            name: 'Column 2'
        },
        thirdColumn: {
            data: [],
            name: 'DONE'
        },
    }
};

describe('common reducer', () => {
    it('should return the default state', () => {
        expect(reducer(undefined, {})).toEqual({})
    })

    it('should add task to the column list', () => {
        const listId = 'firstColumn';
        const taskId = 1;
        const taskContent = 'some task';
        const payload = {
            listId,
            taskId,
            taskContent
        }
        const expected = {
            data: [{ id: taskId, content: taskContent }],
            name: 'Column 1'
        }
        const action = {
            type: ADD_NEW_TASK,
            payload
        }
        expect(reducer(initialState.common, action).firstColumn).toEqual(expected);
    });
    
    it('should add change column name', () => {
        const listId = 'firstColumn';
        const columnName = 'new column name';
        const payload = {
            listId,
            columnName
        }
        const action = {
            type: CHANGE_COLUMN_NAME,
            payload
        }
        expect(reducer(initialState.common, action).firstColumn.name).toEqual(columnName);
    });

    it('should add replace list of tasks', () => {
        const listId = 'firstColumn';
        const taskId = 1;
        const taskContent = 'some task';
        const newList =  [{ id: taskId, content: taskContent }];
        const payload = {
            listId,
            newList
        }
        const action = {
            type: SET_LIST_OF_TASKS,
            payload
        }
        expect(reducer(initialState.common, action).firstColumn.data).toEqual(newList);
    });

    it('should edit a task', () => {
        const listId = 'firstColumn';
        const taskId = 1;
        const taskContent = 'some task';
        const newTaskContent = 'some task modified';
        initialState.common.firstColumn.data = [{ id: taskId, content: taskContent }];
        const payload = {
            listId,
            taskId,
            taskContent: newTaskContent
        }
        const action = {
            type: EDIT_TASK,
            payload
        }
        expect(reducer(initialState.common, action).firstColumn.data[0].content).toEqual(newTaskContent);
    });

    it('should delete a task', () => {
        const listId = 'firstColumn';
        const taskId = 1;
        const taskContent = 'some task';
        initialState.common.firstColumn.data = [{ id: taskId, content: taskContent }];
        const payload = {
            listId,
            taskId
        }
        const action = {
            type: DELETE_TASK,
            payload
        }
        expect(reducer(initialState.common, action).firstColumn.data.length).toEqual(0);
    });
});