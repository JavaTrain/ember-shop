import ApplicationAdapter from './application';
import config from "./../config/environment";
import Ember from 'ember';

export default ApplicationAdapter.extend({
    findAll: function(store, type, sinceToken, snapshot) {
        var url = `${config.host}/${config.apiVersion}${snapshot.adapterOptions.pathname}`;
        var query = { since: sinceToken };
        return new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.getJSON(url, query).then(function(data) {
                resolve(data);
            }, function(jqXHR) {
                reject(jqXHR);
            });
        });
    },

    // findRecord: function(store, type, id, snapshot) {
    //     var url = `${config.host}/${config.apiVersion}/categories/${snapshot.record.get('category.id')}/products/${id}`;
    //
    //     return new Ember.RSVP.Promise(function(resolve, reject) {
    //         Ember.$.getJSON(url).then(function(data) {
    //             resolve(data);
    //         }, function(jqXHR) {
    //             reject(jqXHR);
    //         });
    //     });
    // },

    query: function(store, type, query) {
        var url = `${config.host}/${config.apiVersion}/categories/${config.defaultCategory}/products`;
        return new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.getJSON(`${url}`, query).then(function(data) {
                resolve(data);
            }, function(jqXHR) {
                reject(jqXHR);
            });
        });
    }
});
