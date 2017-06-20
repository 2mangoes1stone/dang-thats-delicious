const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
  res.render('index');
};

exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store' });
}

exports.createStore = async (req, res) => {
  const store = await (new Store(req.body)).save();
  req.flash('success', `Successfully Created ${store.name}. Care to leave a review? `)
  res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
  // 1.Query the database for all stores
  const stores = await Store.find();
  console.log(stores[0]);
  res.render('stores', { title: 'Stores', stores });
}

exports.editStore = async (req, res) => {
  // 1 .Find th store given the ID
  const store = await Store.findOne ({ _id: req.params.id })
  // 2. Confirm they are the owner of the store
  // TODO
  // 3. Render out the edit for so that the user can update their store
  res.render('editStore', {title: `Edit ${store.name}`, store});
}

exports.updateStore = async (req, res) => {
  // find and update the store
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, 
  { new: true, // return the new store instead of the old one  
    runValidators: true
  }).exec();
  req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store →</a>`) 
  res.redirect(`/stores/${store._id}/edit`)
  // Redirect to the new store and tell it worked
}