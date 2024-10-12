const retryFunction = async (fn, retries = 3, delay = 1000) => {
    for(let attempt = 1; attempt <=retries; attempt++) {
        try {
            const result = await fn();
            return result;
        }
        catch(error) {
            if(attempt === retries) {
                throw new Error(`Failed after ${retries} retries: ${error.message}`);
            }

            console.log(`Retrying... Attempt ${attempt} failed. Waiting ${delay}ms before next attempt.`);
            await new Promise(res => setTimeout(res, delay)); 
        }
    }
}