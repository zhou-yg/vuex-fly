import {first, pieceModule} from '../util';

export default pieceModule(function (pre) {
  const pageName = pre ? `${pre}ListPage` : 'listPage';
  const listName = pre ? `${pre}List` : 'list';
  const actionName = pre ? `get${first(pre)}List` : 'getList';
  const loadingName = pre ? `${pre}IsLoading` : `isLoading`;

  return {

    state: {
      [pageName]: {
        pageNo: 0,
      },
      [listName]: [],
    },

    mutations: {
      [actionName] (state, data) {
        state[pageName] = data.page;
        state[listName] = data.list || [];

        if (state[loadingName] !== undefined) {
          state[loadingName] = false;
        }
      },
    },

    actions: {
      // loading
    },
  };
});
