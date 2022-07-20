const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const routes = require('./router');

const app = express();

const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

// app.use('/articles', routes);

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
};

// create model using mongoose
const Article = mongoose.model("Article", articleSchema);

app.get('/', (req, res) => {
    res.end("Welcome");
});

app.get('/articles', (req, res) => {
    Article.find(function(err, foundArticles){
        if(!err) {
            res.send(foundArticles);
        } else {
            res.send(err);
        }  
    });
});

app.post('/articles', (req, res) => {
    console.log(req.body.title);
    console.log(req.body.content);

    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });

    newArticle.save(function(err){
        if (!err) {
            res.send("Article berhasil ditambahkan")
        } else {
            res.send(err)
        }
    });  
});

app.delete('/articles', (req, res) => {
    Article.deleteMany(function(err){
        if (!err) {
            res.send("Successfully deleted all articles");
        } else {
            res.send(err);
        }
    })
})

app.get('/articles/:articleTitle', (req, res) => {
    const getTitle = req.params.articleTitle;
    Article.findOne({ title: getTitle }, (err, foundArticles) => {
        if (foundArticles) {
            res.send(foundArticles);
        } else {
            res.send("No articles found");
        }
    })
    // console.log(getTitle);
})

app.put('/articles/:articleTitle', (req, res) => {
    Article.updateMany(
        { title: req.params.articleTitle }, 
        { title: req.body.title, content: req.body.content }, 
        { overwrite: true },
        function(err) {
            if(!err) {
                res.send("Update sukses");
            }
        }
    );
});

app.patch('/articles/:articleTitle', (req, res) => {
    Article.update(
        {title: req.params.articleTitle}, 
        {$set: req.body},
        function(err) {
            if (!err) {
                res.send("Update berhasil");
            } else {
                res.send(err);
            }
        }
    )
})

app.delete('/articles/:articleTitle', (req, res) => {
    const deleteTitle = req.params.articleTitle;
    Article.deleteOne({ title: deleteTitle }, function(err) {
        if (!err) {
            res.send(`Successfully deleted ${deleteTitle} articles`);
        } else {
            res.send("Artikel tidak ada");
        }
    })
})

app.listen(port, () => {
    console.log('listening on port 3000');
})
