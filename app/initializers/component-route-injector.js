// app/initializers/component-router-injector.js
export function initialize(application) {
  // Injects all Ember components with a router object:
  application.inject('component', 'routing', 'router:main');
}

export default {
  name: 'component-router-injector',
  initialize: initialize
};
