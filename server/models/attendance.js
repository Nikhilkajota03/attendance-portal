import mongoose from 'mongoose';

// Define schema for attendance records
const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true
  },
  records: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true
    },
    rollNo: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["present", "absent"]
    }
  }]
});

attendanceSchema.index({ date: 1, 'records.userId': 1 }, { unique: true });
attendanceSchema.index({ date: 1, 'records.rollNo': 1 }, { unique: true });

// Define Attendance model
const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
