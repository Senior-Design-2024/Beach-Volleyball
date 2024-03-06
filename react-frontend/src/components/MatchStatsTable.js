import React, { useState, useEffect } from 'react';

export default function MatchStatsTable() { 
    const [data, setData] = useState({
        action: [],
        player_1_average: [],
        player_2_average: [],
    });

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
                    <table>
                        <tr>
                            <td style={{width: '100px'}}>Action</td>
                            <td style={{width: '100px'}}>Player 1 Avg</td>
                            <td style={{width: '100px'}}>Player 2 Avg</td>
                        </tr>
                        {data.action.map((item, index) => (
                            <tr>
                                <td>{data.action[index]}</td>
                                <td>{data.player_1_average[index]}</td>
                                <td>{data.player_2_average[index]}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}