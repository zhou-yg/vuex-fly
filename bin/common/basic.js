import {first, pieceModule} from '../util';

export default pieceModule(function (pre = '', init = null) {
  const stateName = pre ? `${pre}Data` : 'data';
  const actionName = `set${first(pre)}Data`;

  return {

    state: {
      [stateName]: init,
    },

    mutations: {
      [actionName] (state, data) {
        state[stateName] = data;
      },
    },

    actions: {
      // loading
    },
  };
});
