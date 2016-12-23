import DS from 'ember-data';
import attr from "ember-data/attr";
import {belongsTo, hasMany} from "ember-data/relationships";

export default DS.Model.extend({
    value: attr('string'),
    product2Attribute: hasMany('product2-attribute'),
    attribute: belongsTo('attribute'),
});
