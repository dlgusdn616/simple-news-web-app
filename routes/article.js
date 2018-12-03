const fs = require('fs');
const fetch = require('node-fetch');

module.exports = {
    addArticlePage: function(req, res) {
        res.render('add-article.ejs', {
            title: "Welcome to News | Add a new article"
            ,message: ''
        });
    },
    addArticle: function(req, res) {
        let message = '';
        let article = req.body.article;
        console.log(article);
        let articleQuery = "SELECT * FROM `site` WHERE url='" + article +"'";
        console.log(articleQuery);
        db.query(articleQuery)
            .then(rows => {
                console.log(articleQuery, ' is executed');
                if (rows.length > 0) {
                    message = 'article already exists';
                    res.render('add-article.ejs', {
                        message,
                        title: "Welcome to News | Add a new article"
                    });
                } else if (rows.length == 0) {
                    var data = {key: '5c034296a2ed425bf788e1f8c0f57288274132a7141ee', q: article };
                    fetch('https://api.linkpreview.net', {
                        method: 'POST',
                        mode: 'cors', 
                        body: JSON.stringify(data),
                    })
                    .then(res => res.json())
                    .then(response => {
                        let query = "INSERT INTO `site` (title, description, image, url) VALUES (?, ?, ?, ?)";
                         db.query(query, [response.title, response.description, response.image, response.url])
                        .then(rows => {
                            res.redirect('/');
                        })
                    });
                }
            });
    },
    editArticlePage: function(req, res) {
        res.render('edit-article.ejs', {
            title: "Edit  article",
            message: ''
        });
    },
    editArticle: function(req, res) {
        let article = req.body.article;
        let query = "SELECT * FROM `site` WHERE url='" + article + "'";
        db.query(query)
            .then(rows => {
                var data = {key: '5c034296a2ed425bf788e1f8c0f57288274132a7141ee', q: article };
                fetch('https://api.linkpreview.net', {
                    method: 'POST',
                    mode: 'cors', 
                    body: JSON.stringify(data),
                })
                .then(res => res.json())
                .then(response => {
                    let query = "UPDATE `site` SET title="+ reponse.title + ",description" + response.description + ", image=" + response.image + ", url='" + response.url + "'";
                    db.query(query)
                    .then(rows => {
                        res.redirect('/');
                    })
                });
            });
    },
    deleteArticlePage: function(req, res) {
        res.render('delete-article.ejs', {
            title: "Welcome to News | Delete a article"
            ,message: ''
        });
    },
    deleteArticle: function(req, res) {
        let article = req.body.article;
        let deleteUserQuery = "DELETE FROM `site` WHERE url='" + article + "'";

        db.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};

