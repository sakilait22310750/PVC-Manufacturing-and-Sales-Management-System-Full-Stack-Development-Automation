import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandle } from "../utils/error.js";
import jwt from 'jsonwebtoken';


export const signup = async (req, res, next) => {
    
    const { username , email, password,supplier,employee ,Name,Adress,phone,Gender,Jobtitle,Salary } = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        
        next(errorHandle(400, 'all fields are required'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);



    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        supplier : supplier || false ,
        employee: employee || false,
        Name,
        Adress,
        phone,
        Gender,
        Jobtitle,
        Salary

    });

   

    try {
        await newUser.save();
        res.json(  'Signup succes');
        
    } catch (error) {

       next(error);



        
    }
}


export const signgin = async (req, res, next) => {

    const { username , email, password } = req.body;

    if( !email || !password  || email === '' || password === ''){
        
       return next(errorHandle(400, 'all fields are required'));
    }

    try {
        const validUser = await User.findOne({ email });
        if(!validUser) {
            next(errorHandle(404, 'User not found'));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
           return next(errorHandle(404, 'Invalid password'));
        }

        const token = jwt.sign({id: validUser._id, isAdmin: validUser.isAdmin}, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res.status(200).cookie('access_token', token, {
            httponly: true
        }).json(rest);
    } catch (error) {
        next(error);
    }


}

export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
      const user = await User.findOne({ email });
      if (user) {
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET);
        const { password, ...rest } = user._doc;
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json(rest);
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({
          username:
            name.toLowerCase().split(' ').join('') +
            Math.random().toString(9).slice(-4),
          email,
          password: hashedPassword,
          profilePicture: googlePhotoUrl,
        });
        await newUser.save();
        const token = jwt.sign({id: newUser._id, isAdmin: newUser.isAdmin}, process.env.JWT_SECRET);
        const { password, ...rest } = newUser._doc;
        res
          .status(200)
          .cookie('access_token', token, {
            httpOnly: true,
          })
          .json(rest);
      }
    } catch (error) {
      next(error);
    }
  };