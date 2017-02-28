
/**
 * callback
 */
 
getArticleList(function(articles){
    console.log(articles)
    getArticle(articles[0].id, function(article){
        console.log(article)
        getAuthor(article.authorId, function(author){
            console.log(author);
        })
    })
})

function getAuthor(id, callback){
    $.ajax("http://beta.json-generator.com/api/json/get/E105pDLh",{
        author: id
    }).done(function(result){
        callback(result);
    })
}

function getArticle(id, callback){
    $.ajax("http://beta.json-generator.com/api/json/get/EkI02vUn",{
        id: id
    }).done(function(result){
        callback(result);
    })
}

function getArticleList(callback){
    $.ajax("http://beta.json-generator.com/api/json/get/Ey8JqwIh").done(function(result){
        callback(result);
    });
}