module.exports = function(mongoose) {
  var categorySchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, "Category name is a required field."]
      },
      description: {
        type: String
      },
      slug: {
        type: String
      }
    }
  );

  categorySchema.query.byName = function(name) {
    return this.where({ name: new RegExp(name, 'i') });
  }

  return mongoose.model('category', categorySchema);
}