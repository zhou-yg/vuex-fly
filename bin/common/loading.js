import {first, pieceModule} from '../util';

export default pieceModule(function createLoading (pre) {
  var pageName = 'isLoading';
  var actionName = 'loadingTo';
  if (pre) {
    pageName = `${pre}${first(pageName)}`;
    actionName = `${pre}${first(actionName)}`;
  }

  return {
    state: {
      [pageName]: false,
    },

    mutations: {
      [actionName] (state, to) {
        if (to === undefined) {
          state[pageName] = !state[pageName];
        } else {
          state[pageName] = !!to;
        }
      },
    },

    actions: {
    // loading
    },
  };
});
