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
      return res.status(201).json("New User Created");
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "failed to register user" });
    }

    
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
    //even with signature  jwt does not solve confidentiality,it only ensures that is not tempered with
    //we can be sure that the pay load is the original sender details, signature is used to verify that its is authentic
    //secret is set in every server, so any server can check its authentication
    //change the schema obj to plain js object
    const userData = {
      userId: user._id
    };


    //gnerate the token, that will pass to FE, afte the login req then set in local with this token
    //token will pass back to BE through post/patch and go through authmiddleware to routes that requires authorization
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
        data: userData,
      },
      process.env.JWT_SECRET
    );
    //go try in the jwt.io past ein encoded to see wad you get backk
    //get from post man cos it will res.json there it will an {}, token : encryptions

    return res.json({ token });
  },
  logout: (req, res) => {
    // let user = null;
    // let userAuth = res.locals.userAuth; //this is where the token is saved

    // try {
    // if(userAuth)
    
    // } catch (error) {
    //   res.status(500);
    //   return res.json({ error: "failed to logout" });
    // }
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
      console.log(user)
      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: "failed to get user" });
    }
   
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
      return res.status(200).json({ error: "Profile edited" });
    } catch (err) {
      return res.status(500).json({ error: "failed to get user" });
    }

    
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
        return res.status(200).json({ error: "Profile deleted" });
    } catch (error) {
      res.status(500);
      return res.json({ error: "failed to delete profile" });
    }

   
  },
};

module.exports = userController;
