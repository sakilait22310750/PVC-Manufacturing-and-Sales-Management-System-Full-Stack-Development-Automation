import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
    },
    Adress: {
      type: String, 
    },
    phone: {
      type: Number,
    },
    Gender: {
      type: String,
    },
    Jobtitle: {
      type: String,
    },
    Salary: {
      type: String,
    },
    profilePicture: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    suppliermanager: {
      type: Boolean,
      default: false,
    },
    employemanager: {
      type: Boolean,
      default: false,
    },
    salesmanger: {
      type: Boolean,
      default: false,
    },
    inventrmanager: {
      type: Boolean,
      default: false,
    },
    deliverymanager: {
      type: Boolean,
      default: false,
    },
    supplier: {
      type: Boolean,
      default: false,
    },
    employee: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;