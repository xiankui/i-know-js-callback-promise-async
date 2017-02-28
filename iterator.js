
/**
 * 迭代器
 * 迭代器是实现了[Symbol.iterator] && next方法的对象，
 */
var iterator = (function () {
	var nextVal;

	return {
		// for .. of循环需要
		[Symbol.iterator]: function () { return this; },

		// 标准迭代器方法
		next: function () {
			if (nextVal === undefined) {
				nextVal = 1;
			} else {
				nextVal = ( 3 * nextVal ) + 6;
			}

			return {
				value: nextVal,
				done: false
			}
		}
	}
})();



for (let v of iterator) {
	console.log(v)

	if (v > 100) break;	
}

console.log('****************迭代器*生成器*分割线******************')


/**
 * 生成器就是一种迭代器
 * 调用生成器函数，生成了生成器
 */
function *gen() {
	var nextVal;

	while (true) {
		if (nextVal === undefined) {
			nextVal = 1;
		} else {
			nextVal = ( 3 * nextVal ) + 6;
		}

		yield nextVal;
	}
}	

var g = gen();

for (let v of g) {
	console.log(v)

	if (v > 100) break;
}



