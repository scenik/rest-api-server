module.exports = function(mongoose) {
  const User = mongoose.model(
    "user",
    mongoose.Schema(
      {
        username: {
          type: String,
          required: [true, "Username name is a required field."]
        },
        password: {
          type: String,
          required: [true, "Password is a required field."]
        },
        isAdmin: {
          type: Boolean,
          default: false
        },
        isEditor: {
          type: Boolean,
          default: false
        },
        isMember: {
          type: Boolean,
          default: true
        }
      },
      {
        timestamps: true
      }
    )
  );
  return User;
}