var jsdom = require('jsdom')

module.exports = function(html, reqs, next) {
    var args = Array.prototype.slice.call(arguments)
    var default_html = '<html><head></head><body></body></html>'
    var default_reqs = []
    if (args.length == 0) {
        html = default_html
        reqs = default_reqs
    }
    else if (args.length == 1) {
        next = args[0]
        html = default_html
        reqs = default_reqs
    }
    else if (args.length == 2) {
        throw "ambiguous arguments to jsdom wrapper"
    }

    return function(cb) {
        var testcase = this
        jsdom.env(html, reqs, function(err, window) {
            if (err) { throw err }
            testcase.window = window
            next ? next.call(testcase, cb) : cb()
        })
    }
}
