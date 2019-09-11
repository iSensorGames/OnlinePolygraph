import React from 'react';

// Styles
import './container.css';

const Container = ({children}) => {
    return (
        <div className="Container">
            {children}
        </div>
    )
}

export default Container;