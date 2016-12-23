import DS from 'ember-data';
import attr from "ember-data/attr";
import {belongsTo, hasMany} from "ember-data/relationships";

export default DS.Model.extend({
    value: attr('string'),
    // option: belongsTo('option'),
    // product2Options: hasMany('product2-option'),
});
