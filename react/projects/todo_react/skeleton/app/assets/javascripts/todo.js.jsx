$(function(){
  var TodoDetailView = React.createClass({
    render: function(){
      return (
          <div>
            <p className="todo-body">{this.props.todo.body}</p>
            <button 
              className="btn btn-danger delete-todo"
              onClick={this.props.destroyTodo}>Delete</button>
          </div>
      );
    }
  });

  var DoneButton = React.createClass({
    handleDone: function(event){
      event.stopPropagation();
      this.props.toggleDone();
    },
    render: function(){
      var text, classname;
      if(this.props.done) {
        text = "Undo!";
        classname = "btn btn-xs btn-danger done-button";
      } else {
        text = "Im done!";
        classname = "btn btn-xs btn-success done-button";
      }
      return (
        <div 
          className={classname}
          onClick={this.handleDone}>
          {text}
        </div>
      );
    }
  });

  var TodoListItem = React.createClass({
    getInitialState: function(){
      return { detail: false };
    },
    toggleDetail: function(event){
      event.preventDefault();
      this.setState({detail: !this.state.detail});
    },
    render: function(){
      var detail, className, todo = this.props.todo;
      if(this.state.detail){
        detail = (
          <TodoDetailView 
           todo={this.props.todo} 
           destroyTodo={this.props.destroyTodo}/>
        );
        className = "list-item";
      } else {
        className = "list-item min";
      }
      return (
          <div onClick={this.toggleDetail} className={className}>
            <div className="todo-header">
              <a href="#">{ todo.title }</a>
              <DoneButton done={todo.done} toggleDone={this.props.toggleDone} /> 
            </div>
            { detail }
          </div>
      );
    }
  });

  var TodoForm = React.createClass({
    getInitialState: function(){
      return {
        expanded: false,
        title: '',
        body: ''
      };
    },
    updateTitle: function(event){
      this.setState({title: event.currentTarget.value});
    },
    updateBody: function(event){
      this.setState({body: event.currentTarget.value});
    },
    handleSubmit: function(event){
      event.preventDefault();
      this.props.createTodo({title: this.state.title, body: this.state.body});
      this.setState({title: '', body: ''});
      this.toggleExpand(event);
    },
    toggleExpand: function(event){
      event.preventDefault();
      this.setState({expanded: !this.state.expanded});
    },
    render: function(){
      var content;
      if(this.state.expanded){
        content = (
        <form onSubmit={this.handleSubmit}> 
        <div className="form-group">
          <input 
            ref="title" 
            className="form-control"
            value={this.state.title} 
            placeholder="buy milk"
            onChange={this.updateTitle}/>
        </div>
        <div className="form-group">
          <textarea 
            ref="body" 
            cols='20'
            className="form-control"
            value={this.state.body}
            rows='5'
            onChange={this.updateBody}></textarea>
        </div>
          <button className="submit-todo btn btn-primary">Create Todo!</button>
          <button 
            onClick={this.toggleExpand} 
            className="cancel-todo btn btn-danger">Cancel</button>
        </form>
        );
      } else {
        content = (
        <button onClick={this.toggleExpand} className='add-todo btn btn-success'>Add New Item!</button>
        );
      }
      return content;
    }
  });

  var TodoList = React.createClass({
    componentDidMount: function(){
      this.fetchTodos();
    },
    createTodo: function(todo){
      this.props.todos.create(todo);
    },
    fetchTodos: function(){
      this.props.todos.fetch();
    },
    render: function(){
      var todos = this.props.todos.todoItems, that = this;
      return (
        <div className="todo">
          <h1 className="big-title">TODO!</h1>
          <div className="todo-list">
            { 
              todos.map(function(todo){
                var destroyTodoCallback = function(){
                  that.props.todos.destroy(todo.id);
                };
                var doneTodoCallback = function(){
                  that.props.todos.toggleDone(todo.id);
                };
                return (<TodoListItem 
                  destroyTodo={destroyTodoCallback} 
                  toggleDone={doneTodoCallback}
                  key={todo.id} todo={todo} />)
              })
            }
          </div>
        <TodoForm todos={todos} createTodo={this.createTodo}/>
       </div>
      );
    }
  });

  render = function(){ 
    React.render(
        <TodoList todos={todos}></TodoList>,
        document.getElementById('root')
    );
  }
  var todos = new Todos(render);
  render();
})
