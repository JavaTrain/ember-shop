import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Component.extend({
    cart: Ember.inject.service('shopping-cart'),
    store: Ember.inject.service(),
    totalCount: 0,
    totalPrice: 0,

    productIds: Ember.computed(function () {
        let cart = this.get('cart');
        return _.uniq(cart.getProductIds());
    }),
    products: Ember.on('init', Ember.observer('cart.notifyProp', function () {
        let self = this;
        console.log(self.get('cart').getCartResume());
        let totalCount = 0;
        let totalPrice = 0;
        this.get('store').query('product', {productIds: this.get('productIds')}).then(function (items) {
            items.forEach(function (product) {
                let productPrice;
                _.each(self.get('cart').getItems(), function (item) {
                    if (product.get('id') === item.id) {
                        totalCount += parseInt(item.quantity);
                        productPrice = parseFloat(product.get('price'));
                        if (item.productSet) {
                            product.get('productSets').forEach(function (productSet) {
                                if (productSet.get('id') === item.productSet) {
                                    productSet.get('product2Options').forEach(function (p2o) {
                                        if(p2o.get('price')){
                                            productPrice += parseFloat(p2o.get('price'));
                                        }
                                    });
                                }
                            });
                        }
                        productPrice *= parseInt(item.quantity);
                        totalPrice += productPrice;
                    }
                    self.set('totalPrice', totalPrice );
                    self.set('totalCount', totalCount);
                });
            });

        });
    })),
});
