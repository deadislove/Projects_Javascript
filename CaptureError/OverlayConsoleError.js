(function() {
    const originalConsoleError = console.error
    console.error = function(...args) {
        originalConsoleError.apply(console, args)

        //custom logic
        if(args.some(arg => typeof arg === 'string' && arg.includes('keyword'))) {
            console.log('Capture keyword error messages: ', args)
            // retry function
        }
    }
})();