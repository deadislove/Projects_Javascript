const retryFunction = async <T>(
    fn:() => Promise<T>,
    retries: number = 3,
    delay: number = 1000
) : Promise<T | undefined> => {
    for(let attempt = 1; attempt <= retries; attempt++) {
        try{
            const result = await fn()
            return result
        }
        catch(error) {
            if(attempt === retries) {
                throw new Error(`Failed after ${retries} retries: ${(error as Error).message}`)
            }

            console.log(`Retrying... Attempt ${attempt} failed. Waiting ${delay}ms before next attempt.`)
            await new Promise(res => setTimeout(res, delay))
        }
    }
}

export default retryFunction