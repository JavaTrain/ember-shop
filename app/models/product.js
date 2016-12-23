import DS from 'ember-data';
import attr from "ember-data/attr";
import {belongsTo, hasMany} from "ember-data/relationships";


export default DS.Model.extend({
    name: attr('string'),
    description: attr('string'),
    price: attr(),
    category: attr(),
    brand: belongsTo('brand'),
    productSets: hasMany('product-set'),
    product2Attributes: hasMany('product2-attribute'),
});
