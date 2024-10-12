window.addEventListener('error', function(event) {
    console.log('Error message: ' + event.message)
    console.log('Error message from: ' + event.filename)

    if(event.filename && event.filename.includes('CSN name')) {
        console.log('Capture error message; retry function')
        // retry function
    }

    // protected error message display on console platform
    event.preventDefault()
})