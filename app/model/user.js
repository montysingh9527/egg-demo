module.exports = (app) => {
  const { mongoose } = app;
  const { Schema } = mongoose;
  const mySchema = new Schema({
    name: { type: String },
    val: { type: String },
    create_time: { type: Date },
  });

  const Model = mongoose.model("User", mySchema);

  return Model;
};
