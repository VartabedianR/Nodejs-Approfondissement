const articleService = require("./articles.service");

// Ici, création d'un article
async function createArticle(req, res, next) {
    try {
        const data = {
            ...req.body,
            user: req.user._id
        };
        const article = await articleService.createArticle(data);
        req.io.emit("articleCreated", article);
        res.status(201).json(article);
    } catch (error) {
        next(error);
    }
}

// Ici, mise à jour d'un article
async function updateArticle(req, res, next) {
    try {
        // seulement autorisation administrateur
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: 'Accès interdit : admin only.' });
        }
        const article = await articleService.updateArticle(req.params.id, req.body);
        if (!article) return res.status(404).json({ message: 'Article non trouvé.' });
        res.json(article);
    } catch (error) {
        next(error);
    }
}

// Ici, suppression d'un article
async function deleteArticle(req, res, next) {
    try {
        // seulement autorisation administrateur
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: 'Accès interdit : admin only.' });
        }
        const deleted = await articleService.deleteArticle(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Article non trouvé.' });
        res.json({ message: 'Article supprimé avec succès.' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createArticle,
    updateArticle,
    deleteArticle
};