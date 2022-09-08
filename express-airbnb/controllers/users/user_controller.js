const userModel = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  register: async (req, res) => {
    const validatedValues = req.body;

    try {
      const user = await userModel.findOne({ email: validatedValues.email });
      if (user) {
        return res.status(409).json({ error: "email exists" });
      }
    } catch (err) {
      return res.status(500).json({ error: "failed to get user" });
    }

    const passHash = await bcrypt.hash(req.body.password, 10);
    const user = { ...req.body, password: passHash };

    try {
      await userModel.create(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "failed to register user" });
    }

    return res.status(201).json("New User Created");
  },
  login: async (req, res) => {
    let errMsg = "user email or password is incorrect";
    let user = null;

    try {
      user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).json({ error: errMsg });
      }
    } catch (err) {
      return res.status(500).json({ error: "failed to get user" });
    }

    const isPasswordOk = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordOk) {
      return res.status(401).json({ error: errMsg });
    }

    // generate JWT and return as response
    //backend still need knowledge of this token, to change the schema obj to plain js object
    //even with signature  jwt does not solve confidentiality, it only ensures that is not tempered with
    //we can be sure that the pay load is the original sender details, signature is used to verify that its is authentic
    //secret is set in every server, so any server can check its authentication

    //store the info from your get user into the token
    const userData = {
      email: user.email,
      firstName: user.first_name,
    };

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
        data: userData,
      },
      process.env.JWT_SECRET
    );
    //go try in the jwt.io past ein encoded to see wad you get backk
    //get from post man cos it will res.json there

    return res.json({ token });
  },
  logout: (req, res) => {
    try {
    } catch (error) {
      res.status(500);
      return res.json({ error: "failed to logout" });
    }
  },
  showProfile: async (req, res) => {
    let user = null;
    let userAuth = res.locals.userAuth; //this is where the token is saved

    //this is redundant, security, defence indepth
    if (!userAuth) {
      console.log(userAuth);
      return res.status(401).json();
    }

    try {
      user = await userModel.findOne({ email: userAuth.data.email }); //cos the userAuth email is in a data opbject, when signed token at login
      if (!user) {
        return res.status(404).json();
      }
    } catch (err) {
      return res.status(500).json({ error: "failed to get user" });
    }

    //only return the non sensitive data
    const userData = {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      gender: user.gender,
      aboutMe: user.about_me,
      image: user.image,
    };

    return res.json(userData);
  },
  editProfile: async (req, res) => {
    let user = null;
    let userAuth = res.locals.userAuth; //this is where the token is saved

    //this is redundant, security, defence indepth
    if (!userAuth) {
      console.log(userAuth);
      return res.status(401).json();
    }

    try {
      user = await userModel.findOneAndUpdate(
        {email: userAuth.data.email },
        {$set: {...req.body}},
        {new: true}
        ); 
      if (!user) {
        return res.status(404).json({ error: "User does not exists" });
      }
    } catch (err) {
      return res.status(500).json({ error: "failed to get user" });
    }

    //only return the non sensitive data
    const userData = {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      gender: user.gender,
      aboutMe: user.about_me,
      image: user.image,
    };

    return res.json(userData);
  },

  deleteProfile: async (req, res) => {
    let user = null;
    let userAuth = res.locals.userAuth; //this is where the token is saved

    //this is redundant, security, defence indepth
    if (!userAuth) {
      console.log(userAuth);
      return res.status(401).json();
    }

    try {
        user = await userModel.findOneAndDelete({email: userAuth.days})
    } catch (error) {
      res.status(500);
      return res.json({ error: "failed to delete profile" });
    }
  },
};

module.exports = userController;
