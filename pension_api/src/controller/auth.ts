import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import pool from "../utils/helper";
import dotenv from "dotenv";
import queries from "../utils/query";
import { query } from "express";
import { eventNames } from "cluster";

dotenv.config();
const register = async(req: any, res: any) => {

    const body = req.body;
    const name = req.body.name;
    const empCode = req.body.empCode;
    const phoneNo = req.body.phoneNo;
    const zone = req.body.zone;
    const password = req.body.password;
    const role = 'agent';

    //check if user exists
    const existingUser = await pool.query(queries.existingUser, [empCode, phoneNo]);

    //if exists return status 200 with error message
    if(existingUser.rowCount != 0){
        return res.status(400).json({
            error: "user already registered"
        });
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    console.log("salt:", salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("hashed password:", hashedPassword);
   
    //save email and password to database
    const newUser = await pool.query(queries.newUser,[name, empCode, hashedPassword, phoneNo, zone, role]);
    console.log(newUser.command);
    
    if(newUser.command == 'INSERT'){
        return res.status(200).json({
            data: "user created successfully"
        });
    }
}

let refreshTokens: Array<string> = [];

const login = async(req: any, res: any) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
  
    // Look for user email in the database
    const loginUser = await pool.query(queries.loginUser,[username]);
  
    // If user not found, send error message
    if (loginUser.rowCount == 0) {
      return res.status(400).json({
        error: "invalid credentials"
      });
    }
    
    const userPassword = loginUser.rows[0].password;
    const role = loginUser.rows[0].role;

    // Compare hased password with user password to see if they are valid
    let isMatch = await bcrypt.compare(password, userPassword);
  
    if (!isMatch) {
      return res.status(400).json({
        error: "invalid credentials"
      });
    }
  
    // Send JWT access token
    const accessToken = await JWT.sign(
      { username },
      process.env.PRIVATEKEY || '',
      {
        expiresIn: process.env.ACCESSTOKEN,
      }
    );
  
    // Refresh token
    var token:string;
     token = await JWT.sign(
      { username },
      process.env.PRIVATEKEY || '',
      {
        expiresIn: process.env.REFRESHTOKEN,
      }
    );
  
    // Set refersh token in refreshTokens array
    refreshTokens.push(token as string);
  
    res.json({
        token,
        username,
        role
    });
} 

export {register, login};