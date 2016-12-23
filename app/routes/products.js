import Ember from 'ember';

export default Ember.Route.extend({
    router: Ember.inject.service('_routing'),

    model(params){
        var store = this.store;
        // var pathname = this.get('router.location').get('location.pathname');

        return this.store.findAll('product', {
            adapterOptions: { pathname: `/categories/${params.category_id}/products` }
        }).then(function(products){
            return store.filter('product', function(item){
                return item.get('category.id') == params.category_id;
            });
        });
    },
});
