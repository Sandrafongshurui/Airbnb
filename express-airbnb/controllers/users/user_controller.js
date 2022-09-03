const userModel = require('../models/user')

const userControler = {
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
    showProfile: (req, res) => {
        try {
            
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