import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Component.extend({
    cart: Ember.inject.service('shopping-cart'),
    store: Ember.inject.service(),
    products: Ember.observer('cart.notifyAddToCart', function () {
        let cart = this.get('cart'),
            store = this.get('store'),
            products = [];
        _.each(cart.getProductIds(), function (productId) {
            products.push(store.peekRecord('product', productId));
        });

        return products;
    }),
});
