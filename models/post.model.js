module.exports = function(mongoose) {
  const Post = mongoose.model(
    "post",
    mongoose.Schema(
      {
        title: {
          type: String,
          required: [true, "Title is a required field."]
        },
        description: {
          type: String,
          required: [true, "Description is a required field."]
        },
        content: {
          type: String,
          required: [true, "Content is a required field."]
        },
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category'
        },
        published: {
          type: Boolean,
          default: false
        },
        meta: {
          slug: {
            type: String
          },
          views: {
            type: Number,
            default: 0
          },
          likes: {
            type: Number,
            default: 0
          }
        }
      },
      { 
        timestamps: true 
      }
    )
  );
  return Post;
};