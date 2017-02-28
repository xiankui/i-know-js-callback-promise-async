/**
 * thunkify + generator + controller
 * callback版的async * await
 * [thunkify](https://github.com/tj/node-thunkify)
 */

// 直接callback
getArticleList(function(articles){
    getArticle(articles[0].id, function(article){
        getAuthor(article.authorId, function(author){
            console.log('result from callback', author);
        })
    })
})

/////////////////////////////////////////////////////////////////

// thunkify包装器
thunkify(getArticleList)(articles => {
    thunkify(getArticle, articles[0].id)(article => {
        thunkify(getAuthor, article.authorId)(author => {
            console.log('result from thunkify', author)
        })
    })
})

/////////////////////////////////////////////////////////////////
function *gen() {
    var articles = yield thunkify(getArticleList);
    var article = yield thunkify(getArticle, articles[0].id);
    var author = yield thunkify(getAuthor, article.authorId);

    console.log('result from thunkify + generator + controller', author)
}

//////////////////////////////
// thunkify + generator
const g = gen();
g.next().value(articles => {
    g.next(articles).value(article => {
        g.next(article).value(author => {
            g.next(author)
        })
    })
})

///////////////////////////
// thunkify + generator + controller控制版
controller(gen);

//////////////////////////////////////////////////////////////////

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



/**
 * Transforms a function that takes multiple arguments into a
 * function that takes just the last argument of the original function.
 *
 * @param {Function}
 * @param {...*}
 */
function thunkify (method, ...args) {
    return (callback) => {
        args.push(callback);

        return method.apply({}, args);
    };
};

/**
 * Initiates a generator and iterates through each function supplied
 * via the yield operator.
 * 
 * @param {Function}
 */
// thunkify + generator 执行控制器
function controller (generator) {
    const iterator = generator();
 
    const advancer = (response) => {
        // Advance the iterator using the response of an asynchronous callback.
        const state = iterator.next(response);
 
        if (!state.done) {
            // Make the asynchronous function call the advancer.
            state.value(advancer);
        }
    }
 
    advancer();
};