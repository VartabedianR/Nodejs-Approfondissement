const Article = require("./articles.schema");

// Ici, création d'un article
async function createArticle(data) {
    const article = new Article(data);
    return await article.save();
}

// Ici, mise à jour d'un article (par id)
async function updateArticle(articleId, data) {
    const article = await Article.findByIdAndUpdate(
        articleId,
        data,
        {
            new: true,
            runValidators: true,
        }
    );
    return article;
}

// Ici, suppression d'un article (par id)
async function deleteArticle(articleId) {
    return await Article.findByIdAndDelete(articleId);
}

// Ici, récupération de tous les articles d'un utilisateur avec les infos (sans le mdp)
async function getArticlesByUser(userId) {
    return Article.find({ user: userId })
        .populate({
            path: 'user',
            select:'-password'
        });
}

module.exports = {
    createArticle,
    updateArticle,
    deleteArticle,
    getArticlesByUser
};