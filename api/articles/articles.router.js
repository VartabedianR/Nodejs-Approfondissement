const express = require('express');
const router = express.Router();
const articlesController = require('./articles.controller');
const auth = require('../../middlewares/auth');

// Route pour créer un article (utilisateur connecté)
router.post('/', auth, articlesController.createArticle);

// Route pour mettre à jour un article (administrateur uniquement)
router.put('/:id', auth, articlesController.updateArticle);

// Route pour supprimer un article (administrateur uniquement)
router.delete('/:id', auth, articlesController.deleteArticle);

module.exports = router;