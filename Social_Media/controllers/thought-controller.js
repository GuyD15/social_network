const { Thought, User } = require('../models/');

const thoughtController = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findById(req.params.id);
            if (!thought) {
                res.status(404).json({ message: 'Thought not found!' });
                return;
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body);
            await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } }, { new: true });
            res.json(newThought);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedThought) {
                res.status(404).json({ message: 'Thought not found!' });
                return;
            }
            res.json(updatedThought);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const deletedThought = await Thought.findByIdAndDelete(req.params.id);
            if (!deletedThought) {
                res.status(404).json({ message: 'Thought not found!' });
                return;
            }
            res.json({ message: 'Thought deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $addToSet: { reactions: req.body } },
                { new: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'Thought not found!' });
                return;
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },


    async removeReaction(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'Thought not found!' });
                return;
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = thoughtController;
