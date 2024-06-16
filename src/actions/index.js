"use server";

import connectToDB from '@/database';
import User from '@/models';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// Ensure the JWT secret is consistent
const jwtSecret = "DEFAULT_KEY";

if (!jwtSecret) {
  throw new Error("JWT_SECRET environment variable is not set.");
}

const registerUserAction = async (formData) => {
  await connectToDB();
  try {
    const { username, email, password } = formData;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return {
        message: "User already exists",
        success: false
      };
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPass
    });
    const savedUser = await newUser.save();
    if (savedUser) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(savedUser)),
        message: "User registered successfully"
      };
    } else {
      return {
        success: false,
        message: "Something went wrong"
      };
    }
  } catch (error) {
    console.log("Error occurred during registration:", error);
    return {
      message: "Some error occurred",
      success: false
    };
  }
};

const loginUserAction = async (formData) => {
  await connectToDB();
  try {

    const { username, password } = formData;
    console.log("logging user in ")
    console.log(formData)
    console.log(username);
    const checkUser = await User.findOne({ email: username });
    console.log(checkUser);
    if (!checkUser) {
      return {
        success: false,
        message: "User does not exist, please Sign up"
      };
    }

    const isPasswordValid = await bcryptjs.compare(password, checkUser.password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid password"
      };
    }

    // If password is valid, generate JWT token
    const token = jwt.sign(
      { id: checkUser._id, username: checkUser.username, email: checkUser.email },
      jwtSecret,
      { expiresIn: '1h' }
    );
    const getCookies = cookies();
    getCookies.set('token', token, { httpOnly: true });
    return {
      success: true,
      token: token,
      message: "Login successful"
    };

  } catch (error) {
    console.log("Error occurred during login:", error);
    return {
      success: false,
      message: "Something went wrong"
    };
  }
};

const fetchUserAction = async () => {
  await connectToDB();
  try {
    const getCookies = cookies();
    const token = getCookies.get("token")?.value || "";
    if (token === "") {
      return {
        success: false,
        message: "Token is invalid"
      };
    }
    const decodedToken = jwt.verify(token, jwtSecret);
    const getUserInfo = await User.findOne({ _id: decodedToken.id });
    if (getUserInfo) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(getUserInfo))
      };
    } else {
      return {
        success: false,
        message: "Some error occurred! Please try again"
      };
    }
  } catch (error) {
    console.log("Error occurred during user fetching:", error);
    return {
      success: false,
      message: "Something went wrong"
    };
  }
};

export { registerUserAction, loginUserAction, fetchUserAction };
