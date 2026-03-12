// Companies controller.

const model = require('./companies.model');

const getAll = async (req, res) => {
    try {
        const companies = await model.getAll(req.user.userId);
        res.json(companies);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getById = async (req, res) => {
    try {
        const company = await model.getById(Number(req.params.id), req.user.userId);
        if (!company) return res.status(404).json({ error: 'Company not found' });
        res.json(company);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const create = async (req, res) => {
    try {
        const { companyName, companyLogoUrl, website, description } = req.body;
        const company = await model.create({
            userId: req.user.userId,
            companyName,
            companyLogoUrl,
            website,
            description
        });
        res.status(201).json(company);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const update = async (req, res) => {
    try {
        await model.update(Number(req.params.id), req.user.userId, req.body);
        res.json({ message: 'Company updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const remove = async (req, res) => {
    try {
        await model.remove(Number(req.params.id), req.user.userId);
        res.json({ message: 'Company deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getAll, getById, create, update, remove };