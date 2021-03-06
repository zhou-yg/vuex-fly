# vuex-fly

#### feel it

> npm run example


## before

```
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const ONE_TYPE = 'ONE_TYPE';

const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    [ONE_TYPE] (state) {
      state.count += 1;
    }
  },
  actions: {
    addCount ({commit}) {
      commit(ONE_TYPE);
    }
  },
});

store.dispatch('addCount');

console.log(store.state.count) // -> 1
```


## after now

```
import Vue from 'vue';
import Vuex from 'vuex';
import {pieceModule, FlyModule} from 'vuex-fly';

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

```
