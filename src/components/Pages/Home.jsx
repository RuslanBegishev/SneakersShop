import React from 'react';
import Card from "../Card";

function Home({
                  items,
                  searchValue,
                  setSearchValue,
                  onChangeSearchInput,
                  onAddToFavorite,
                  onAddToCart,
                  isAuthorized
              }) {
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1> {searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все товары'}</h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="Search"/>
                    <input onChange={onChangeSearchInput} placeholder="Поиск..." />
                </div>
            </div>

            <div className="d-flex flex-wrap">
                {items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())).map((item, index) => (
                    <Card
                        key={index}
                        onFavorite={(obj) => onAddToFavorite(obj)}
                        onPlus={(obj) => onAddToCart(obj)}
                        {...item}
                        isAuthorized={isAuthorized}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home;
