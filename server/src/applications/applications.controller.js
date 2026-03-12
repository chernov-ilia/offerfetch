// Applications controller.
// Handles request/response logic for application endpoints.

const model = require('./applications.model');

const getAll = async (req, res) => {
    try {
        const applications = await model.getAll(req.user.userId);
        res.json(applications);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getById = async (req, res) => {
    try {
        const application = await model.getById(Number(req.params.id), req.user.userId);
        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.json(application);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const create = async (req, res) => {
    try {
        const { companyId, currentStatusId, workTypeId, cityId, title, appUrl, description, salaryMin, salaryMax, source } = req.body;

        const application = await model.create({
            userId: req.user.userId,
            companyId,
            currentStatusId,
            workTypeId,
            cityId,
            title,
            appUrl,
            description,
            salaryMin,
            salaryMax,
            source
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const update = async (req, res) => {
    try {
        await model.update(Number(req.params.id), req.user.userId, req.body);
        res.json({ message: 'Application updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const archive = async (req, res) => {
    try {
        await model.archive(Number(req.params.id), req.user.userId);
        res.json({ message: 'Application archived successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getAll, getById, create, update, archive };