import React from 'react';
import './NameCard.css'

const NameCard = ({id, image, Name, bio, Games}) =>{
    const gameList = Games.map((game) => 
        <li key={game} id="gameTag">
            <i>{game}</i>
        </li>
    );
    return(
        <div className="nameCard">
            <div className="nameCardLeft">
                <img id="nameCardImg" alt='' src={image} style={{width:"180px", height:"180px", borderRadius:"60px"}}/>
                <p id="nameCardName"><b>Name:</b> {Name}</p>
                <p id="nameCardID"><b>ID:</b> {id}</p>
            </div>
            <div className="nameCardRight">
                <p id="nameCardBio"><b>About:</b> {bio}</p>
                <b>Favorite Games: </b>
                <ul id="gameList">
                    {gameList}
                </ul>
            </div>
        </div>
    )
}

export default NameCard;