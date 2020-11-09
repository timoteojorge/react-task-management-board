import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from "react";
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import AddNewTask from '../../components/AddNewTask';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore([]);

const store = mockStore({
    common: {
        firstColumn: {
            data: [
                { id: '1', content: 'item 1' },
                { id: '2', content: 'item 2' },
                { id: '3', content: 'item 3' }
            ],
            name: 'Column 1'
        }
    }
});

describe('AddNewTask', () => {
    let wrapper;
    beforeAll(() => {
        wrapper = mount(
            <Provider store={store}>
                <AddNewTask droppableId="firstColumn" />
            </Provider>

        )
    });

    it("should render AddNewTask component", () => {
        expect(wrapper.find(AddNewTask).length).toBe(1);
    });

    it("should render add new task button", () => {
        expect(wrapper.find('#add-new-task-firstColumn').hostNodes().length).toBe(1);
    });

    it("should render edition form correctly with save and delete buttons and text input when editing a task", () => {
        wrapper = mount(
            <Provider store={store}>
                <AddNewTask droppableId="firstColumn" isEditing={true} taskId="1" taskContent="item 1"/>
            </Provider>
        )
        expect(wrapper.find('#save-button').hostNodes().length).toBe(1);
        expect(wrapper.find('#delete-button').hostNodes().length).toBe(1);
        expect(wrapper.find('#new-task-content').hostNodes().instance().value).toBe('item 1');
    });

    afterAll(() => {
        wrapper.unmount();
    })

})