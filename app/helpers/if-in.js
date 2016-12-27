import Ember from 'ember';

export function ifIn(params/*, hash*/) {
  let elem = params[0];
  let list = params[1];

  return list?(list.indexOf(elem) > -1):-1;
}

export default Ember.Helper.helper(ifIn);
