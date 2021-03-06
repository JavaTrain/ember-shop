import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('categories');
  this.route('products', { path: 'categories/:category_id/products' }, function() {
    this.route('product', { path: '/:product_id' });
  });
  this.route('cart');
});

export default Router;
