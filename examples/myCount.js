import Vue from 'vue';
import Vuex from 'vuex';
import {pieceModule, FlyModule} from '../bin/fly';

Vue.use(Vuex);

// my piece
const countPiece = pieceModule((name, v) => {
  return {
    state: {
      [`${name}Count`]: v,
    },
    mutations: {
      [`set${name}Count`] (state) {
        state[`${name}Count`] += 1;
      }
    },
    
  }
});

@countPiece('my', 1)
@countPiece('my2', 3)
class MyVuexModule extends FlyModule {
}

const store = new Vuex.Store(new MyVuexModule());

console.log(store.state.myCount, store.state.my2Count); // -> 1, 3

store.dispatch('setmyCount');
console.log(store.state.myCount, store.state.my2Count); // -> 2, 3

store.dispatch('setmy2Count');
console.log(store.state.myCount, store.state.my2Count); // -> 2, 4
