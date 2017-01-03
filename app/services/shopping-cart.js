import Ember from 'ember';
import _ from "lodash/lodash";

export default Ember.Service.extend({
    store: Ember.inject.service(),
    totalCount: 0,
    totalPrice: 0,
    notifyAddToCart: null,
    cartProducts: Ember.computed(function () {
        let self = this;
        return this.get('store').query('product', {productIds: self.getProductIds()});
    }),
    cartItems: Ember.computed(function () {
        return JSON.parse(localStorage.getItem('cart'));
    }),
    init(){
        let self = this;
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify([]));
        } else {
            this.getCartResume().then(function (obj) {
                self.set('totalPrice', obj.totalPrice);
                self.set('totalCount', obj.totalCount);
                console.log(obj);
            });
        }
    },
    add(item){
        let cart = JSON.parse(localStorage.getItem('cart'));
        let added = false;
        _.each(cart, function (obj) {
            if (obj.id === item.id && obj.productSet === item.productSet) {
                obj.quantity = parseInt(obj.quantity) + parseInt(item.quantity);
                added = true;
            }
        });
        if (!added) {
            cart.push(item);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        this.notifyPropertyChange('notifyAddToCart');
    },
    getItems(){
        return JSON.parse(localStorage.getItem('cart'));
    },
    getProductIds(){
        let productIds = [];
        let items = JSON.parse(localStorage.getItem('cart'));
        _.each(items, function (item) {
            productIds.push(item.id);
        });

        return _.unique(productIds);
    },
    getCartProducts(){
        return this.get('store').query('product', {productIds: this.get('productIds')});
    },
    getCartResume(){
        let self = this;
        return this.get('cartProducts').then(function (products) {
            return self.getProductsResume(products);
        });
    },
    getProductsResume(products){
        let self = this;
        let totalCount = 0;
        let totalPrice = 0;
        products.forEach(function (product) {
            let productPrice;
            _.each(self.getItems(), function (item) {
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
                // self.set('totalPrice', totalPrice ); //TypeError: t[m] is not a function
                // self.set('totalCount', totalCount);
                // console.log(6558);
            });
        });
        return {
            'totalPrice': totalPrice,
            'totalCount': totalCount
        };
    },
});
