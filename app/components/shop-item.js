import Ember from 'ember';
import _ from "lodash/lodash";

export default Ember.Component.extend({
    cart: Ember.inject.service('shopping-cart'),
    router: Ember.inject.service('_routing'),
    // itemOptions: null,
    productOptions: {},
    // productValues: {},
    // availableOptions: {},
    // checkedOptions: {},
    // properOptions: {},
    chosenSet: null,
    isCancelled: Ember.computed('chosenSet', function(){
        return _.isNull(this.get('chosenSet'));
    }),
    quantity: 1,
    actions: {
        addToCart(){
            let obj = {
                id: this.product.get('id'),
                productSet: Object.keys(this.get('chosenSet'))[0],
                quantity: this.get('quantity'),
            };
            this.get('cart').add(obj);
            // this.notifyPropertyChange('chosenSet');
        }
    }
});
