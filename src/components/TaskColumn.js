import { Grid, makeStyles, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Create } from '@material-ui/icons';
import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { changeColumnTitle } from '../redux/actions/common';
import AddNewTask from './AddNewTask';

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? 'lightgreen' : 'white',
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : '#ebecf0',
    padding: grid,
    width: '100%',
    borderRadius: 5
});

const useStyles = makeStyles({
    columnTitle: {
        padding: 10
    },
    editIcon: {
        cursor: 'pointer',
        float: 'right'
    }
})

export default function TaskColumn({ droppableId }) {

    const dispatch = useDispatch();
    const state = useSelector(state => state.common[droppableId]);
    const classes = useStyles();
    const [editColumnName, setEditColumnName] = useState(false);
    const [columnName, setColumnName] = useState(state.name);
    const [showEditIconArray, setShowEditIconArray] = useState(new Array(state.data.length).fill(false));
    const [editTaskArray, setEditTaskArray] = useState(new Array(state.data.length).fill(false));

    const handleMouseOver = (index) => {
        showEditIconArray[index] = true;
        setShowEditIconArray([...showEditIconArray]);
    }

    const handleMouseOut = (index) => {
        showEditIconArray[index] = false;
        setShowEditIconArray([...showEditIconArray]);
    }

    const handleEditClick = (index) => {
        editTaskArray[index] = true;
        setEditTaskArray([...editTaskArray]);
    }

    const onFinishEditing = (index) => {
        editTaskArray[index] = false;
        showEditIconArray[index] = false;
        setEditTaskArray([...editTaskArray]);
    }

    const handleColumnNameKeypress = (event) => {
        if (event.keyCode === 13) {
            dispatch(changeColumnTitle(droppableId, columnName));
            setEditColumnName(false);
        } else if (event.keyCode === 27) {
            setEditColumnName(false);
        }
    }

    const renderRow = (item, index) => {
        if (editTaskArray[index]) {
            return (
                <AddNewTask
                    key={item.id}
                    onFinishEditing={() => onFinishEditing(index)}
                    taskId={item.id}
                    taskContent={item.content}
                    droppableId={droppableId}
                    isEditing={true}></AddNewTask>
            );
        } else {
            return (
                <Grid item key={item.id}>
                    <Draggable
                        draggableId={item.id}
                        index={index}>
                        {(provided, snapshot) => (
                            <Paper
                                onMouseOver={() => handleMouseOver(index)}
                                onMouseLeave={() => handleMouseOut(index)}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                )}>
                                {item.content}
                                {showEditIconArray[index] && (
                                    <Create
                                        onClick={() => handleEditClick(index)}
                                        className={classes.editIcon}></Create>
                                )}
                            </Paper>
                        )}
                    </Draggable>
                </Grid>
            );
        }
    }

    return (
        <React.Fragment>
            <Droppable droppableId={droppableId}>
                {(provided, snapshot) => (
                    <Grid container spacing={1} direction="column"
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}>
                        <div className={classes.columnTitle} >
                            {!editColumnName && <Typography onClick={() => setEditColumnName(true)} variant="h6">{state.name}</Typography>}
                            {editColumnName && (
                                <TextField
                                    autoFocus
                                    onKeyDown={handleColumnNameKeypress}
                                    onChange={(event) => setColumnName(event.target.value)}
                                    helperText="Press enter to finish or esc to abort"
                                    value={columnName} />
                            )}
                        </div>
                        {state.data.map((item, index) =>
                            renderRow(item, index)
                        )}
                        {provided.placeholder}
                        <AddNewTask droppableId={droppableId}></AddNewTask>
                    </Grid>
                )}
            </Droppable>
        </React.Fragment>
    );
}