
import { Button, ClickAwayListener, Grid, makeStyles, TextField } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import { Add } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addNewTask, deleteTask, editTask } from '../redux/actions/common';

const useStyles = makeStyles(theme => ({
    label: {
        textTransform: 'none',
        justifyContent: 'flex-start'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    item: {
        zIndex: 10000
    },
    newTask: {
        padding: 10
    },
    textArea: {
        border: 0,
        width: '100%'
    },
    buttons: {
        backgroundColor: '#5cbf51',
        width: 150,
        color: '#FFFFFF'
    },
    saveButton: {
        marginRight: 10
    },
    buttonsContainer: {
        marginTop: 10
    }
}))

export default function AddNewTask({ droppableId, isEditing, taskId, taskContent, onFinishEditing }) {

    const classes = useStyles();

    const dispatch = useDispatch();

    const [isAddingNew, setIsAddingNew] = useState(false);
    const [newtaskContent, setNewtaskContent] = useState(isEditing ? taskContent : '');
    const [hasNoContent, setHasNoContent] = useState(false);

    const handleAddNewButton = () => {
        setIsAddingNew(true);
        setNewtaskContent('');
    }

    const handleSaveButton = () => {
        if (!newtaskContent) {
            setHasNoContent(true);
            return;
        }
        if (!isEditing) {
            dispatch(addNewTask(droppableId, uuidv4(), newtaskContent));
            setNewtaskContent('');
            setIsAddingNew(false);
        } else {
            dispatch(editTask(droppableId, taskId, newtaskContent));
            onFinishEditing();
        }
    }

    const handleCancelButton = () => {
        setIsAddingNew(false);
        setNewtaskContent('');
    }

    const handleDeleteButton = () => {
        dispatch(deleteTask(droppableId, taskId));
        onFinishEditing();
    }

    const handleTaskContentChange = (event) => {
        const value = event.target.value;
        setNewtaskContent(value);
        if (value) {
            setHasNoContent(false);
        }
    }

    const handleOnClickAway = () => {
        if (isEditing) {
            onFinishEditing();
        } else {
            setIsAddingNew(false);
            setNewtaskContent('');
        }
    }

    return (
        <React.Fragment>
            {(isAddingNew || isEditing) &&
                <ClickAwayListener onClickAway={handleOnClickAway}>
                    <Grid item className={classes.item}>
                        <Paper className={classes.newTask}>
                            <TextField
                                id="new-task-content"
                                error={hasNoContent}
                                className={classes.textArea}
                                multiline
                                rowsMax={4}
                                value={newtaskContent}
                                onChange={handleTaskContentChange}
                                helperText={hasNoContent ? 'Task content is required' : ''}
                                variant="outlined"
                            />
                        </Paper>
                        <div className={classes.buttonsContainer}>
                            <Button
                                id="save-button"
                                onClick={handleSaveButton}
                                variant="contained"
                                className={`${classes.buttons} ${classes.saveButton}`}>
                                Save
                            </Button>
                            {!isEditing && <Button
                                id="cancel-button"
                                onClick={handleCancelButton}
                                variant="contained"
                                className={classes.buttons}>
                                Cancel
                            </Button>}
                            {isEditing && <Button
                                id="delete-button"
                                onClick={handleDeleteButton}
                                variant="contained"
                                className={classes.buttons}>
                                Delete
                            </Button>}
                        </div>
                    </Grid>
                </ClickAwayListener>}
            {!isEditing && (
                <Button
                    id={`add-new-task-${droppableId}`}
                    onClick={handleAddNewButton}
                    color="primary"
                    className={classes.label}
                    startIcon={<Add></Add>}>
                    Add another card
                </Button>)}
            <Backdrop className={classes.backdrop} open={isAddingNew || Boolean(isEditing)} />
        </React.Fragment >
    )
}