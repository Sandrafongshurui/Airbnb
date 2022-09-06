const userModel = require('../../models/user')

const userController = {
    register: (req, res) => {
        try {
            
        } catch (error) {
            res.status(500)
            return res.json({error: "failed to register"})
        }

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