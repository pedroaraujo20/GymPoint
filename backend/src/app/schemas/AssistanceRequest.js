import mongoose from 'mongoose';

const AssistSchema = new mongoose.Schema(
  {
    student_id: {
      type: Number,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
    },
    answer_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('AssistanceRequest', AssistSchema);
