import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from "react";
import { Provider } from 'react-redux';
import TaskColumn from '../../components/TaskColumn';
import configureMockStore from 'redux-mock-store';
import { DragDropContext } from 'react-beautiful-dnd';

configure({ adapter: new Adapter() });

jest.mock('react-beautiful-dnd', () => ({
    Droppable: ({ children }) => children({
        draggableProps: {
            style: {},
        },
        innerRef: jest.fn(),
    }, {}),
    Draggable: ({ children }) => children({
        draggableProps: {
            style: {},
        },
        innerRef: jest.fn(),
    }, {}),
    DragDropContext: ({ children }) => children,
}));

const mockStore = configureMockStore([]);

describe('TaskColumn', () => {
    let wrapper;
    beforeAll(() => {
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

        wrapper = mount(
            <Provider store={store}>
                <DragDropContext onDragEnd={() => { }}>
                    <TaskColumn droppableId="firstColumn" />
                </DragDropContext>
            </Provider>
        )
    });

    it("should render a column with 3 tasks", () => {
        expect(wrapper.find('.MuiPaper-root').length).toBe(3);
    });

    it("should render tasks correctly", () => {
        expect(wrapper.text().includes('item 1')).toBe(true);
        expect(wrapper.text().includes('item 2')).toBe(true);
        expect(wrapper.text().includes('item 3')).toBe(true);
    });

    it("should render add another card button", () => {
        expect(wrapper.text().includes('Add another card')).toBe(true);
    });

    it("should render column name", () => {
        expect(wrapper.text().includes('Column 1')).toBe(true);
    });

    it("should render edit icon when hovering mouse on task", () => {
        wrapper.simulate("mouseover");
        expect(wrapper.find('.MuiSvgIcon-root').length).toBe(1);
    });

    it("should render edition form when clicking on edit icon", () => {
        wrapper.simulate("mouseover");
        const editIcon = wrapper.find('.MuiSvgIcon-root');
        editIcon.simulate('click', {});
        expect(wrapper.find('#new-task-content')).toBeTruthy();
        expect(wrapper.find('#save-button')).toBeTruthy();
        expect(wrapper.find('#delete-button')).toBeTruthy();
    });

    it("should render new task form when clicking on add new button", () => {
        const addNewButton = wrapper.find('#add-new-task-firstColumn').hostNodes();
        addNewButton.simulate('click', {});
        expect(wrapper.find('#new-task-content')).toBeTruthy();
        expect(wrapper.find('#save-button')).toBeTruthy();
        expect(wrapper.find('#cancel-button')).toBeTruthy();
    });

    // it("should add new task when saving form", () => {
    //     const addNewButton = wrapper.find('#add-new-task-firstColumn').hostNodes();
    //     addNewButton.simulate('click', {});
    //     wrapper.find('#new-task-content').hostNodes().simulate('change', { target: { value: 'new task' } });
    //     console.log(wrapper.hostNodes().html());
    //     wrapper.find('#save-button').hostNodes().simulate('click', {});
    //     setImmediate(() => {
    //         expect(wrapper.update().find('.MuiPaper-root').length).toBe(300);
    //     });

    //     // return new Promise(resolve => setImmediate(resolve)).then(() => {
    //     //     wrapper.find('#save-button').hostNodes().simulate('click', {});
    //     //     expect(wrapper.update().find('.MuiPaper-root').length).toBe(300);
    //     // });

    // });

    // xit("should update task content when saving form on edition", (done) => {
    //     wrapper.update().find('.MuiPaper-root').hostNodes().at(0).simulate('mouseover');
    //     wrapper.find('.MuiSvgIcon-root').hostNodes().at(0).simulate('click', {});
    //     wrapper.find('#new-task-content').hostNodes().simulate('change', { target: { value: 'change task content' } });
    //     wrapper.onRender(() => {
    //         expect(wrapper.update().text().includes('change task content')).toBeTruthy();
    //         done()
    //     });
    //     wrapper.find('#save-button').hostNodes().simulate('click', {});
        
    // });

    afterAll(() => {
        wrapper.unmount();
    })


})