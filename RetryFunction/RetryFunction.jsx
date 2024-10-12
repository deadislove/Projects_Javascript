import React, { useEffect, useState} from "react";

const fetchData = async () => {
    const response = await fetch('API URL')
    if(response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}

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

const MyComponent = () => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() =>{
        const getData = async () => {
            try {
                const result = await retryFunction(fetchData, 3, 2000)
                setData(result)
            } catch(error) {
                setError(error)
            }
        }

        getData()
    }, [])

    return(
        <div>
            {error && <p>Error: {error}</p>}
            {data ? <p>Data: {JSON.stringify(data)}</p> : <p>Loading...</p>}
        </div>
    )
}

export default MyComponent