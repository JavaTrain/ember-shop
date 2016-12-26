import Ember from 'ember';
import _ from "lodash/lodash";

export default Ember.Component.extend({
    itemOptions: null,
    activeProductSet: Ember.computed('activeOptions', 'activeValues', function(){

    }),
    productSets: null,
    availableOptions: {},
    availableValues: {},
    init(){
        this._super(...arguments);
        // console.log(this.get('product.productSets'));
        let itemOptions = {};
        let self = this;
        let filterOptions = [];
        let filterValues = [];
        this.get('product.productSets').forEach(function (productSet) {
            productSet.get('product2Options').forEach(function (product2Option) {
                // self.activeOptions.push(product2Option.get('option'));
                // self.activeValues.push(product2Option.get('optionValue'));

                if(!_.has(filterOptions, product2Option.get('option.id'))){
                    self.availableOptions[product2Option.get('option.id')] = [];
                    self.availableOptions[product2Option.get('option.id')].push(product2Option.get('option'));
                    filterOptions.push(product2Option.get('option.id'));

                    if(!_.has(filterValues, product2Option.get('optionValue.id'))){
                        self.availableOptions[product2Option.get('optionValue.id')] = [];
                        self.availableValues[product2Option.get('optionValue.id')] = product2Option.get('optionValue');
                        filterOptions.push(product2Option.get('optionValue.id'));
                    }
                } else if(!_.has(filterValues, product2Option.get('optionValue.id'))) {
                    self.availableOptions[product2Option.get('optionValue.id')] = [];
                    self.availableValues[product2Option.get('optionValue.id')] = product2Option.get('optionValue');
                    filterOptions.push(product2Option.get('optionValue.id'));
                }
                // self.set('activeOption', product2Option.get('option'));
                // self.set('activeOption', product2Option.get('optionValue'));
            });

            // return;
            // self.set('activeProductSet', productSet);
            // return;
            // if(!_.has(itemOptions, productSet.get('id'))){
            //
            // }
            // console.log(productSet.get('id'));
        });
        console.log(this.availableOptions, this.availableValues);


        // _.each(this.get('product.productSets'), function (productSet) {
        //     console.log(Ember.get(productSet, 'name'));
        // });

    },
});
