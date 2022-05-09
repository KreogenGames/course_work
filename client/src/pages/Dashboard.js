import React, {useState} from 'react';
import TinderCard from "react-tinder-card";
import ChatContainer from "../components/ChatContainer";

const Dashboard = () => {

    const characters = [
        {
            name: 'Veselov Oleg',
            url: 'https://sun9-21.userapi.com/s/v1/ig2/n4qCdDab7kKoSYbPu1vcDNFMiNM6lJN1wL_ZzqYVaIqvwZuxcdDo5BNJwRowloY_5argD3cwH3PqEwg4SnBcWWWM.jpg?size=1080x1080&quality=96&type=album'
        },
        {
            name: 'Monakov Andrew',
            url: 'https://sun9-7.userapi.com/s/v1/if2/Bpz_0fVXx0o3BfTULXclxyg2E_KO4zNnO6XWB2yG_QJ_XR7wVSjopmq_dudNpZD3InIvuKRxe1qkCNYbwcbLofue.jpg?size=600x691&quality=95&type=album'
        },
        {
            name: 'Sibgatulov Maris',
            url: 'https://i.ytimg.com/vi/Cs5hJ25S5KQ/maxresdefault.jpg'
        },
        {
            name: 'Ertek Huseyn',
            url: 'https://sun9-35.userapi.com/s/v1/if2/VDhbze5xJoEvLoHso1PoJUayOzpDvNfl7-q3pdnaUeYB6ImqUNGgVN346Su7uFL2tyMfNsIFsxlNAM8XvXdmF_YS.jpg?size=607x1080&quality=96&type=album'
        }
    ]
    const [lastDirection, setLastDirection] = useState()

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    return (
        <div className="dashboard">
            <ChatContainer/>
            <div className="swipe-container">
                <div className="card-container">
                    {characters.map((character) =>
                        <TinderCard
                            className='swipe'
                            key={character.name}
                            onSwipe={(dir) => swiped(dir, character.name)}
                            onCardLeftScreen={() => outOfFrame(character.name)}>
                            <div style={{backgroundImage: 'url(' + character.url + ')'}}
                                 className='card'
                            >
                                <h3>{character.name}</h3>
                            </div>
                        </TinderCard>
                    )}
                    <div className="swipe-info">
                        {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;