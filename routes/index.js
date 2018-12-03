const fetch = require('node-fetch');

module.exports = {
    getHomePage: function(req, res) {
        var query = "SELECT * FROM `site` ORDER BY id ASC"; // query database to get all the articles
        var previews = [];
        var len;
        var finished = false;
        // execute query
        db.query(query)
            .then(rows => {
                len = rows.length;
                console.log(rows);
                if (len == 0) {
                    res.render('index.ejs', {
                        title: "Welcome to News | View Articles",
                        articles: rows,
                        previews: previews
                    });
                } else {
                    console.log('print ')
                    rows.forEach(element => {
                        previews.push(element);
                        
                    });
                    res.render('index.ejs', {
                        title: "Welcome to News | View Articles",
                        previews: previews,
                    });
                }
        });
    },
};