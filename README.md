# NOTE this is totally deprecated in favor of [nodeunit-b](https://github.com/nathanielksmith/nodeunit-b).


# nodeunit-jsdom

_being a simple wrapper for nodeunit setUp functions that allows for the testing and mocking of front-end code_

## usage

        var jsdom_wrapper = require('nodeunit-jsdom')

        exports.test_ui = {
            setUp: jsdom_wrapper(
                '<html><head></head><body><div id="cthulhu"></div></body></html>', [
                    '/path/to/jquery.js',
                    '/path/to/your/code.js'
                ],
                function(cb) {
                    // additional setUp code
                    cb()
                }
            ),
            test_ajax_call: function(test) {
                var post_called = false
                this.window.$.post = function() { post_called = true }
                this.window.do_stuff_with_side_effects()
                test.ok(post_called)
                test.done()
            },
            test_dom: function(test) {
                var divs = this.window.$('div')
                test.equal(divs.length, 1)
                test.equal(divs[0].id, 'cthulhu')
                test.done()
            }
        }

## tests

cd tests
nodeunit test.js

## author

nathaniel k smith <nathanielksmith@gmail.com>

## license

BSD
