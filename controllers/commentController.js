const commentModel = require("../models/comment-model");

async function createComment(req, res) {
    const { inv_id, comment } = req.body;
    const newComment = await commentModel.createComment(inv_id, comment);
    res.redirect(`/inv/detail/${inv_id}`);
}

async function getCommentsByInventoryId(req, res) {
    const inv_id = req.params.inv_id;
    const comments = await commentModel.findByInventoryId(inv_id);
    res.json(comments);
}

module.exports = { createComment, getCommentsByInventoryId };
