import { createStore } from 'redux';
import rootReducer from "./reducers";

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

export default createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

