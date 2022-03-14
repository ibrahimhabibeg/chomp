import React, { useState } from 'react';
import './LandingPage.css';

function LandinPage(){
    const [playBtnStyle, setPlayBtnStyle] = useState({});
    function play(){
        setPlayBtnStyle({});
    }
    return(
        <div id="landingPage">
            <h1 className='title'>Chomp!</h1>
            <button onClick={play} className='playBtn' style={playBtnStyle}>Play!</button>
        </div>
    );
};
export default LandinPage;