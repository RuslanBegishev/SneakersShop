import {Link} from 'react-router-dom'

function Header(props) {
    const isFavoritesEmpty = props.favoritesCount === 0; 
    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to="/">
            <div className="d-flex align-center">
                <img width={50} height={50} src="/img/logo.png" alt="logo"/>
                <div className="headerInfo">
                    <h3 className="text-uppercase">react sneakers</h3>
                    <p>Магазин лучших кроссовок</p>
                </div>
            </div>
            </Link>
            <div >
                <ul className="d-flex">
                    {props.isAuthorized && (
                        <li onClick={props.onClickCart} className="mr-30 cu-p">
                            <img width={18} height={18} src="/img/cart.svg" alt="cart"/>
                            <span className="headerNumbers">{props.cartSum} руб.</span>
                        </li>
                    )}
                    
                        <li className="mr-20 cu-p">
                            <Link to="/favorites">
                                <img
                                    width={18}
                                    height={18}
                                    src={isFavoritesEmpty ? "img/heart.svg" : "img/heart-red.svg"}
                                    alt="Закладки"
                                />
                                <span className="headerNumbers">{props.favoritesCount}</span>
                            </Link>
                        </li>
                    
                    <li>
                        <Link to="/login">
                        <img className="cu-p" width={18} height={18} src="/img/user.svg" alt="user"/>
                        </Link>
                    </li>
                    <li className="mr-20">
                        {props.currentUser}
                    </li>
                    {props.isAuthorized && (
                        <li>
                        <Link to="/login">
                        <img
                            className="cu-p"
                            width={18}
                            height={18}
                            src="/img/logout.png"
                            alt="user"
                            onClick={() => props.changeCurrentUser("")}
                        />
                        </Link>
                    </li>
                    )}
                </ul>
            </div>
        </header>
    )
}
export default Header