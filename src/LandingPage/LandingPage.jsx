import React, { useState } from 'react';
import './LandingPage.css';

function LandinPage(){
    const [playBtnStyle, setPlayBtnStyle] = useState({});
    const [inputsDivStyle, setInputsDivStyle] = useState({});
    const [noRows, setNoRows] = useState(2);
    const [noCols, setNoCols] = useState(2);
    function play(){
        setPlayBtnStyle({transform:"scale(0)"});
        setInputsDivStyle({height:"auto", opacity:1});
    }
    function handleRowsNoChange(event){
        let newValue = event.target.value;
        if(newValue=='' || (newValue%1===0 && newValue>=2 && newValue<=5)){
            setNoRows(newValue);
        }
    }
    function handleColsNoChange(event){
        let newValue = event.target.value;
        if(newValue=='' || (newValue%1===0 && newValue>=2 && newValue<=5)){
            setNoCols(newValue);
        }
    }
    function startGame(){
        if (noRows>=2 && noRows<=5) {
            setInputsDivStyle({...inputsDivStyle, transform:"scale(0)"});
        }
    }
    return(
        <div id="landingPage">
            <h1 className='title'>Chomp!</h1>
            <div className='inputsDiv' style={inputsDivStyle}>
                <label>Number of rows:</label>
                <p>Number must be an intger between 2 and 5</p>
                <input type="number" value={noRows} onChange={handleRowsNoChange}></input>
                <label>Number of columns:</label>
                <p>Number must be an intger between 2 and 5</p>
                <input type="number" value={noCols} onChange={handleColsNoChange}></input>
                <button onClick={startGame}>Start Chomp!</button>
            </div>
            <button onClick={play} className='playBtn' style={playBtnStyle}>Play!</button>
        </div>
    );
};
export default LandinPage;