import {FlyModule, mergeModule} from './FlyModule';

export function componentModule(initialModuleFunc) {

  function createMergeClass(name) {
    return function mergeClass(myModuleClass) {
      var oldFn = myModuleClass.prototype.getInitModule;
      myModuleClass.prototype.getInitModule = function getInitModule() {
        const initModule = initialModuleFunc(name);
        const old = oldFn();
        return mergeModule(old, initModule);
      }
    }
  }

  return function (name) {
    console.log(`name`, name);
    if (Object.getPrototypeOf(name) === FlyModule) {
      return createMergeClass()(name);
    } else {
      return createMergeClass(name);
    }
  };
}

export function first (str) {
  return str ? str[0].toUpperCase() + str.substr(1) : '';
};
