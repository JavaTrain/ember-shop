import DS from 'ember-data';
import _ from "lodash/lodash";

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
    attrs: {
        brand: { embedded: 'always' },
        category: { embedded: 'always' },
    },

    initVars(){
        return {
            productSets: [],
            productAttributes: [],
            attributesValues: [],
            attributes: [],
            brands: [],
            product2Options: [],
            options: [],
            optionValues: [],
        };
    },

    normalizeProductSets(productSet, arrayIds, arrayItems, arrayProduct2Options, arrayOptions, arrayOptionValues){
        arrayIds.push(productSet.id);
        arrayItems[productSet.id] = productSet;
        let arrayProduct2OptionsIds = [];
        _.each(productSet.product2Options, function(product2Option){
            arrayProduct2Options[product2Option.id] = product2Option;
            arrayProduct2OptionsIds.push(product2Option.id);
            arrayOptions[product2Option.option.id] = product2Option.option;
            product2Option.option = product2Option.option.id;
            arrayOptionValues[product2Option.optionValue.id] = product2Option.optionValue;
            product2Option.optionValue = product2Option.optionValue.id;
        });
        productSet.product2Options = arrayProduct2OptionsIds;
    },

    normalizeProduct2Attributes(product2Attribute, arrayIds, arrayItems, arrayAttrVal, arrayAttributes){
        arrayItems[product2Attribute.id] = product2Attribute;
        arrayIds.push(product2Attribute.id);
        arrayAttrVal[product2Attribute.attributeValue.id] = product2Attribute.attributeValue;
        product2Attribute.attributeValue = product2Attribute.attributeValue.id;
        arrayAttributes[product2Attribute.attribute.id] = product2Attribute.attribute;
        product2Attribute.attribute = product2Attribute.attribute.id;
    },

    normalizeFindAllResponse (store, primaryModelClass, payload, id, requestType){
            let products = [];
            let objVars = this.initVars();
            let self = this;
            _.each(payload.products, function(product){
                let productSetsIds = [];
                let productAttributesIds = [];
                _.each(product.product2Attributes, function(product2Attribute){
                    self.normalizeProduct2Attributes(product2Attribute, productAttributesIds, objVars.productAttributes, objVars.attributesValues, objVars.attributes);
                });
                product.product2Attributes = productAttributesIds;
                _.each(product.productSets, function(productSet){
                    self.normalizeProductSets(productSet, productSetsIds, objVars.productSets, objVars.product2Options, objVars.options, objVars.optionValues);
                });
                product.productSets = productSetsIds;
                products[product.id] = product;
            });
            payload.product2Attributes = objVars.productAttributes;
            payload.productSets = objVars.productSets;
            payload.products = products;
            payload.attributeValues = objVars.attributesValues;
            payload.attributes = objVars.attributes;
            payload.product2Options = objVars.product2Options;
            payload.options = objVars.options;
            payload.optionValues = objVars.optionValues;

            // console.log(payload);

        return this._super(store, primaryModelClass, payload, id, requestType);
    },

    normalizeQueryResponse (store, primaryModelClass, payload, id, requestType){
        let products = [];
        let objVars = this.initVars();
        let self = this;
        _.each(payload.products, function(product){
            let productSetsIds = [];
            let productAttributesIds = [];
            _.each(product.product2Attributes, function(product2Attribute){
                self.normalizeProduct2Attributes(product2Attribute, productAttributesIds, objVars.productAttributes, objVars.attributesValues, objVars.attributes);
            });
            product.product2Attributes = productAttributesIds;
            _.each(product.productSets, function(productSet){
                self.normalizeProductSets(productSet, productSetsIds, objVars.productSets, objVars.product2Options, objVars.options, objVars.optionValues);
            });
            product.productSets = productSetsIds;
            products[product.id] = product;
        });
        payload.product2Attributes = objVars.productAttributes;
        payload.productSets = objVars.productSets;
        payload.products = products;
        payload.attributeValues = objVars.attributesValues;
        payload.attributes = objVars.attributes;
        payload.product2Options = objVars.product2Options;
        payload.options = objVars.options;
        payload.optionValues = objVars.optionValues;

        return this._super(store, primaryModelClass, payload, id, requestType);
    }

    // normalizeFindRecordResponse (store, primaryModelClass, payload, id, requestType){
    //     let objVars = this.initVars();
    //     let productSetsIds = [];
    //     let productAttributesIds = [];
    //     var self = this;
    //     _.each(payload['product'].product2Attributes, function(product2Attribute){
    //         self.normalizeProduct2Attributes(product2Attribute, productAttributesIds, objVars.productAttributes, objVars.attributesValues, objVars.attributes);
    //     });
    //     _.each(payload['product'].productSets, function(productSet){
    //         self.normalizeProductSets(productSet, productSetsIds, objVars.productSets, objVars.product2Options, objVars.options, objVars.optionValues);
    //     });
    //     payload['product'].productSets = productSetsIds;
    //     payload.productSets = objVars.productSets;
    //     payload['product'].product2Attributes = productAttributesIds;
    //     payload.product2Attributes = objVars.productAttributes;
    //     payload.attributeValues = objVars.attributesValues;
    //     payload.attributes = objVars.attributes;
    //     payload.product2Options = objVars.product2Options;
    //     payload.options = objVars.options;
    //     payload.optionValues = objVars.optionValues;
    //
    //     console.log(payload);
    //
    //     return this._super(store, primaryModelClass, payload, id, requestType);
    // },

});
