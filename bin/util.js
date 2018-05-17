import {FlyModule, mergeModule} from './FlyModule';

export function pieceModule(initialModuleFunc) {

  function createMergeClass(...args) {
    return function mergeClass(myModuleClass) {
      var oldFn = myModuleClass.prototype.getInitModule;
      myModuleClass.prototype.getInitModule = function getInitModule() {
        // console.log(args);
        const initModule = initialModuleFunc.apply(this, args);
        const old = oldFn();
        return mergeModule(old, initModule);
      }
    }
  }

  return function (...args) {
    // console.log(`name`, args);
    if (Object.getPrototypeOf(args[0]) === FlyModule) {
      return createMergeClass().apply(this, args);
    } else {
      return createMergeClass.apply(this, args);
    }
  };
}

export function first (str) {
  return str ? str[0].toUpperCase() + str.substr(1) : '';
};
