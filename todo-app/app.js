

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

const FilterLink = ({
filter,
currentFilter,
children
}) => {

if(currentFilter === filter)
    return<span>{children}</span>
return (
  <a href='#'
    onClick={(e) => {
     e.preventDefault();
     store.dispatch({
       type: 'CHANGE_VISIBILITY',
       filter
     });
  console.log(store.getState());
}}>
     {children}
     </a>
);
};

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
handleTodoClick
}) => {
return (
  <ul>{
  todos.map(todo => 
    <Todo {...todo} onClick={() => handleTodoClick(todo.id)}></Todo>
    )
  }
  </ul>
);
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
class TodoApp extends Component {
render() {
  
  const {todos, visibiltyFilter} = this.props;
  
  const visibleTodos = getVisibleTodos(todos,visibiltyFilter);
  return (
   <div>
    <input ref={(node) => {
    this.input = node;
  }}/>
   <button onClick={() => {
   store.dispatch({type: 'ADD_TODO',
               id: todoCounter++,
                name: this.input.value
               });
     this.input.value = '';
    }}>
      Add Todo
      </button>
      <TodoList todos={visibleTodos} handleTodoClick={
      (id) => {
       store.dispatch({type: 'TOGGLE_TODO',
                       id});
      }}></TodoList>
        <p>
          Show:
          {' '}
          <FilterLink
            filter='SHOW_ALL'
            currentFilter={visibiltyFilter}
            >
              All
            </FilterLink>
            {' '}
              <FilterLink
            filter='SHOW_ACTIVE'
            currentFilter={visibiltyFilter}
            >
              Active
            </FilterLink>
            {' '}
              <FilterLink
            filter='SHOW_COMPLETED'
            currentFilter={visibiltyFilter}
            >
              Completed
            </FilterLink>
         </p>
    </div>
 );
}

}
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


