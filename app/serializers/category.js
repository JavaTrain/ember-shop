import DS from 'ember-data';
import _ from "lodash/lodash";

export default DS.RESTSerializer.extend({
    // normalizeResponse: function(store, primaryModelClass, payload, id, requestType) {
    //
    //     if(requestType === 'findAll'){
    //         var products = [];
    //         _.each(payload.categories, function(category){
    //             var productIdsArr = [];
    //             _.each(category.products, function(product){
    //                 products.push(product);
    //                 productIdsArr.push(product.id);
    //             });
    //             category.products = productIdsArr;
    //         });
    //         payload.products = products;
    //     }
    //
    //
    //     return this._super(store, primaryModelClass, payload, id, requestType);
    // },
});
