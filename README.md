# nodeunit-jsdom

_being a simple wrapper for nodeunit unit tests that allows for the testing and mocking of front-end code_

## usage

        var jsdom_wrapper = require('nodeunit-jsdom')

        exports.test_ui = {
            setUp: jsdom_wrapper(
                '<html><head></head><body><div id="cthulhu"></div></body></html>',
                ['/path/to/jquery.js']
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

nodeunit tests/test.js

## author

nathaniel k smith <nathanielksmith@gmail.com>

## license

BSD
