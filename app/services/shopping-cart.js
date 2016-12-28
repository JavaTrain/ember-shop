import Ember from 'ember';
import _ from "lodash/lodash";

export default Ember.Service.extend({
    store: Ember.inject.service(),
    notifyProp: null,
    productIds: Ember.on('init', Ember.computed('notifyProp', function(){
        let producIds = [];
        let items =  JSON.parse(localStorage.getItem('cart'));
        _.each(items, function(item){
            producIds.push(item.id);
        });

        return _.uniq(producIds);
    })),
    cartProducts: Ember.computed(function(){
        return this.get('store').query('product', {productIds: this.get('productIds')});
    }),
    cartItems: Ember.computed(function(){
        return JSON.parse(localStorage.getItem('cart'));
    }),
    init(){
        if(!localStorage.getItem('cart')){
            localStorage.setItem('cart', JSON.stringify([]));
        }
    },
    add(item){
        let cart = JSON.parse(localStorage.getItem('cart'));
        let added = false;
        _.each(cart, function(obj){
            if (obj.id === item.id && obj.productSet === item.productSet){
                obj.quantity = parseInt(obj.quantity) + parseInt(item.quantity);
                added = true;
            }
        });
        if(!added){
            cart.push(item);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        this.notifyPropertyChange('notifyProp');
    },
    getItems(){
        return JSON.parse(localStorage.getItem('cart'));
    },
    getProductIds(){
        let producIds = [];
        let items =  JSON.parse(localStorage.getItem('cart'));
        _.each(items, function(item){
            producIds.push(item.id);
        });

        return producIds;
    },
    getCartProducts(){
        return this.get('store').query('product', {productIds: this.get('productIds')});
    },
    getCartResume(){
        // this.get('cartProducts');
        let self = this;
        let totalCount = 0;
        let totalPrice = 0;
        this.get('cartProducts').then(function (items) {
            items.forEach(function (product) {
                let productPrice;
                _.each(self.get('cartItems'), function (item) {
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
    }
});
