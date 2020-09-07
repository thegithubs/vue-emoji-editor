!(function(win, fun){
  if ( typeof module === "object" && typeof module.exports === "object" ) {
    module.exports = P();
  } else if (typeof define === 'function') {
    define(P);
  } else {
    win.P = fun();
  }
})(typeof window !== undefined ? window : this, function(){
  
  'use strict';
  
  var P = {};
  
  function objectCall(O){
    return Object.prototype.toString.call(O);
  }
  
  function isNumber(O) {
    return objectCall(O) === '[object Number]';
  }
  
  function isUndefined(O) {
    return objectCall(O) === '[object Undefined]';
  }
  
  function isNull(O) {
    return objectCall(O) === '[object Null]';
  }
  
  function isString(O) {
    return objectCall(O) === '[object String]';
  }
  
  function isBoolean(O) {
    return objectCall(O) === '[object Boolean]';
  }
  
  function isSymbol(O) {
    return objectCall(O) === '[object Symbol]';
  }
  
  function isArray(O) {
    return objectCall(O) === '[object Array]';
  }
  
  function isFunction(O) {
    return objectCall(O) === '[object Function]';
  }
  
  function isRegExp(O) {
    return objectCall(O) === '[object RegExp]';
  }
  
  function isDate(O) {
    return objectCall(O) === '[object Date]';
  }
  
  function ToObject(argument){
    return Object(argument);
  }
  
  function ToLength(O){
    return O.length >>> 0;
  }
  
  function IsCallable(argument){
    if (!typeof argument === Object) return false;
    if (argument.call) return true;
    return false;
  }
  
  function ArraySpeciesCreate(originalArray, length){
    if (isArray(originalArray)) {
      var len = length || 0;
      return new Array(len);
    }
    return undefined;
  }
  
  function HasProperty(O, P){
    return O.hasOwnProperty(P);
  }
  
  function TypeError(F) {
    throw new TypeError(F + ' is Incorrect type')
  }
  
  /*
    抽象操作ToString将数字转换为字符串格式
    http://ecma-international.org/ecma-262/7.0/#sec-tostring-applied-to-the-number-type
  */
  function ToString(argument){
    if (isUndefined(argument)) return undefined;
    if (isNull(argument)) return null;
    if (isBoolean(argument)) {
      if (argument === true) return true;
      if (argument === false) return false;
    }
    if (isNumber(argument)) {
      if (isNaN(argument)) return 'NaN';
      if (argument === '+0' || argument === '-0') return '0';
      if (argument < 0) return '-' + ToString(-argument);
      if (!isFinite(argument)) return 'Infinity'
      return argument.toString()
    };
    if (isString(argument)) return argument;
    if (isSymbol(argument)) throw new TypeError(argument);
    if (typeof argument === 'object') {
      var primValue = JSON.stringify(argument);
      return ToString(primValue);
    }
  }
  
  /*
    抽象操作SameValueZero(x, y)，返回true或false
    http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero
  */
  function SameValueZero(x, y) {
    if (objectCall(x) != objectCall(y)) return false;
    if (isNumber(x)) {
      if (isNaN(x) && isNaN(y)) return true;
      if (x === '+0' && y === '-0') return true;
      if (x === '-0' && y === '+0') return true;
      if (x === y) return true;
      return false;
    }
    return SameValueNonNumber(x, y);
  }
  
  /*
    抽象操作SameValueNonNumber(x, y)，其中x和y都不是数值，返回true或false
    http://ecma-international.org/ecma-262/7.0/#sec-samevaluenonnumber
  */
  function SameValueNonNumber(x, y){
    if (!isNumber(x) && objectCall(x) === objectCall(y)) {
      if(isUndefined(x)) return true;
      if(isNull(x)) return true;
      if(isString(x)) {
        if (x === y) return true;
      }
      if(isBoolean(x)) {
        if (x && y) return true;
        return false;
      }
      if(isSymbol(x)) {
        if (x === y) return true;
        return false;
      }
      return x === y ? true : false;
    }
  }
  
  /*
    抽象操作IsPropertyKey确定参数(必须是ECMAScript语言值)是否可以用作属性键
    http://ecma-international.org/ecma-262/7.0/#sec-ispropertykey
  */
  function IsPropertyKey(argument){
    if (isString(argument)) return true;
    if (isSymbol(argument)) return true;
    return false;
  }
  
  /*
    抽象操作CreateDataProperty用于创建对象的一个新的自有属性
    http://ecma-international.org/ecma-262/7.0/#sec-createDataProperty
  */
  function CreateDataProperty(O, P, V){
    if (typeof O === 'object' && IsPropertyKey(P)) {
      var newDesc = {
        value: V,
        writable: true,
        enumerable: true,
        configurable: true
      };
      return Object.defineProperty(O, P, newDesc);
    }
  }
  
  /*
    抽象操作CreateDataPropertyOrThrow用于创建对象的新的自有属性
    如果无法执行所请求的属性更新，则会抛出TypeError异常。
    该操作通过参数O、P和V来调用，其中O是对象，P是属性键，V是属性的值
    http://ecma-international.org/ecma-262/7.0/#sec-createdatapropertyorthrow
  */
  function CreateDataPropertyOrThrow(O, P, V){
    if (typeof O === 'object' && IsPropertyKey(P)) {
      var success = CreateDataProperty(O, P, V);
      if (!success) TypeError(success)
      return success;
    }
  }
  
  /*
    抽象操作Call(F, V[, argumentsList])调用用于调用函数对象的[[Call]]内部方法
    http://ecma-international.org/ecma-262/7.0/#sec-call
  */
  function Call(F, V){
    if (!arguments.length) TypeError('参数')
    if (!isFunction(F)) TypeError(F);
    return F.call(V, arguments[2], arguments[3], arguments[4], arguments[5]);
  }
  
  /*
    抽象操作Get用于检索对象的特定属性的值
    http://ecma-international.org/ecma-262/7.0/#sec-get-o-p
  */
  function Get(O, P){
    if (typeof O === Object) TypeError(O);
    if (!HasProperty(O, P)) TypeError(P);
    return O[P];
  }
  
  /*
    抽象操作ToInteger将参数转换为整数值
    http://ecma-international.org/ecma-262/7.0/#sec-tointeger
  */
  function ToInteger(argument){
    var number = ToNumber(argument);
    if (isNaN(number)) return 0;
    if (number === '+0' || number === '-0' || number === '+∞' || number === '-∞') return number;
    return Math.floor(number);
  }
  
  /*
    抽象操作ToNumber将参数转换为Number类型的值
    http://ecma-international.org/ecma-262/7.0/#sec-tonumber
  */
  function ToNumber(argument){
    if(isUndefined(argument)) return NaN;
    if(isNull(argument)) return 0;
    if(isBoolean(argument)) {
      if (argument === true) return 0;
      if (argument === false) return '-0';
    };
    if(isNumber(argument)) return argument;
    if(isString(argument)) return Number(argument);
    if(isSymbol(argument)) TypeError(argument);
    if (typeof argument === 'object') {
      var primValue = JSON.stringify(argument);
      return ToNumber(primValue);
    }
  }
  
  /*
    抽象操作Set用于设置对象的特定属性的值
    http://ecma-international.org/ecma-262/7.0/#sec-set-o-p-v-throw
  */
  function Set(O, P, V, Throw){
    var props = {
      value: V,
      writable: true,
      enumerable: true,
      configurable: true
    };
    var success = Object.defineProperties(O, {
      [P]: props
    });
    if (!success && Throw === true) TypeError(Throw);
    return success;
  }
  
  /*
    抽象操作DeletePropertyOrThrow用于删除对象的特定自有属性
    http://ecma-international.org/ecma-262/7.0/#sec-deletepropertyorthrow
  */
  function DeletePropertyOrThrow(O, P){
    var success = delete O.P;
    if (!success) TypeError('DeletePropertyOrThrow');
    return success;
  }
  
  /*
    P.filter(array, callbackfn[, thisArg])
    P.filter 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素
    thisArg 执行回调时用作this的对象
    P.filter 方法不会改变原数组
    http://ecma-international.org/ecma-262/7.0/#sec-array.prototype.filter
  */
  P.filter = function(array, callbackfn, thisArg) {
    var O = ToObject(array),
      len = ToLength(O);
    if (!IsCallable(callbackfn)) TypeError(callbackfn);
    var T = thisArg ? thisArg : undefined,
      A = ArraySpeciesCreate(O, 0),
      k = 0,
      to = 0;
    while (k < len) {
      var Pk = ToString(k),
        kPresent = HasProperty(O, Pk);
      if (kPresent) {
        var kValue = Get(O, Pk),
        selected = Call(callbackfn, T, kValue, k, O);
        if (selected) {
          CreateDataPropertyOrThrow(A, ToString(to), kValue)
          to++;
        }
        k++;
      }
    }
    return A;
  }
  
  /*
    P.find(array, predicate[, thisArg])
    P.find 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined
    thisArg 执行回调时用作this的对象
    P.find 方法不会改变原数组
    http://ecma-international.org/ecma-262/7.0/#sec-array.prototype.find
  */
  P.find = function(array, predicate, thisArg) {
    var O = ToObject(array),
      len = ToLength(O);
    if (!IsCallable(predicate)) TypeError(predicate);
    var T = thisArg ? thisArg : undefined,
      k = 0;
    while(k < len) {
      var Pk = ToString(k),
        kValue = Get(O, Pk),
        testResult = Call(predicate, T, kValue, k, O);
      if (testResult) {
        return kValue;
      }
      k++
    }
    return undefined;
  }
  
  /*
    P.findIndex(array, predicate[, thisArg])
    P.findIndex 方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1
    thisArg 执行回调时用作this的对象
    P.findIndex 方法不会改变原数组
    http://ecma-international.org/ecma-262/7.0/#sec-array.prototype.findindex
  */
  P.findIndex = function(array, predicate, thisArg) {
    var O = ToObject(array),
      len = ToLength(O);
    if (!IsCallable(predicate)) TypeError(predicate);
    var T = thisArg ? thisArg : undefined,
      k = 0;
    while(k < len) {
      var Pk = ToString(k),
        kValue = Get(O, Pk),
        testResult = Call(predicate, T, kValue, k, O);
      if (testResult) {
        return k;
      }
      k++
    }
    return -1;
  }
  
  /*
    P.forEach(array, callbackfn[, thisArg])
    P.forEach 方法对数组的每个元素执行一次给定的函数
    thisArg 执行回调时用作this的对象
    P.forEach 方法不会直接改变原数组，但是可能会被callbackfn函数改变
    http://ecma-international.org/ecma-262/7.0/#sec-array.prototype.foreach
  */
  P.forEach = function(array, callbackfn, thisArg) {
    var O = ToObject(array),
      len = ToLength(O);
    if (!IsCallable(callbackfn)) TypeError(callbackfn);
    var T = thisArg ? thisArg : undefined,
      k = 0;
    while(k < len) {
      var Pk = ToString(k),
        kPresent = HasProperty(O, Pk);
      if (kPresent) {
        var kValue = Get(O, Pk);
        Call(callbackfn, T, kValue, k, O);
      }
      k++;
    }
    return undefined;
  }
  
  /*
    P.includes(array, searchElement[, fromIndex])
    P.includes 方法用来判断一个数组是否包含一个指定的值，如果包含则返回 true，否则返回false
    fromIndex 从fromIndex索引处开始查找valueToFind。如果为负值，则按升序从array.length + fromIndex的索引开始搜，默认为0
    P.includes 方法不会改变原数组
    http://ecma-international.org/ecma-262/7.0/#sec-array.prototype.includes
  */
  P.includes = function(array, searchElement, fromIndex) {
    var O = ToObject(array),
      len = ToLength(O);
    if (len === 0) return false;
    var n = fromIndex ? Number(fromIndex) : 0;
    if (n >= 0) {
      var k = n;
    } else {
      var k = len + n;
      if (k < 0) k = 0;
    }
    while(k < len) {
      var elementK = Get(O, k);
      if (SameValueZero(searchElement, elementK)) return true;
      k++;
    }
    return false;
  }
  
  /*
    P.map(array, callbackfn[, thisArg])
    P.map 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值
    thisArg 执行回调时用作this的对象
    P.map 方法不会改变原数组
    http://ecma-international.org/ecma-262/7.0/#sec-array.prototype.map
  */
  P.map = function(array, callbackfn, thisArg) {
    var O = ToObject(array),
      len = ToLength(O);
    if (!IsCallable(callbackfn)) TypeError(callbackfn);
    var T = thisArg ? thisArg : undefined,
      A = ArraySpeciesCreate(O, len),
      k = 0;
    while(k < len) {
      var Pk = ToString(k),
        kPresent = HasProperty(O, Pk);
      if (kPresent){
        var kValue = Get(O, Pk),
          mappedValue = Call(callbackfn, T, kValue, k, O);
        CreateDataPropertyOrThrow(A, Pk, mappedValue)
      }
      k++;
    }
    return A;
  }
  
  /*
    P.reduce(array, callbackfn[, initialValue])
    P.reduce 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值
    initialValue 作为第一次调用callback函数时的第一个参数的值。如果没有提供初始值，则将使用数组中的第一个元素。在没有初始值的空数组上调用reduce将报错
    P.reduce 方法不会改变原数组
    http://ecma-international.org/ecma-262/7.0/#sec-array.prototype.reduce
  */
  P.reduce = function(array, callbackfn, initialValue) {
    var O = ToObject(array),
      len = ToLength(O);
    if (!IsCallable(callbackfn)) TypeError(callbackfn);
    if (len === 0 && !initialValue) TypeError(initialValue);
    var k = 0;
    if (initialValue) {
      var accumulator = initialValue;
    } else {
      var kPresent = false;
      while(kPresent === false && k < len) {
        var Pk = ToString(k),
          kPresent = HasProperty(O, Pk);
        if (kPresent) {
          var accumulator = Get(O, Pk);
        }
        k++;
      }
    }
    while(k < len) {
      var Pk = ToString(k),
        kPresent = HasProperty(O, Pk);
      if (kPresent){
        var kValue = Get(O, Pk),
          accumulator = Call(callbackfn, undefined, accumulator, kValue, k, O);
      }
      k++;
    }
    return accumulator;
  }
  
  /*
    P.reduceRight(array, callbackfn[, initialValue])
    P.reduceRight 方法接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值
    initialValue 作为第一次调用callback函数时的第一个参数的值。如果没有提供初始值，则将使用数组中的第一个元素。在没有初始值的空数组上调用reduceRight将报错
    P.reduceRight 方法不会改变原数组
    http://ecma-international.org/ecma-262/7.0/#sec-array.prototype.reduceRight
  */
  P.reduceRight = function(array, callbackfn, initialValue) {
    var O = ToObject(array),
      len = ToLength(O);
    if (!IsCallable(callbackfn)) TypeError(callbackfn);
    if (len === 0 && !initialValue) TypeError(initialValue);
    var k = len - 1;
    if (initialValue) {
      var accumulator = initialValue;
    } else {
      var kPresent = false;
      while(kPresent === false && k >= 0) {
        var Pk = ToString(k),
          kPresent = HasProperty(O, Pk);
        if (kPresent) {
          var accumulator = Get(O, Pk);
        }
        k--;
      }
    }
    while(k >= 0) {
      var Pk = ToString(k),
        kPresent = HasProperty(O, Pk);
      if (kPresent){
        var kValue = Get(O, Pk),
          accumulator = Call(callbackfn, undefined, accumulator, kValue, k, O);
      }
      k--;
    }
    return accumulator;
  }
  
  /*
    P.some(array, callbackfn[, thisArg])
    P.some 方法测试数组中是不是至少有1个元素通过了被提供的函数测试，返回Boolean值
    thisArg 执行callbackfn时使用的this值
    P.some 方法不会改变原数组
    http://ecma-international.org/ecma-262/7.0/#sec-array.prototype.some
  */
  P.some = function(array, callbackfn, thisArg) {
    var O = ToObject(array),
      len = ToLength(O);
    if (!IsCallable(callbackfn)) TypeError(callbackfn);
    var T = thisArg ? thisArg : undefined,
      k = 0;
    while(k < len) {
      var Pk = ToString(k),
        kPresent = HasProperty(O, Pk);
      if (kPresent){
        var kValue = Get(O, Pk),
          testResult = Call(callbackfn, T, kValue, k, O);
        if (testResult) return true;
      }
      k++;
    }
    return false;
  }
  
  /*
    P.every(array, callbackfn[, thisArg])
    P.every 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试，返回Boolean值
    thisArg 执行callbackfn时使用的this值
    P.every 方法不会改变原数组
    http://ecma-international.org/ecma-262/7.0/#sec-array.prototype.every
  */
  P.every = function(array, callbackfn, thisArg) {
    var O = ToObject(array),
      len = ToLength(O);
    if (!IsCallable(callbackfn)) TypeError(callbackfn);
    var T = thisArg ? thisArg : undefined,
      k = 0;
    while(k < len) {
      var Pk = ToString(k),
        kPresent = HasProperty(O, Pk);
      if (kPresent){
        var kValue = Get(O, Pk),
          testResult = Call(callbackfn, T, kValue, k, O);
        if (testResult === false) return false;
      }
      k++;
    }
    return true;
  }
  
  /*
    P.copyWithin(target, start[, end])
    P.copyWithin 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它
    start 起始位置 如果是负数，start将从末尾开始计算end结束位置 如果是负数，end将从末尾开始计算
    P.copyWithin 方法不会改变原数组
    http://ecma-international.org/ecma-262/7.0/#sec-array.prototype.copywithin
  */
  P.copyWithin = function(array, target, start, end) {
    var O = ToObject(array),
      len = ToLength(O),
      relativeTarget = ToInteger(target),
      to = relativeTarget < 0 ? Math.max(len + relativeTarget, 0) : Math.min(relativeTarget, len),
      relativeStart = ToInteger(start),
      from = relativeStart < 0 ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len),
      relativeEnd = end === undefined ? len : ToInteger(end),
      final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len),
      count = Math.min(final - from, len - to);
    if (from < to && to < from + count) {
        var direction = -1,
        from = from + count - 1,
        to = to + count - 1;
    } else {
      var direction = 1;
    }
    while(count > 0) {
      var fromKey = ToString(from),
        toKey = ToString(to),
        fromPresent = HasProperty(O, fromKey);
      if (fromPresent) {
        var fromVal = Get(O, fromKey);
        Set(O, toKey, fromVal, true);
      } else {
        DeletePropertyOrThrow(O, toKey);
      }
      var from = from + direction,
        to = to + direction,
        count = count - 1;
    }
    return O;
  }
	
  return P;
})