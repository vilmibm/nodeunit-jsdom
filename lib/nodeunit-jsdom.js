var jsdom = require('jsdom')

module.exports = function(html, reqs, next) {
    html || (html = '<html><head></head><body></body></html>')
    reqs || (reqs = [])
    setup || (setup = function() {})
    return function(cb) {
        var testcase = this
        jsdom.env(html, reqs, function(err, window) {
            if (err) { throw err }
            testcase.window = window
            next.call(testcase, cb)
        })
    }
}
