import React from 'react';

function Square({chooseSquare, value}) {
    return (
        <div className="square" onClick={chooseSquare}>
            {value}
        </div>
    );
}

export default Square;