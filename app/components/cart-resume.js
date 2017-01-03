import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Component.extend({
    cart: Ember.inject.service('shopping-cart'),
    store: Ember.inject.service(),
    totalCount: 0,
    totalPrice: 0,
    productsResume: Ember.observer('cart.notifyAddToCart', function () {
        let cart = this.get('cart'),
            store = this.get('store'),
            products = [],
            resume;
        _.each(cart.getProductIds(), function (productId) {
            products.push(store.peekRecord('product', productId));
        });
        resume = cart.getProductsResume(products);
        this.set('totalPrice', resume.totalPrice );
        this.set('totalCount', resume.totalCount);
    }),

    init(){
        this._super(...arguments);
        let self = this;
        Ember.run.later((function() {
            self.set('totalPrice', self.get('cart').get('totalPrice'));
            self.set('totalCount', self.get('cart').get('totalCount'));
        }), 100);
    },
});
