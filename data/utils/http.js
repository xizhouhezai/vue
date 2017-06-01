/**
 * http请求类
 * 版权所以(c)上海畅考信息科技有限公司
 */
'use strict';

var axios = require('axios'),
	crypto = require('crypto');

var httpInstance = axios.create({
	baseURL: 'http://api.laixue.com/v2',
	headers: {
		"Content-Type": 'application/json; charset=utf-8',
	},
});

var appKey = 'fepq0SCp_07Yy9Dg',
	appSecrect = 'IfJz5R0AGfrXgiF2TlMDFmmfqQQlRgJI';

/**
 * 发送http请求
 * @param  {Object} req 请求对象
 * @param  {Object} res 回复对象
 */
exports.call = function(req, res) {
	res.append('Access-Control-Allow-Origin', '*');
	res.append('Access-Control-Allow-Methods', 'GET');

	switch(getMethod(req)) {
		case 'GET':
			this.get(req.originalUrl, function(response) {
				res.send(response.data);
			});
			break;
		default:
			break;
	}
}

/**
 * 发送get请求
 * @param  {String}   url      请求地址
 * @param  {Function} callback 回调函数
 */
exports.get = function(url, callback) {
	var params = {};

	url = url.substr(1);

	if (url.indexOf('?') > -1) {
		var urlSplits = url.split('?');
		url = urlSplits[0];
		var queryString = urlSplits[1];
		var queryParams = queryString.split('&');

		for(var i in queryParams) {
			var pair = queryParams[i].split('=');
			params[pair[0]] = pair[1];
		}
	}

	params.appkey = appKey;
	params.nonce = Math.random().toString(36).substr(2);
	params.timestamp = Math.round(new Date().getTime()/1000);
	params.signature = generateSignature(params);

	var queryStr = '';
	for (let i in params) {
		queryStr = queryStr + '&' + i + '=' + params[i];
	}
	queryStr = queryStr.substr(1);

	httpInstance.get(url + '?' + queryStr)
		.then(callback)
		.catch(function(response) {
			console.log(response);
		});
}

/**
 * 获取请求类型
 * @param  {Object} req 请求对象
 * @return {String}     请求类型字符串
 */
function getMethod(req) {
	if (req.get('HTTP_X_HTTP_METHOD_OVERRIDE')) {
		return req.get('HTTP_X_HTTP_METHOD_OVERRIDE').toUpperCase();
	}

	if (req.get('REQUEST_METHOD')) {
		return req.get('REQUEST_METHOD').toUpperCase();	
	}

	return 'GET';
}

/**
 * 生成签名
 * @param  {Object} params 参数对象
 * @return {String}        签名字符串
 */
function generateSignature(params) {
	var copyParams = Object.create(params);
	copyParams.appsecret = appSecrect;

	var keys = [];
	var sorter = function (a, b) {
		var aFloat = parseFloat(a)
		var bFloat = parseFloat(b)
		var aNumeric = aFloat + '' === a
		var bNumeric = bFloat + '' === b
		if (aNumeric && bNumeric) {
			return aFloat > bFloat ? 1 : aFloat < bFloat ? -1 : 0
		} else if (aNumeric && !bNumeric) {
			return 1
		} else if (!aNumeric && bNumeric) {
			return -1
		}
		return a > b ? 1 : a < b ? -1 : 0
	}

	for (let i in copyParams) {
		keys.push(i);
	}

	keys.sort(sorter);
	var queryStr = '';
	for (let i in keys) {
		queryStr = queryStr + '&' + keys[i] + '=' + copyParams[ keys[i] ];
	}
	queryStr = queryStr.substr(1);
	
	var hash = crypto.createHash('sha1');
	hash.update(queryStr);

	return hash.digest('hex');
}