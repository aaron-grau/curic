import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './app.jsx';
import SplashPageContainer from './splash_page/splash_page_container';
import DashboardContainer from './dashboard/dashboard_container';
import TodoFormContainer from './todos/todo_form_container';
import TodoDetailViewContainer from './todos/todo_detail_view_container';
// import StepFormContainer from './steps/step_form_container';

import { requestTodos, requestTodo } from '../actions/todos_actions';
import { requestSteps } from '../actions/steps_actions';

const Root = ({ store }) => {
  const requestTodosOnEnter = (nextState) => {
    store.dispatch(requestTodos());
  }

  const requestTodoDetailsOnEnter = (nextState) => {
    if (!store.getState().todos[nextState.params.todoId]) { // todo does not exist in state
      store.dispatch(requestTodo(nextState.params.todoId));
    }
    store.dispatch(requestSteps(nextState.params.todoId));
  }

  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SplashPageContainer}/>
          <Route path="dashboard" component={DashboardContainer} onEnter={requestTodosOnEnter}>
            <IndexRoute component={TodoFormContainer} />
            <Route path="todos/:todoId" component={TodoDetailViewContainer} onEnter={requestTodoDetailsOnEnter}>
              {/*<Route path="edit" component={StepFormContainer} />*/}
            </Route>
          </Route>
        </Route>
      </Router>
    </Provider>
  );
}

export default Root;

// import PokemonIndexContainer from './pokemon/index_container';
// import PokemonDetailContainer from './pokemon/detail_container';
// import PokemonFormContainer from './pokemon/form_container';
// import ToyDetailContainer from './toys/detail_container';
//
// import * as Actions from '../actions/pokemon_actions';
//
//
// const Root = ({ store }) => {
// 	const requestAllPokemonOnEnter = () => {
// 		store.dispatch(Actions.requestAllPokemon());
// 	};
//
// 	const requestSinglePokemonOnEnter = (nextState) => {
// 		store.dispatch(Actions.requestSinglePokemon(nextState.params.pokemonId));
// 	};
//
// 	return (
// 		<Provider store={store}>
// 			<Router history={hashHistory}>
// 				<Route path="/" component={PokemonIndexContainer} onEnter={requestAllPokemonOnEnter}>
// 					<IndexRoute component={PokemonFormContainer}/>
// 					<Route 	path="pokemon/:pokemonId"
// 									component={PokemonDetailContainer} onEnter={requestSinglePokemonOnEnter}>
// 						<Route path="toy/:toyId" component={ToyDetailContainer}/>
// 					</Route>
// 				</Route>
// 			</Router>
// 		</Provider>
// 	);
// };

//
// const Root = ({ store }) => {
//
//   const _ensureLoggedIn = (nextState, replace) => {
//     const currentUser = store.getState().session.currentUser;
//     if (!currentUser) {
//       replace('/login');
//     }
//   };
//
//   const _redirectIfLoggedIn = (nextState, replace) => {
//     const currentUser = store.getState().session.currentUser;
//     if (currentUser) {
//       replace('/');
//     }
//   }
//
//   return (
//     <Provider store={store}>
//       <Router history={hashHistory}>
//         <Route path="/" component={App}>
//           <IndexRoute component={SearchContainer} />
//           <Route path="/login" component={SessionFormContainer} onEnter={_redirectIfLoggedIn}/>
//           <Route path="/signup" component={SessionFormContainer} onEnter={_redirectIfLoggedIn}/>
//           <Route path="/benches/new" component={BenchFormContainer} onEnter={_ensureLoggedIn}/>
//           <Route path="/benches/:benchId" component={BenchShowContainer} >
//             <Route path="review" component={ReviewFormContainer} onEnter={_ensureLoggedIn}/>
//           </Route>
//         </Route>
//       </Router>
//     </Provider>
//   );
// };
