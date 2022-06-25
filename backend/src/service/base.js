const {
  default: mongoose
} = require("mongoose");

module.exports = model => ({
  create: (data) => {
    const entity = new model(data);
    const error = entity.validateSync();
    if (!error)
      return entity.save();
    else
      throw new Error('Create | Model is not valid!');
  },
  Search: (expression) => model.find(expression).populate(),
  findAll: () => model.find({}).populate(),
  findOne: id => model.findById(id),
  updateOne: async (id, data) => {
    const entity = new model(data);
    const error = entity.validateSync();
    if (!error)
      return model.findByIdAndUpdate(id, data, {
        new: true
      });
    else
      throw new Error('Update | Model is not valid!');

  },
  delete: async (id) => {
    const entity = await model.findByIdAndRemove(id);
    if (!entity)
      throw new Error('Not found');
    else
      return entity.delete();
  },
});