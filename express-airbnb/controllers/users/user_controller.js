const userModel = require('../../models/user')
const bcrypt = require("bcrypt")

const userController = {
    register: async (req, res) => {
       const validatedValues = req.body

       try {
           const user = await userModel.findOne({ email: validatedValues.email })
           if (user) {
               return res.status(409).json({error: "email exists"})
           }
       } catch (err) {
        return res.status(500).json({error: "failed to get user"})
       }

       const passHash = await bcrypt.hash(req.body.password, 10)
       const user = {...req.body, password: passHash}

       try {
           await userModel.create(user)
       } catch (err) {
           console.log(err)
           return res.status(500).json({error: "failed to register user"})
       }

       return res.status(201).json("New User Created")

    },
    login: async (req, res) => {

            let errMsg = "user email or password is incorrect"
            let user = null
    
            try {
                user = await userModel.findOne({ email: req.body.email })
                if (!user) {
                    return res.status(401).json({error: errMsg})
                }
            } catch (err) {
                return res.status(500).json({error: "failed to get user"})
            }
    
            const isPasswordOk = await bcrypt.compare(req.body.password, user.password)
    
            if (!isPasswordOk) {
                return res.status(401).json({error: errMsg})
            }
    
            // TODO: generate JWT and return as response
             // generate JWT and return as response
             //backend still need knowledge of this token, to object change the schma obj to pplain js object
             //even with teh signature still can see, jwt does not solve convidentiality, ensure dat ais not tempered with
             //we can be sure that the pay load is the original sender details, signature is used to verify that its is authentic?
             //secret is set in every server, so any server can check its authentication
             const userData = {//this is wad will be set in the token
                email: user.email,
                name: user.first_name,
            }
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
                data: userData,
            }, process.env.JWT_SECRET)
             //go try in the jwt.io past ein encoded to see wad you get backk
             //get from post man cos it will res.json there
    
             return res.json({token})

    },
    logout: (req, res) => {
        try {
            
        } catch (error) {
            res.status(500)
            return res.json({error: "failed to logout"})
        }

    },
    showProfile: async (req, res) => {

        try {
            const user = await userModel.findById({_id: req.params.user_id})
            return res.json(user)
        } catch (error) {
            res.status(500)
            return res.json({error: "failed to show profile"})
        }
     

    },
    editProfile: (req, res) => {
        try {
            
        } catch (error) {
            res.status(500)
            return res.json({error: "failed to edit profile"})
        }

    },
    deleteProfile: (req, res) => {
        try {
            
        } catch (error) {
            res.status(500)
            return res.json({error: "failed to delete profile"})
        }

    },
}

module.exports = userController