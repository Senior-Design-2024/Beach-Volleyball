import React, { useState, useEffect } from 'react';

export default function MatchStatsTable() { 
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
                <div>
                    Data: {JSON.stringify(data)}

                    <table>
                        <tr>
                            <td>Action</td>
                            <td>Player 1</td>
                            <td>Player 2</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}