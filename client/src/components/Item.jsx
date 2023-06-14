import React from 'react';

const Item = (props) => {
    return (
        <div className="item">
            <div>
                <strong>{props.item.name}</strong>
            </div>
            <div>
                <strong>{props.item.number}</strong>
            </div>
        </div>
    );
};

export default Item;