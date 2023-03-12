import React from 'react';
import styles from './Card.module.css';

function Card({id, title, imageUrl, price, onFavorite, onPlus, isAddedToCart, isAddedToFavorite, isAuthorized}) {
    const [isAdded, setIsAdded] = React.useState(isAddedToCart);
    const [isFavorite, setIsFavorite] = React.useState(isAddedToFavorite);

    const onClickPlus = () => {
        onPlus({id, title, imageUrl, price})
        // setIsAdded(!isAdded);
    };

    React.useEffect(() => {
        setIsAdded(isAddedToCart);
    }, [isAddedToCart]);

    React.useEffect(() => {
        setIsFavorite(isAddedToFavorite);
    }, [isAddedToFavorite]);

    const onClickFavorite = () => {
        onFavorite({id, title, imageUrl, price, isAddedToFavorite: !isFavorite});
    };

    return (
        <div className={styles.Card}>
            {isAuthorized && (
                <div className={styles.favorite} onClick={onClickFavorite}>
                   <img src={isFavorite ? 'img/liked.svg' : 'img/unliked.svg'} alt="Unliked" />
               </div>      
            )}
            <img width={133} height={112} src={imageUrl} alt="Polo"/>
            <p> {title}</p>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price}</b>
                </div>
                {onPlus && isAuthorized && (
                    <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Plus"/>
                )}
            </div>
        </div>
    )
}
export default Card

