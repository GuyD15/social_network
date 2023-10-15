const router = require('express').Router();
const ThoughtController = require('../controllers/thought-controller');

router.get('/', async (req, res) => {
    try {
        await ThoughtController.getAllThoughts(req, res);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving thoughts", error: err.message });
    }
});

router.get('/:thoughtId', async (req, res) => {
    try {
        await ThoughtController.getSingleThought(req, res);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving thought", error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        await ThoughtController.createThought(req, res);
    } catch (err) {
        res.status(400).json({ message: "Error creating thought", error: err.message });
    }
});

router.put('/:thoughtId', async (req, res) => {
    try {
        await ThoughtController.updateThought(req, res);
    } catch (err) {
        res.status(400).json({ message: "Error updating thought", error: err.message });
    }
});

router.delete('/:thoughtId', async (req, res) => {
    try {
        await ThoughtController.deleteThought(req, res);
    } catch (err) {
        res.status(500).json({ message: "Error deleting thought", error: err.message });
    }
});

router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        await ThoughtController.addReaction(req, res);
    } catch (err) {
        res.status(500).json({ message: "Error adding reaction", error: err.message });
    }
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        await ThoughtController.removeReaction(req, res);
    } catch (err) {
        res.status(500).json({ message: "Error removing reaction", error: err.message });
    }
});

module.exports = router;
