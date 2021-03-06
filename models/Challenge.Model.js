const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  idChallenger: Schema.Types.ObjectId,
  userChallenged: String,
  time: Number,
  score: Number,
  hasBeenBeated: {type : String, default: "nop"},
  userCreator: { type: Schema.Types.ObjectId, ref: 'User' }

}, {
    timestamps: true
})


module.exports = model("Challenge", userSchema)
