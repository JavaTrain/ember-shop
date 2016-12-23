import ApplicationAdapter from './application';
import Ember from 'ember'

export default ApplicationAdapter.extend({
    // findAll: function(store, type, sinceToken) {
    //     console.log(333333333333);//return;
    //     var query = { since: sinceToken };
    //     return new Ember.RSVP.Promise(function(resolve, reject) {
    //         Ember.$.getJSON(`/${type.modelName}`, query).then(function(data) {
    //             resolve(data);
    //         }, function(jqXHR) {
    //             reject(jqXHR);
    //         });
    //     });
    // }
});
