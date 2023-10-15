const router = require('express').Router();
const UserController = require('../controllers/user-controller');

router.get('/', async (req, res) => {
    try {
        await UserController.getAllUsers(req, res);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving users", error: err.message });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        await UserController.getSingleUser(req, res);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving user", error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        await UserController.createUser(req, res);
    } catch (err) {
        res.status(400).json({ message: "Error creating user", error: err.message });
    }
});

router.put('/:userId', async (req, res) => {
    try {
        await UserController.updateUser(req, res);
    } catch (err) {
        res.status(400).json({ message: "Error updating user", error: err.message });
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        await UserController.deleteUser(req, res);
    } catch (err) {
        res.status(500).json({ message: "Error deleting user", error: err.message });
    }
});

router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        await UserController.addFriend(req, res);
    } catch (err) {
        res.status(500).json({ message: "Error adding friend", error: err.message });
    }
});

router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        await UserController.removeFriend(req, res);
    } catch (err) {
        res.status(500).json({ message: "Error removing friend", error: err.message });
    }
});

module.exports = router;