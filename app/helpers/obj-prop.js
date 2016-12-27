import Ember from 'ember';

export function objProp(params/*, hash*/) {
  let obj = params[0];

  obj = obj?obj[params[1]]:null;
  if (params.length > 2) {
    for (var i = 2; i < params.length; i++) {
      if (obj) {
        obj = obj[params[i]];
      }
    }
  }

  return obj;
}

export default Ember.Helper.helper(objProp);
