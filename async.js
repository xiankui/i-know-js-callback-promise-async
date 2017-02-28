/**
 * es7 async * await
 * 是 promise + generator + co 的语法糖
 */

async function run() {
 var articles = await getArticleList();
 var article = await getArticle(articles[0].id);
 var author = await getAuthor(article.authorId);

 return author
}

run().then(author => console.log(author))

//////////////////////////////////////////////////////
 
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



