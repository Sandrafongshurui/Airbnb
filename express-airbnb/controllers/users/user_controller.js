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
    login: (req, res) => {
        try {
            
        } catch (error) {
            res.status(500)
            return res.json({error: "failed to login"})
        }

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