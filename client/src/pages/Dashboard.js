import React, {useEffect, useState} from 'react';
import TinderCard from "react-tinder-card";
import ChatContainer from "../components/ChatContainer";
import axios from "axios";
import {useCookies} from "react-cookie";

const Dashboard = () => {

    const [user, setUser] = useState(null)
    const [genderedUsers, setGenderedUsers] = useState(null)
    const [lastDirection, setLastDirection] = useState()
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const userId = cookies.UserId

    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user', {
                params: {userId}
            })
            setUser(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const getGenderedUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/gendered-users', {
                params: { gender: user?.gender_interest}
            })
            setGenderedUsers(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getUser()
        getGenderedUsers()
    }, [user, genderedUsers])




    /*const characters = [
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
    ]*/



    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put('http://localhost:8000/addmatch', {
                userId,
                matchedUserId
            })
            getUser()
        } catch (err) {
            console.log(err)
        }
    }

    console.log(user)

    const swiped = (direction, swipedUserId) => {
        if (direction === 'right'){
            updateMatches(swipedUserId)
        }
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }


    const matchedUserIds = user?.matches.map(({ user_id }) => user_id).concat(userId)

    const filteredGenderedUsers = genderedUsers?.filter(
        genderedUser => !matchedUserIds.includes(genderedUser.user_id)
    )

    return (
        <>
            {user &&
            <div className="dashboard">
                <ChatContainer user={user}/>
                <div className="swipe-container">
                    <div className="card-container">
                        {filteredGenderedUsers?.map((genderedUser) =>
                            <TinderCard
                                className='swipe'
                                key={genderedUser.first_name}
                                onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                                onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}>
                                <div style={{backgroundImage: 'url(' + genderedUser.url + ')'}}
                                     className='card'
                                >
                                    <h3>{genderedUser.first_name}</h3>
                                </div>
                            </TinderCard>
                        )}
                        <div className="swipe-info">
                            {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default Dashboard;