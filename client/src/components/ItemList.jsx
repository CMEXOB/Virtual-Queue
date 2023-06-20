import React from 'react';
import Item from "./Item";

const ItemList = ({queue}) => {
    return (
        <div>
            {queue.map((item) =>
                <Item item={item}/>
            )}
        </div>
    );
};

export default ItemList;