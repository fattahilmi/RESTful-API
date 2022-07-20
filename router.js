// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

// const articleSchema = {
//     title: String,
//     content: String
// };

// // create model using mongoose
// const Article = mongoose.model("Article", articleSchema);

// router.get('/', function (req, res) {
//     Article.find(function(err, foundArticles){
//         if(!err) {
//             res.send(foundArticles);
//         } else {
//             res.send(err);
//         }  
//     });
// });

// router.post('/', function (req, res) {
//     const newArticle = new Article({
//         title: req.body.title,
//         content: req.body.content
//     });

//     newArticle.save(function(err){
//         if (!err) {
//             res.send("Article berhasil ditambahkan")
//         } else {
//             res.send(err)
//         }
//     });
// })

// router.delete('/', function (req, res) {
//     Article.deleteMany(function(err){
//         if (!err) {
//             res.send("Successfully deleted all articles");
//         } else {
//             res.send(err);
//         }
//     })
// })

// module.exports = router;