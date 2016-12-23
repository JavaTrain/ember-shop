import DS from 'ember-data';
import attr from "ember-data/attr";
import {belongsTo, hasMany} from "ember-data/relationships";

export default DS.Model.extend({
    price: attr('number'),
    productSet: belongsTo('product-set'),
    // option: belongsTo('option'),
    // optionValue: belongsTo('option-value'),
});
