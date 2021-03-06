import React, { createContext, useContext, useReducer } from 'react';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { save } from './api';
import { DragItem } from './DragItem';
import { moveItem } from './moveItem';
import { findItemIndexById, overrideItemAtIndex, removeItemAtIndex, insertItemAtIndex } from './utils/arrayUtils';
import { withData } from './withData';

interface Task {
    id: string
    text: string
}

interface List {
    id: string
    text: string
    tasks: Task[]
}

export interface AppState {
    lists: List[],
    draggedItem: DragItem | undefined,
}

const appData: AppState = {
    draggedItem: undefined,
    lists: [
        {
            id: "0",
            text: "To Do",
            tasks: [{ id: "c0", text: "Generate app scaffold" }]
        }, {
            id: "1",
            text: "In Progress",
            tasks: [{ id: "c2", text: "Learn Typescript" }]
        }, {
            id: "2",
            text: "Done!!!",
            tasks: [{ id: "c3", text: "Being to use static typing" }]
        },
    ],
}

interface AppStateContextProps {
    state: AppState
    dispatch: React.Dispatch<any>
}
const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

export const AppStateProvider = withData(({ children,initialState }: React.PropsWithChildren<{initialState:AppState}>) => {
    const [state, dispatch] = useReducer(appStateReducer, initialState);

    useEffect(() => {
        save(state)
    },[state])

    return (
        <AppStateContext.Provider value={{ state, dispatch }}>
            {children}
        </AppStateContext.Provider>
    );
})

export const useAppState = () => {
    return useContext(AppStateContext);
}

type Action =
    | {
        type: "ADD_LIST"
        payload: string
    }
    |
    {
        type: "ADD_TASK"
        payload: { text: string; taskId: string }
    }
    |
    {
        type: "MOVE_LIST"
        payload: {
            dragIndex: number
            hoverIndex: number
        }
    }
    |
    {
        type: "SET_DRAGGED_ITEM"
        payload: DragItem | undefined
    }
    |
    {
        type: 'MOVE_TASK'
        payload: {
            dragIndex: number,
            hoverIndex: number,
            sourceColumn: string,
            targetColumn: string
        }
    }


const appStateReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case "ADD_LIST": {
            return {
                ...state,
                lists: [
                    ...state.lists,
                    { id: uuidv4(), text: action.payload, tasks: [] }
                ]
            }
        }
        case "ADD_TASK": {
            const targetListIndex = findItemIndexById(state.lists, action.payload.taskId);

            state.lists[targetListIndex].tasks.push({
                id: uuidv4(),
                text: action.payload.text
            });

            return {
                ...state
            }
        }
        case "MOVE_LIST": {
            const { dragIndex, hoverIndex } = action.payload;
            state.lists = moveItem(state.lists, dragIndex, hoverIndex)
            return {
                ...state
            }
        }
        case "MOVE_TASK": {
            const { dragIndex, hoverIndex, sourceColumn, targetColumn } = action.payload;
            const sourceListIndex = findItemIndexById(state.lists, sourceColumn);
            const targetListIndex = findItemIndexById(state.lists, targetColumn);

            const sourceList = state.lists[sourceListIndex];
            const task = sourceList.tasks[dragIndex];

            const updatedSourceList = {
                ...sourceList,
                tasks: removeItemAtIndex(sourceList.tasks, dragIndex)
            }

            const stateWithUpdatedSourceList = {
                ...state,
                lists: overrideItemAtIndex(
                    state.lists,
                    updatedSourceList,
                    sourceListIndex
                )
            }

            const targetList = stateWithUpdatedSourceList.lists[targetListIndex];

            const updatedTargetList = {
                ...targetList,
                tasks: insertItemAtIndex(targetList.tasks, task, hoverIndex)
            }
            
            return{
                ...stateWithUpdatedSourceList,
                lists:overrideItemAtIndex(stateWithUpdatedSourceList.lists,updatedTargetList,targetListIndex)
            };
        }
        case "SET_DRAGGED_ITEM": {
            return { ...state, draggedItem: action.payload }
        }
        default: {
            return state;
        }
    }
}
