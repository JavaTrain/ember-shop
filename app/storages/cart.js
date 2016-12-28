import StorageArray from 'ember-local-storage/local/array';

const Storage = StorageArray.extend();

// Uncomment if you would like to set initialState
Storage.reopenClass({
  // initialState() {
  //   return ['hello'];
  // }
});

export default Storage;