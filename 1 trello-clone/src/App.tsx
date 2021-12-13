import React from 'react';
import { Column } from './Column';
import { AppContainer } from './styles';
import { AddNewItem } from './AddNewItem';
import { useAppState } from './AppStateContext';
import  CustomDragLayer from './CustomDragLayer';
function App() {

  const { state, dispatch } = useAppState();
  console.log(state);
  
  return (
    <AppContainer>
      <CustomDragLayer />
      {state.lists.map((list, i) => (
        <Column id={list.id} text={list.text} key={list.id} index={i} />
      ))}
      <AddNewItem
        toggleButtonText='+ Add another list'
        onAdd={text => dispatch({ type: "ADD_LIST", payload: text })}
        dark={false} />
    </AppContainer>
  );
}

export default App;
