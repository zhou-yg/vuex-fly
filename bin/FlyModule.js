import {merge} from 'lodash';

function transMutations(mutations, actions) {
  const allKeys = [...new Set(Object.keys(mutations).concat(Object.keys(actions)))];

  allKeys.forEach(k => {
    if (!mutations[k]) {
      mutations[k] = function autoFill() {};
    }
  });
  allKeys.forEach(k => {
    if (!actions[k]) {
      actions[k] = function autoFill() {};
    }
  });
}

function transActions (actions) {
  Object.keys(actions).forEach(actionName => {
    var actionFn = actions[actionName];
    if (!actionFn) {
      actionFn = function (payload, store) {
        return payload;
      };
    }
    actions[actionName] = proxyAction(actionName, actionFn);
  });
}

function proxyAction (actionName, actionFn) {
  return function (store, args) {
    const commit = store.commit;
    var isCommit = false;
    const newStore = {
      ...store,
      commit (type, payload) {
        var t = type;
        if (typeof type === 'object') {
          payload = type;
          t = type.type;
          commit(type);
        } else {
          commit(type, payload);
        }
        isCommit = t === actionName;
      },
    };
    const p = actionFn(newStore, args);
    if (p instanceof Promise) {
      return p.then((d) => {
        if (!isCommit) {
          commit(actionName, d.data);
        }
        return Promise.resolve(d.data);
      }, m => {
        return Promise.reject(m.message || m);
      });
    } else {
      if (!isCommit) {
        commit(actionName, p);
      }
      return p;
    }
  };
}

export function mergeModule (...modules) {
  const state = merge(...modules.map(obj => obj.state));
  const getters = merge(...modules.map(obj => obj.getters));
  const actionsArr = modules.map(obj => obj.actions);
  const mutationsArr = modules.map(obj => obj.mutations);

  const [actions, mutations] = [actionsArr || [], mutationsArr || []].map(arr => {
    const obj = arr.reduce((pre, next) => {
      if (next) {
        Object.keys(next).forEach(fnName => {
          var newFn = next[fnName];
          if (pre[fnName]) {
            let oldFn = pre[fnName];
            newFn = function () {
              oldFn.apply(this, arguments);
              next[fnName].apply(this, arguments);
            };
          }
          pre[fnName] = newFn;
        });
      }
      return pre;
    }, {});
    return obj;
  });
  return {
    state,
    getters,
    mutations,
    actions,
  };
}

export class FlyModule {

  constructor () {
    const initModule = {
      state: this.state(),
      mutations: this.mutations(),
      getters: this.getters(),
      actions: this.actions(),
    }
    const myComponentModule = this.getInitModule();

    const finalModule = mergeModule(initModule, myComponentModule);

    // fill mutations
    transMutations(finalModule.mutations, finalModule.actions);

    // proxy action
    transActions(finalModule.actions);


    Object.assign(this, finalModule);
  }
  getInitModule () {
    return {};
  }
  state () {
    return {};
  };
  mutations () {
    return {};
  };
  getters () {
    return {};
  };
  actions () {
    return {};
  };
}
