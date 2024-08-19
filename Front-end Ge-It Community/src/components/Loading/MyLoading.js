import React, { useState, useEffect } from 'react';
import { Commet } from 'react-loading-indicators';

function MyLoading() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 700); // 1000 millisecondes (1 seconde)

        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.98)', // Fond semi-transparent
            zIndex: 9999,
            display: loading ? 'flex' : 'none',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {loading && <Commet color="#32cd32" size="medium" text="" textColor="" />}
        </div>
    );
}

export default MyLoading;
