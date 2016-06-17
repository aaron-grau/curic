var React = require('react');

var RecipesForm = React.createClass({
  getInitialState() {
    return { name: "" };
  },
  inputChanged(e) {
    this.setState({name: e.target.value});
  },
  formSubmitted(e) { 
    e.preventDefault();
    this.props.create(this.state);
  },
  render() {
    return (
      <form onSubmit={this.formSubmitted}>
        <input type="text" onChange={this.inputChanged} value={this.state.name}/>
        <input type="submit" value="create recipe!"/>
      </form>
    );
  }
});

module.exports = RecipesForm;
