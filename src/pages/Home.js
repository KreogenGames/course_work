import React from 'react';
import Nav from "../components/Nav";

const Home = () => {

    const authToken = false;

    const handleClick = () => {
      console.log('clicked')
    }
    
    return (
        <>
        <Nav/>
        <div className="home">
            <h1>Completed CourseWork is closer then you think</h1>
            <button className="primary-button" onClick={handleClick}>
                {authToken ? 'Signout' : 'Create Account'}
            </button>
        </div>
        </>
    );
};

export default Home;