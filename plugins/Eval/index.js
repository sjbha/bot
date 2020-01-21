/**
 *  Use this as the base template for a new command
 * 
 */

import deepmerge from 'deepmerge'
import chalk from 'chalk'

const baseConfig = {}

export default function(bastion, opt={}) {
    const config = deepmerge(baseConfig, opt)
    const cmd = bastion.command("eval")
    const help = `${cmd} (description)`

    return [

        {
            // Command to start it
            command: "eval", 
            // Optional help string for `!command help`
            help,
            // Show help string with empty `!command` (in case parameters are required)
            helpOnEmpty: false,
            // Restrict command to a channel, will show error if not defined in config
            // restrict: [ bastion.channels.admin ], 
            restrict: [ ], 
            // Optional error message if command used outside of restricted
            restrictMessage: "",
            // Define how to parse options, otherwise it'll pass the whole string
            options: "",

            // Run validations before resolving the command
            validate(context, message) {
                // return a string to fail validation
            },

            // Core of the command
            resolve: async function(context, message) {
		this.send(context.channelID, "result: " + eval(message));
                // return string to show error
                // or use this.send(context.channelID, message)
            },

            // Create methods for the route to clean up your resolve
            // Can be referenced in resolve with this.doSomething()
            methods: {
                doSomething() {}
            }
        },

        {
            // Can define sub actions and use this.route("show") to make easy routing
            action: "demo:show"
        }

    ]
}
