import React from 'react';
import Card from "../Card";
// import Card from "../Card";

function Favorites({items, onAddToFavorite, isAuthorized}) {
    
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1> Мои закладки</h1>

            </div>          
            <div className="d-flex flex-wrap">
                {items.map((item, index) => (
                    <Card
                        key={index}
                        onFavorite={onAddToFavorite}
                        {...item}
                        isAuthorized={isAuthorized}
                        // onPlus={(obj) => onAddToCart(obj)}
                    />
                ))}
            </div>         
        </div>
    )
}

export default Favorites;