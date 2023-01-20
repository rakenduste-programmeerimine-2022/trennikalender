const Joi = require("joi");
require("dotenv").config();
const { v4: uuid } = require("uuid");
const { sendEmail } = require("../helpers/mailer");
const { forgotpwsendEmail } = require("../helpers/forgotpwmailer");
const User = require("../models/user.model");
const { maxAge, generateJwt } = require("../helpers/generateJwt");

const userSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().required().min(4),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

exports.Signup = async (req, res) => {
  try {
    const result = userSchema.validate(req.body);
    if (result.error) {
      console.log(result.error.message);
      return res.json({
        error: true,
        status: 400,
        result: "error",
        message: "Palun kontrolli andmeid!",
      });
    }

    var user = await User.findOne({
      email: result.value.email,
    });
    if (user) {
      return res.json({ result: "error", message: "Email on juba kasutusel!" });
    }
    const hash = await User.hashPassword(result.value.password);
    const id = uuid();
    result.value.userId = id;

    delete result.value.confirmPassword;
    result.value.password = hash;
    let code = Math.floor(100000 + Math.random() * 900000);

    const sendCode = await sendEmail(result.value.email, code);
    if (sendCode.error) {
      return res.json({
        result: "error",
        message: "Kinnitusmeili ei õnnestunud saata",
      });
    }
    result.value.emailToken = code;
    const newUser = new User(result.value);
    await newUser.save();

    return res.status(200).json({
      result: "success",
      message: "Registreerimine õnnestus!",
    });
  } catch (err) {
    console.error("signup-error", err);
    return res.status(500).json({
      error: true,
      message: "Registreerimine ei õnnestunud",
    });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
     return res.json({ 
      result: "error", 
      message: "Valed andmed!" });
    }

    const user = await User.findOne({ email: email });
    
    if (!user) {
      return res.json({ 
        result: "error", 
        message: "Kasutajat ei leitud!" });
    }
    if (!user.active) {
      return res.json({ 
        result: "error", 
        message: "Konto pole aktiivne!" });
    }
    const isValid = await User.comparePasswords(password, user.password);
    if (!isValid) {
      return res.json({
        result: "error", 
        message: "Vale parool!"});
    }

    //luuakse jwt token. helpers/generateJwt
    const token = await generateJwt(user.email, user.userId);
    const loggeduser = (user.email, user.userId);
    //await user.save();

    res.json({
      result: "success",
      token: token,
      user: loggeduser,
      message: "Edukalt sisselogitud",
    });



  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({
      error: true,
      message: "Sisselogimine ei õnnestunud",
    });
  }
};

//konto aktiveerimine
exports.Activate = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.json({ 
        result: "error", 
        message: "Andmeid ei õnnestunud töödelda!" });
    }
    const user = await User.findOne({
      email: email,
      emailToken: code,
    });
    if (!user) {
      return res.json({ 
        result: "error", 
        message: "Valed andmed!" });
    } else {
      if (user.active)
        return res.json({ 
          result: "error", 
          message: "Konto on juba aktiivne!" });

      user.emailToken = "";
      user.active = true;
      await user.save();
      return res.json({
        result: "success", 
        message: "Konto aktiveeritud!",});
    }
  } catch (err) {
    console.error("activation-error", err);
    return res.status(500).json({
      error: true,
      message: "Konto aktiveerimine ei õnnestunud",
    });
  }
};

//parool ununenud
exports.ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.json({ 
        result: "error", 
        message: "Andmeid ei õnnestunud töödelda!" });
    }
    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      res.json({ 
        result: "error", 
        message: "Kasutajat ei leitud!" });
    }

    let code = Math.floor(100000 + Math.random() * 900000);
    let response = await forgotpwsendEmail(user.email, code);
    if (response.error) {
      res.json({ 
        result: "error", 
        message: "Emaili ei õnnestunud saata. Palun proovi uuesti." });
    }

    user.resetPasswordToken = code;
    await user.save();
    res.json({
      result: "success",
      message: "Saatsime teile parooli taastamiseks e-maili.",
    });

  } catch (err) {
    console.error("forgot-password-error", err);
    return res.status(500).json({
      error: true,
      message: "Ebaõnnestus, palun proovi uuesti!",
    });
  }
};

//uus parool
exports.ResetPassword = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;
    if (!token || !newPassword || !confirmPassword) {
      res.json({ 
        result: "error", 
        message: "Andmeid ei õnnestunud töödelda!" });
    }
    const user = await User.findOne({
      resetPasswordToken: req.body.token,
    });
    if (!user) {
     res.json({ 
      result: "error", 
      message: "Valed andmed!" });
    }
    if (newPassword !== confirmPassword) {
      res.json({ 
        result: "error", 
        message: "Paroolid ei kattu!" });
    }
    
    const hash = await User.hashPassword(req.body.newPassword);
    user.password = hash;
    user.resetPasswordToken = null;
    await user.save();
    return res.status(200).json({
        result: "success",
        message: "Parool edukalt muudetud!",
    });
  } catch (err) {
    console.error("reset-password-error", err);
    return res.status(500).json({
      error: true,
      message: "Parooli muutmine ei õnnestunud",
    });
  }
};


//get user by id
exports.UserProfile = (req, res) => {
    User.findOne({ "_id": req.params.id }, (error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        return res.send(result);
    });
};



exports.UpdateUser = (req, res) => {
 User.findOneAndUpdate({"_id": req.params.id},{
      $set:{
        email : req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        phonenumber: req.body.phonenumber,
        level: req.body.level,
      }
    }, function (err, data) {
      if (err){
        res.status(500).send(err)
    } else {
      res.status(200).send({message: 'UPDATED', data: data})
    }
    })
  }



