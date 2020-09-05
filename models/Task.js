const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const TaskSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
      type: String,
      required: true
    },
    description: {
        type: String,
        required: false
    },
    privacy: {
        type: String,
        enums: ['public', 'private'],
        required: true
    },
    tscore: {
      type: Number,
      default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);
