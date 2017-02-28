/**
 * promise直接调用
 */

getArticleList().then((articles) => {
    console.log(articles);

    var articleId = articles[0].id;

    return getArticle(articleId);
}).then(article => {
    console.log(article);

    var authorId = article.authorId;

    return getAuthor(authorId)
}).then(author => {
    console.log(author)
}).catch(err => {
    console.error(err)
})


function getArticleList(){
    return new Promise(function(resolve, reject) {
        fetch("http://beta.json-generator.com/api/json/get/Ey8JqwIh")
        .then(response => response.json())
        .then(result => resolve(result))
        .catch(err => {
            reject(err)
        })
    })
}

function getArticle(id) {
    return new Promise((resolve, reject) => {
        fetch("http://beta.json-generator.com/api/json/get/EkI02vUn?id=" + id)
        .then(response => response.json())
        .then(result => resolve(result))
        .catch(err => reject(err))
    })
}

function getAuthor(id) {
    return new Promise((resolve, reject) => {
        fetch("http://beta.json-generator.com/api/json/get/E105pDLh?author=" + id)
        .then(response => response.json())
        .then(result => resolve(result))
        .catch(err => reject(err))
    })
}




