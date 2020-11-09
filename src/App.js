import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import TaskColumn from './components/TaskColumn';
import { setListOfTasks } from './redux/actions/common';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const useStyles = makeStyles({
  title: {
    padding: 20,
    paddingBottom: 0
  },
  container: {
    padding: 20
  }
})

export default function App() {

  const common = useSelector(state => state.common);
  const dispatch = useDispatch();
  const classes = useStyles();

  const getList = listId => common[listId].data;

  const onDragEnd = dragEvent => {
    const { source, destination } = dragEvent;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );
      dispatch(setListOfTasks(source.droppableId, items));
    } else {
      const result = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );
      dispatch(setListOfTasks(source.droppableId, result[source.droppableId]));
      dispatch(setListOfTasks(destination.droppableId, result[destination.droppableId]));
    }
  };

  return (
    <React.Fragment >
      <Typography variant="h4" color="secondary" className={classes.title}>
        TASK MANAGEMENT BOARD
      </Typography>
      <div className={classes.container}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container direction="row" spacing={2} justify="space-between">
            <Grid item classes={classes.column} xs={4}>
              <TaskColumn droppableId="firstColumn"></TaskColumn>
            </Grid>
            <Grid item classes={classes.column} xs={4}>
              <TaskColumn droppableId="secondColumn"></TaskColumn>
            </Grid>
            <Grid item classes={classes.column} xs={4}>
              <TaskColumn droppableId="thirdColumn"></TaskColumn>
            </Grid>
          </Grid>
        </DragDropContext>
      </div>
    </React.Fragment>
  );
}