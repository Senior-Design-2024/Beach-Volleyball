import React, { useState, useEffect } from 'react';

export default function NewMatchForm({onSubmit}) { 
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/matchquery');
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    //html
    return(
        <div>
            {data ? (
                <p>Data: {JSON.stringify(data)}</p>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}