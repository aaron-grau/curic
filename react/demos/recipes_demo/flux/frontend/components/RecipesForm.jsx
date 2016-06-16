const React = require('react');

const RecipesForm = React.createClass({
  getInitialState: function(){
    return { name: "" };
  },
  inputChanged: function(e){
    this.setState({name: e.target.value});
  },
  formSubmitted: function(e){
    e.preventDefault();
    this.props.create(this.state);
  },
  render: function () {
    return (
      <form onSubmit={this.formSubmitted}>
        <input type="text" onChange={this.inputChanged} value={this.state.name}/>
        <input type="submit" value="create recipe!"/>
      </form>
    );
  }
});

module.exports = RecipesForm;
