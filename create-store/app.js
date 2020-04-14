const counter = (state=0, action) => {
    switch(action.type){
      case 'INCREMENT':
         return state+1; 
      case 'DECREMENT':
        return state-1;
      default:
        return state;
    }
  }
  
  const createStore = (reducer) => {
    let state;
    let listeners = [];
    
    const getState = () => state;
    
    const dispatch = (action) => {
      state = reducer(state,action);
      listeners.forEach(listener => listener())
    }
    
    const subscribe = (listener) => {
      listeners.push(listener);
      
      return {
        unsubscribe : () => {
          listeners = listeners.filter(l => l!== listener)
        }
      }
    }
    
    dispatch({});
    
    return {getState: getState,
            dispatch: dispatch,
            subscribe: subscribe};
  }
  
  // const {createStore} = Redux;
  const store = createStore(counter);
  
  const render = () => document.getElementById('counter').innerText = store.getState()
  
  let subscription = store.subscribe(render);
  render();
  
  document.getElementById('increment').addEventListener('click', () => {
    store.dispatch({type: 'INCREMENT'});
  })
  
  const unsurbscribeButton = document.getElementById('unsubscribe');
  unsurbscribeButton.addEventListener('click', ()=> {
    subscription.unsubscribe();
  })
  
  const subscribeButton = document.getElementById('subscribe');
  subscribeButton.addEventListener('click', ()=> {
  store.subscribe(render);
  })
  
  
  