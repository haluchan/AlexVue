//this.$registerModule(store,{moduleName:module})
const registerModule = function(store, modules) {
  for (let name in modules) {
    const isRegistered = store._modules.root._children[name] !== undefined;
    if (!isRegistered) {
      const preserveState = store.state[name];
      store.registerModule(name, modules[name], {
        preserveState: preserveState
      });
    }
  }
};

//this.$unregisterModule(store,[moduleName])
const unregisterModule = function(store, modules) {
  for (let name of modules) {
    const isRegistered = store._modules.root._children[name] !== undefined;
    if (isRegistered) {
      store.unregisterModule(name);
    }
  }
};

export default (context, inject) => {
  //Vue.prototype.$registerModule = registerModule
  inject("registerModule", registerModule);
  inject("unregisterModule", unregisterModule);
};
