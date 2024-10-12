window.onerror = function(message, source, lineno, colno, error) {
    console.log('Error message: ', message)
    console.log('Error message from which one file - file: ', source)

    if(source && source.includes('CDN url')) {
        console.log(`Capture error from CDN_URL; Start retry`)
        // retry function
    }

    return true
}