// Comments controller.

const model = require('./comments.model');

const getByApplication = async (req, res) => {
    try {
        const comments = await model.getByApplication(
            Number(req.params.applicationId),
            req.user.userId
        );
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const create = async (req, res) => {
    try {
        const comment = await model.create({
            userId: req.user.userId,
            applicationId: Number(req.params.applicationId),
            body: req.body.body
        });
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const remove = async (req, res) => {
    try {
        await model.remove(Number(req.params.commentId), req.user.userId);
        res.json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getByApplication, create, remove };