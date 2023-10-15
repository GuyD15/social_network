const { User, Thought } = require('../models/');

const userController = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find({});
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                res.status(404).json({ message: 'User not found!' });
                return;
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedUser) {
                res.status(404).json({ message: 'User not found!' });
                return;
            }
            res.json(updatedUser);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            // BONUS: Remove the user's associated thoughts
            await Thought.deleteMany({ username: req.params.userId });
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            if (!deletedUser) {
                res.status(404).json({ message: 'User not found!' });
                return;
            }
            res.json({ message: 'User and associated thoughts deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'User not found!' });
                return;
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeFriend(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'User not found!' });
                return;
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

module.exports = userController;
