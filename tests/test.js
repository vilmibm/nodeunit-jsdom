var mockrequire = require('mockrequire')

var mock_jsdom = function(env) {
    return mockrequire('../lib/nodeunit-jsdom', {
        jsdom: { env: env }
    })
}

exports.test_wrapper = {
    test_no_args: function(test) {
        var jsdom_wrap = mock_jsdom(function(html, reqs, cb) {
            test.equal(html, '<html><head></head><body></body></html>')
            test.equal(reqs.length, 0)
            cb(null, 'window')
        })
        var mock_testcase = {}
        jsdom_wrap(function(cb) {
            test.equal(mock_testcase.window, 'window')
            test.done()
        }).call(mock_testcase)
    },
    test_custom_html: function(test) {
        var html = 'custom html'
        var jsdom_wrap = mock_jsdom(function(html, reqs, cb) {
            test.equal(html, 'custom html')
            test.equal(reqs.length, 0)
            cb(null, 'window')
        })
        var mock_testcase = {}
        jsdom_wrap(html, [], function() {
            test.equal(mock_testcase.window, 'window')
            test.done()
        }).call(mock_testcase)
    },
    test_custom_reqs: function(test) {
        var html = 'custom html'
        var reqs = [1,2,3]
        var jsdom_wrap = mock_jsdom(function(html, reqs, cb) {
            test.equal(html, 'custom html')
            test.deepEqual(reqs, [1,2,3])
            cb(null, 'window')
        })
        var mock_testcase = {}
        jsdom_wrap(html, reqs, function() {
            test.equal(mock_testcase.window, 'window')
            test.done()
        }).call(mock_testcase)
    },
    test_jsdom_error: function(test) {
        var jsdom_wrap = mock_jsdom(function(_, _, cb) {
            cb('how about an error')
        })
        test.throws(function() {
            jsdom_wrap('', [], function() {})()
        })
        test.done()
    },
    test_bad_args: function(test) {
        var jsdom_wrap = mock_jsdom(function(_, _, cb) {
            throw 'should not get here'
        })
        test.throws(function() {
            jsdom_wrap('', [])()
        })
        test.done()
    },
    test_no_callback: function(test) {
        var jsdom_wrap = mock_jsdom(function(html, reqs, cb) {
            cb(null, 'window')
        })
        var called_cb = false
        jsdom_wrap()(function() {
            called_cb = true
        })
        test.ok(called_cb)
        test.done()
    }
}

var jsdom_wrap = require('../lib/nodeunit-jsdom')

exports.test_functionally = {
    setUp: jsdom_wrap(),
    test_window_set: function(test) {
        test.ok(this.window)
        test.done()
    }
}
