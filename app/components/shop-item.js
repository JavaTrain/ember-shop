import Ember from 'ember';
import _ from "lodash/lodash";

export default Ember.Component.extend({
    router: Ember.inject.service('_routing'),
    itemOptions: null,
    productOptions: {},
    productValues: {},
    availableOptions: {},
    checkedOptions: {},
    properOptions: {},
    chosenSet: null,
    isCancelled: Ember.computed('chosenSet', function(){
        return _.isNull(this.get('chosenSet'));
    }),

    init(){
        this._super(...arguments);
        let self = this;
        let filterOptions = {};
        let filterValues = {};
        this.get('product.productSets').forEach(function (productSet) {
            let setData = {};
            productSet.get('product2Options').forEach(function (product2Option) {
                let optionData = {};
                optionData['optionId'] = product2Option.get('option.id');
                optionData['valueId'] = product2Option.get('optionValue.id');
                setData[product2Option.get('option.id')] = optionData;
                if (!_.has(filterOptions, product2Option.get('option.id'))) {
                    self.productOptions[product2Option.get('option.id')] = product2Option.get('option');
                    filterOptions[product2Option.get('option.id')] = product2Option.get('option.id');
                    if (!_.has(filterValues, product2Option.get('optionValue.id'))) {
                        self.productValues[product2Option.get('option.id')] = [];
                        self.productValues[product2Option.get('option.id')].push(product2Option.get('optionValue'));
                        filterValues[product2Option.get('optionValue.id')] = product2Option.get('optionValue.id');
                    }
                } else if (!_.has(filterValues, product2Option.get('optionValue.id'))) {
                    self.productValues[product2Option.get('option.id')].push(product2Option.get('optionValue'));
                    filterValues[product2Option.get('optionValue.id')] = product2Option.get('optionValue.id');
                }
            });
            self.availableOptions[productSet.get('id')] = setData;
        });

        // console.log(this.availableOptions);
    },
    actions: {
        checkOption(){
            let self = this;
            let option = Ember.$(event.target).attr('data-option-id');
            let optionValue = Ember.$(event.target).attr('data-value-id');
            let chosenOption = {
                'optionId': option,
                'valueId': optionValue
            };
            let checkedOptions = this.get('checkedOptions');
            checkedOptions[option] = chosenOption;
            this.set('checkedOptions', checkedOptions);
            this.notifyPropertyChange('checkedOptions');
            let properSets = {};
            _.forOwn(this.get('availableOptions'), function (value, key) {
                _.each(value, function (item) {
                    if (_.isEqual(item, chosenOption)) {
                        properSets[key] = value;
                    }
                });
            });
            let properOptions = {};
            _.each(properSets, function (item) {
                _.each(item, function (value) {
                    if (!properOptions[value['optionId']]) {
                        properOptions[value['optionId']] = [];
                    }
                    properOptions[value['optionId']].push(value['valueId']);
                });
            });
            this.set('properOptions', properOptions);
            _.forOwn(this.get('checkedOptions'), function(value, key){
                if (!_.includes(properOptions[key], value['valueId'])) {
                    let checkedOptions = self.get('checkedOptions');
                    delete checkedOptions[key];
                    self.set('checkedOptions', checkedOptions);
                }
            });

            self.set('chosenSet', null);
            _.each(this.get('availableOptions'), function (item) {
                console.log(item, checkedOptions);
                if (_.isEqual(item, checkedOptions)) {
                    self.set('chosenSet', item);
                }
            });

            // console.log(this.get('chosenSet'));
        }
    }
});
