import React from 'react';
import {Link} from 'react-router';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import SessionApiUtil from './../util/session_api_util';
import SessionStore from './../stores/session_store';
import ErrorStore from './../stores/error_store';
import UserApiUtil from './../util/user_api_util';

const LoginForm = React.createClass({
	mixins: [LinkedStateMixin],

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

  getInitialState() {
    return {
      username: "",
      password: ""
    };
  },


  componentDidMount() {
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
    this.sessionListener = SessionStore.addListener(this.redirectIfLoggedIn);
  },

  componentWillUnmount() {
    this.errorListener.remove();
    this.sessionListener.remove();
  },

  redirectIfLoggedIn() {
    if (SessionStore.isUserLoggedIn()) {
      this.context.router.push("/");
    }
  },

	handleSubmit(e) {
		e.preventDefault();

		const formData = {
			username: this.state.username,
			password: this.state.password
		};

    if (this.props.location.pathname === "/login") {
      SessionApiUtil.login(formData);
    } else {
      UserApiUtil.signup(formData);
    }
	},

  fieldErrors(field) {
    const errors = ErrorStore.formErrors(this.formType());
    if (!errors[field]) { return; }

    const messages = errors[field].map( (errorMsg, i) => {
      return <li key={ i }>{ errorMsg }</li>;
    });

    return <ul>{ messages }</ul>;
  },

  formType() {
    return this.props.location.pathname.slice(1);
  },

	render() {
    let navLink;
    if (this.formType() === "login") {
      navLink = <Link to="/signup">sign up instead</Link>;
    } else {
      navLink = <Link to="/login">log in instead</Link>;
    }

		return (
			<form onSubmit={this.handleSubmit}>
        Welcome to AirBnB! Please { this.formType() } or { navLink }

        { this.fieldErrors("base") }

        <br />
				<label> Username:
          { this.fieldErrors("username") }
					<input type="text" valueLink={this.linkState("username")} />
				</label>

        <br />
				<label> Password:
          { this.fieldErrors("password") }
					<input type="password" valueLink={this.linkState("password")} />
				</label>

        <br />
				<input type="submit" value="Submit" />
			</form>
		);
	}
});

export default LoginForm;
