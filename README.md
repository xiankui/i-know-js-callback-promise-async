# 回调进化史

## callback一路

* 直接嵌套调用
* 对函数进行thunkify化（ fn(a, b, callback) => thunkify(fn, a, b)(callback) ）
* 使用生成器
* 使用生成器执行控制器

## promise一路

* 直接嵌套promise
* 使用生成器
* 使用生成器执行控制器【co】


## async * await

* es7 终极解决方案, 完美融合【promise + generator + co】


** 为了更像同步的异步，前进！ **