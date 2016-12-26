import DS from 'ember-data';
import {belongsTo, hasMany} from "ember-data/relationships";


export default DS.Model.extend({
    name: DS.attr(),
    products: hasMany('product'),
});
