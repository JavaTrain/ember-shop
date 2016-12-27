import Ember from 'ember';

export function ifCondition(params/*, hash*/) {
  var v1 = params[0];
  var operator = params[1];
  var v2 = params[2];

  switch (operator) {
    case '==':
      return (v1 == v2);
    case '===':
      return (v1 === v2);
    case '!=':
      return (v1 != v2);
    case '!==':
      return (v1 !== v2);
    case '<':
      return (v1 < v2);
    case '<=':
      return (v1 <= v2);
    case '>':
      return (v1 > v2);
    case '>=':
      return (v1 >= v2);
    case '&&':
      return (v1 && v2);
    case '||':
      return (v1 || v2);
    default:
      return false;
  }
}

export default Ember.Helper.helper(ifCondition);
