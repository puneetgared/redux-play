

const todos = (state=[], action)=> {
  switch(action.type){
    case 'ADD_TODO':
      return [...state, {
        id : action.id,
        name: action.name,
        complete: false
      }
       ];
    case 'TOGGLE_TODO':
      return state.map(todo => {
        if(todo.id === action.id)
          return {...todo, complete: !todo.complete};
        return todo;
      });
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
const {combineReducers} = Redux;
const {Component} = React;
const {connect} = ReactRedux;


const todoReducer = combineReducers(
 {
  todos: todos,
  visibiltyFilter: visibiltyFilter
 }
);

/* const store = createStore(todoReducer);
 */

let TodoInput = ({dispatch}) => {
let input;
	return (
<div>
  <input ref={(node) => {
      input = node;
    }}/>
     <button onClick={() =>{
     	dispatch({type: 'ADD_TODO',
                 id: todoCounter++,
                  name: input.value
                 })
       input.value = '';
      }}>
        Add Todo
        </button>
 </div>
  )
}

TodoInput = connect()(TodoInput);
/* TodoInput.contextTypes = {
store: PropTypes.object
} */

const Link = ({
active,
children,
onClick
}) => {

if(active)
    return<span>{children}</span>
return (
  <a href='#'
    onClick={(e) => {
     e.preventDefault();
     onClick();
}}>
     {children}
     </a>
);
};

const mapStateToLinkProps = (state, ownProps) => {
	return {
  	active : ownProps.filter === state.visibiltyFilter
  };
}

const mapDispatchToLinkProps = (dispatch, ownProps) => {
	return {
  	onClick: () => {
    	dispatch({
                   type: 'CHANGE_VISIBILITY',
                   filter
             });
    }
  };
}

const FilterLink = connect(mapStateToLinkProps,
												mapDispatchToLinkProps)
                        (Link);

/* class FilterLink extends Component {



componentDidMount() {
const {store} = this.context;
console.log('Test', this.context)
const subscriber = store.subscribe(() => {
 this.forceUpdate();
})
}

componentWillUnmount() {
  subscriber.unsubscribe();
}

render(){
  const {filter,children} = this.props;
  const {store} = this.context;
  const state = store.getState();

  return (
      <Link active={filter === state.visibiltyFilter}
            onClick={() => {
                store.dispatch({
                   type: 'CHANGE_VISIBILITY',
                   filter
             });
            }}
      >
      {children}
      </Link>
  )
}

}

FilterLink.contextTypes = {
  store: PropTypes.object
} */

const Footer = () => (
  <p>
          Show:
          {' '}
          <FilterLink
            filter='SHOW_ALL'
            >
              All
            </FilterLink>
            {' '}
              <FilterLink
            filter='SHOW_ACTIVE'
            >
              Active
            </FilterLink>
            {' '}
              <FilterLink
            filter='SHOW_COMPLETED'
            >
              Completed
            </FilterLink>
         </p>
)
const Todo = ({name,
            complete,
            onClick
            }) => {
 return (
     <li
     onClick={onClick}
     style={{
          textDecoration: complete ? 
            'line-through': 'none'
       }}
        >
        {name}
        </li>);
}

const TodoList = ({
todos,
onTodoClick
}) => {
return (
  <ul>{
  todos.map(todo => 
    <Todo {...todo} onClick={() => onTodoClick(todo.id)}></Todo>
    )
  }
  </ul>
);
}

/* class VisibleTodoList extends Component {
 componentDidMount() {
     const {store} = this.context;
    const subscriber = store.subscribe(() => {
     this.forceUpdate();
})
}

componentWillUnmount() {
  subscriber.unsubscribe();
}
 render() {
 const {store} = this.context;
 const state = store.getState()
 return (
   
  <TodoList
  todos={getVisibleTodos(state.todos, state.visibiltyFilter)}
  onTodoClick={(id) => {
    store.dispatch({type: 'TOGGLE_TODO',
                               id});
  }}
  >
    
  </TodoList>
 );
 
 }

} 

VisibleTodoList.contextTypes = {
  store: PropTypes.object
}
*/

const mapStateToProps = (state) => {
	return {
  	todos: getVisibleTodos(state.todos,
    											 state.visibiltyFilter)
  };
};

const mapDispatchToProps = (dispatch) => {
	return {
      onTodoClick : (id) => {
      			dispatch({type: 'TOGGLE_TODO',
                                 id})
    }
  };
};

const VisibleTodoList = connect(mapStateToProps,
        mapDispatchToProps)(TodoList);
       

const getVisibleTodos = (todos, filter) => {
switch(filter) {
  case 'SHOW_ALL':
    return todos;
  case 'SHOW_ACTIVE':
  return todos.filter(todo => !todo.complete)
  case 'SHOW_COMPLETED':
   return todos.filter(todo => todo.complete)
   default:
     return todos;
}
}

let todoCounter = 0;
const TodoApp = ({todos, visibiltyFilter}) => ( 
   <div>
      <TodoInput/>
      <VisibleTodoList />
      <Footer />
    </div>
);
 
/* class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store
    };
  }
  render(){
    return this.props.children;
  }
}
Provider.childContextTypes = {
  store: PropTypes.object
} */
const {Provider} = ReactRedux;
const store = createStore(todoReducer);
ReactDOM.render(
  <Provider store={store}>
    <TodoApp /> 
  </Provider> 
  ,
  document.getElementById('root'));
  
 /*  Provider.childContextTypes = {
  store: PropTypes.object
  } */


/* store.subscribe(render); */
/* render(); */
/* console.log(store.getState()); */

//TEST TEST TEST


