import React from 'react';
import { Provider } from 'react-redux';

import GiphysIndexContainer from './giphys_index_container';
import GiphysSearchBar from './giphys_search_bar';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <GiphysIndexContainer />
    </Provider>
  );
};

export default Root;
