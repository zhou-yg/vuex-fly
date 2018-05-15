import {FlyModule, basic, list} from '../bin/fly.js';

@basic
@list
class My extends FlyModule {
  state () {
    return {
      x: 1,
    };
  }
  mutations () {
    return {
      setState (state, data) {
        state.x = data;
      },
    }
  }

  getters () {
    return {
      gg (state) {
        return state.x + 1;
      },
    }
  }

  actions () {
    return {
      setState () {
        return 1;
      },
      ww () {

      },
    }
  }
}


const my = new My();

console.log(my);
