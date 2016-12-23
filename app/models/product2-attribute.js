import DS from 'ember-data';
import attr from "ember-data/attr";
import {belongsTo, hasMany} from "ember-data/relationships";

export default DS.Model.extend({
    name: attr('string', { defaultValue: 'test!!!' }),
    product: belongsTo('product'),
    attributeValue: belongsTo('attribute-value'),
    attribute: belongsTo('attribute'),
});
