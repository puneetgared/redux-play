

const todos = (state=[], action)=> {
    switch(action.type){
      case 'ADD_TODO':
        return [...state, {
          id : action.id,
          name: action.name,
          complete: false
        }
         ];
        default:
          return state;
    }
  }
  
  const visibiltyFilter = (state='SHOW_ALL', action) => {
    switch(action.type){
      case 'CHANGE_VISIBILITY':
       return action.filter;
      default:
        return state;
    }
  }
  
  const {createStore} = Redux;
  // const {combineReducers} = Redux;
  
  const combineReducers = (reducers) => {
    return (state={}, action) => {
      return Object.keys(reducers).reduce((obj,key) => {
         obj[key] = reducers[key](
           state[key],
           action
         );
        return obj;
      }, {})
    }
  }
  
  const todoReducer = combineReducers(
   {
    todos: todos,
    visibiltyFilter: visibiltyFilter
   }
  );
  
  const store = createStore(todoReducer);
  
  console.log(store.getState());
  
  store.dispatch({type: 'ADD_TODO',
                 id: 0,
                  name: 'Complete work 1'
                 });
  console.log(store.getState());
  
  
  store.dispatch({type: 'ADD_TODO',
                 id: 0,
                  name: 'work 2'
                 });
  console.log(store.getState());
  
  store.dispatch({
    type: 'CHANGE_VISIBILITY',
    filter: 'SHOW_COMPLETE'
  });
  
  console.log(store.getState());
  
  