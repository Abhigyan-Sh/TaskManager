import mongoose from 'mongoose';
const { Schema } = mongoose;

const TaskSchema = new Schema(
    {
      task: {
        type: String,
        required: true,
        unique: true,
      },
    },
    { timestamps: true }    
);

export default mongoose.model('tasks', TaskSchema);