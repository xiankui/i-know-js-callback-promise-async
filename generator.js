/**
 * promise + generator + co
 * 可直接调用生成器，也可配合执行控制器（co）调用
 * [co](https://github.com/tj/co/blob/master/index.js)
 */

const run = *() {
 var articles = yield getArticleList();
 var article = yield getArticle(articles[0].id);
 var author = yield getAuthor(article.authorId);
 
 console.log(author)
}

//////////////////////////////////////////////////////////

co(run)

//////////////////////////////////////////////////////////

// var gen = run();

// gen.next().value.then(articles => {
//     gen.next(articles).value.then(article => {
//         gen.next(article).value.then(author => {
//             gen.next(author)
//         })
//     })
// })


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

// promise + generator 执行控制器
function co (generator) {
    const iterator = generator();
 
    const advancer = (response) => {
        // Advance the iterator using the response of an asynchronous callback.
        const state = iterator.next(response);
 
        if (!state.done) {
            // Make the asynchronous function call the advancer.
            state.value.then(advancer);
        }
    }
 
    advancer();
};

