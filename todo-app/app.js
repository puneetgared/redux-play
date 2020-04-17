

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

const todoReducer = combineReducers(
 {
  todos: todos,
  visibiltyFilter: visibiltyFilter
 }
);

const store = createStore(todoReducer);


const TodoInput = () => {
let input;
	return (
<div>
  <input ref={(node) => {
      input = node;
    }}/>
     <button onClick={() =>{
     	store.dispatch({type: 'ADD_TODO',
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

class FilterLink extends Component {

componentDidMount() {
const subscriber = store.subscribe(() => {
 this.forceUpdate();
})
}

componentWillUnmount() {
  subscriber.unsubscribe();
}

render(){
  const {filter,children} = this.props;
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

class VisibleTodoList extends Component {
 componentDidMount() {
    const subscriber = store.subscribe(() => {
     this.forceUpdate();
})
}

componentWillUnmount() {
  subscriber.unsubscribe();
}
 render() {
 
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
const render = ()=> {
   ReactDOM.render(<TodoApp 
                   {...store.getState()}
                   />,
                  document.getElementById('root'));
}

store.subscribe(render);
render();
console.log(store.getState());

//TEST TEST TEST


