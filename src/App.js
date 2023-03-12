import './App.css';
import React from 'react';
import axios from 'axios';
import Home from './components/Pages/Home'
import Header from './components/Header'
import Drawer from "./components/Drawer";
import {Route, Routes} from 'react-router-dom'
import Favorites from "./components/Pages/Favotites";
import Login from './components/Login';

function App () {
    const [items, setItems] = React.useState([])
    const [cartItems, setCartItems] = React.useState([])
    const [favorites, setFavorites] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('')
    const [cartOpened, setCartOpened] = React.useState(false);
    const [cartSum, setCartSum] = React.useState(0);
    const [favoritesCount, setFavoritesCount] = React.useState(0);
    const [currentUser, setCurrentUser] = React.useState('');
    const [isAuthorized, setIsAuthorized] = React.useState(currentUser !== '');

    React.useEffect(() => {
       setIsAuthorized(currentUser !== '');
    }, [currentUser]);

    React.useEffect(() => {
        axios.get('https://60d62397943aa60017768e77.mockapi.io/items').then((res) => {
            console.log('res', res);
            const dataNew = res.data.map((item) => {
                return {
                    ...item,
                    isAddedToCart: false,
                    isAddedToFavorite: false
                }
            })
            setItems(dataNew);
        });
        // axios.get('https://60d62397943aa60017768e77.mockapi.io/cart').then((res) => {
        //     setCartItems(res.data);
        // });
        // axios.get('https://60d62397943aa60017768e77.mockapi.io/favorites').then((res) => {
        //     setFavorites(res.data);
        // });
    }, []);

    const onAddToCart = (obj) => {
        try {
            const isItemAdded = cartItems.find((cartItem) => Number(cartItem.id) === Number(obj.id));
            if (isItemAdded) {
                onRemoveItem(obj);
            } else {
                axios.post('https://60d62397943aa60017768e77.mockapi.io/cart', obj);
                setCartItems((prev) => [...prev, obj]);
                setCartSum(cartSum + obj.price);
                const updatedItems = items.map((item) => {
                    if (Number(item.id) === Number(obj.id)) {
                        return {
                            ...item,
                            isAddedToCart: true
                        }
                    }
                    return item;
                })
                setItems(updatedItems);
            }
        } catch (err) {
            console.log('Ошибка добавления в корзину', err);
        }
    }
    const onRemoveItem = (obj) => {
        try {
            axios.delete(`https://60d62397943aa60017768e77.mockapi.io/cart/${obj.id}`);
            setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(obj.id) ));
            setCartSum(cartSum - obj.price);
            const updatedItems = items.map((item) => {
                if (Number(item.id) === Number(obj.id)) {
                    return {
                        ...item,
                        isAddedToCart: false
                    }
                }
                return item;
            })
            setItems(updatedItems);
        } catch (err) {
            console.log('Ошибка при удалении товара из корзины', err)
        }
    }

    const onAddToFavorite = (obj) => {
        try {
            if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
                axios.delete(`https://60d62397943aa60017768e77.mockapi.io/favorites/${obj.id}`);
                const updatedItems = items.map((item) => {
                    if (Number(item.id) === Number(obj.id)) {
                        return {
                            ...item,
                            isAddedToFavorite: false
                        }
                    }
                    return item;
                })
                setItems(updatedItems);
                setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
                setFavoritesCount(favoritesCount - 1);
            }
            else {
                axios.post('https://60d62397943aa60017768e77.mockapi.io/favorites', obj);
                const updatedItems = items.map((item) => {
                    if (Number(item.id) === Number(obj.id)) {
                        return {
                            ...item,
                            isAddedToFavorite: true
                        }
                    }
                    return item;
                })
                setItems(updatedItems);
                setFavorites((prev) => [...prev, obj]);
                setFavoritesCount(favoritesCount + 1);
            }
        } catch (err) {
            console.log('Ошибка добавления в избранное', err);
        }
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <div className='wrapper clear'>
            {cartOpened && (
                <Drawer
                    items={cartItems}
                    onClose={() => setCartOpened(false)}
                    onRemove={onRemoveItem}
                    cartSum={cartSum}
                />
            )}
            <Header
                onClickCart={() => setCartOpened(true)}
                cartSum={cartSum}
                favoritesCount={favoritesCount}
                currentUser={currentUser}
                changeCurrentUser={setCurrentUser}
                isAuthorized={isAuthorized}
            />
            <Routes>
                <Route path="" exact element={
                    <Home
                        items={items}
                        cartItems={cartItems}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToFavorite={onAddToFavorite}
                        onAddToCart={onAddToCart}
                        isAuthorized={isAuthorized}
                    />
                }/>
                <Route path="/favorites" exact element={
                    <Favorites items={favorites}
                    onAddToFavorite={onAddToFavorite}
                    isAuthorized={isAuthorized}/>
                }/>
                <Route path="/login" exact element={
                    <Login onCurrentUserChange={setCurrentUser} />
                }/>
                

            </Routes>

        </div>
    )
}


export default App