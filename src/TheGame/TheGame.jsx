import React, { useState } from 'react';
import './TheGame.css';
import Cookie from './Cookie';

function TheGame(){
    const [playBtnStyle, setPlayBtnStyle] = useState({});
    const [inputsDivStyle, setInputsDivStyle] = useState({});
    const [noRows, setNoRows] = useState(2);
    const [noCols, setNoCols] = useState(2);
    const [gameStarted, setGameStarted] = useState(false);
    const [cookiesStyle, setCookiesStyle] = useState([]);
    const [playerOneTurn, setPlayerOneTurn] = useState(true);
    const [gameEnded, setGameEnded] = useState(0);
    function play(){
        setPlayBtnStyle({transform:"scale(0)"});
        setInputsDivStyle({height:"auto", opacity:1});
    }
    function handleRowsNoChange(event){
        let newValue = event.target.value;
        if(newValue==='' || (newValue%1===0 && newValue>=2 && newValue<=7)){
            setNoRows(newValue);
        }
    }
    function handleColsNoChange(event){
        let newValue = event.target.value;
        if(newValue==='' || (newValue%1===0 && newValue>=2 && newValue<=7)){
            setNoCols(newValue);
        }
    }
    function startGame(){
        if (noRows>=2 && noRows<=7) {
            setInputsDivStyle({transform:"scale(0)"});
            setGameStarted(true);
            let newCookiesStyle = [];
            for (let row = 0; row < noRows; row++) {
                newCookiesStyle.push([]);
                for (let col = 0; col < noCols; col++) {
                    if (col === 0 && row === 0) {
                        newCookiesStyle[row].push({width:"calc(100%/"+noCols+")", filter:"hue-rotate(90deg)"});
                    }else{
                        newCookiesStyle[row].push({width:"calc(100%/"+noCols+")"});

                    }
                }
            }
            setCookiesStyle(newCookiesStyle);
        }
    }
    function handleCookieClick(row,col){
        let newCookiesStyle = cookiesStyle;
        for (let currentRow = row; currentRow < newCookiesStyle.length; currentRow++) {
            for (let currentCol = col; currentCol < newCookiesStyle[currentRow].length; currentCol++) {
                let newCookieStyle = newCookiesStyle[currentRow][currentCol];
                newCookieStyle={...newCookieStyle, opacity:0};
                newCookiesStyle[currentRow][currentCol] = newCookieStyle;
            }
        }
        setCookiesStyle(newCookiesStyle);
        if (row===0 && col===0) {
            endGame();
        }else{
            setPlayerOneTurn(!playerOneTurn);
        }
    }
    function endGame(){
        if(playerOneTurn){
            setGameEnded(2);
        }else{
            setGameEnded(1)
        }
        setGameStarted(false);
    }
    function replay() {
        setGameEnded(0);
        play();
    }
    return(
        <div id="landingPage">
            {gameEnded>0?
                gameEnded === 1?
                    <h1 className='title' style={{color:"rgba(200,0,0,1)"}}>!Player 1 Wins!</h1>
                    :<h1 className='title' style={{color:"rgba(0,0,200,1)"}}>!Player 2 Wins!</h1>
                :gameStarted? 
                    playerOneTurn?
                        <h1 className='title' style={{color:"rgba(200,0,0,1)"}}>Player 1 Turn</h1>
                        :  <h1 className='title' style={{color:"rgba(0,0,200,1)"}}>Player 2 Turn</h1>
                    : <h1 className='title'>Ch🍪mp!</h1>
            }
            
            {gameStarted && 
                <div className='theGame'>
                    {cookiesStyle.map((row,rowNo)=>{
                        return(
                            <div key={"row-"+rowNo} className='row'>
                                {
                                    row.map((cookie, colNo)=>{
                                        return(
                                            <Cookie key={"row-"+rowNo+"-col-"+colNo} row={rowNo} col={colNo} 
                                            style={cookie} handleClick={handleCookieClick}/>
                                        )
                                    })
                                }
                            </div>
                        )
                    })}
                </div>
            }
            <div className='inputsDiv' style={inputsDivStyle}>
                <label>Number of rows:</label>
                <p>Number must be an intger between 2 and 7</p>
                <input type="number" value={noRows} onChange={handleRowsNoChange}></input>
                <label>Number of columns:</label>
                <p>Number must be an intger between 2 and 7</p>
                <input type="number" value={noCols} onChange={handleColsNoChange}></input>
                <button onClick={startGame}>Start Chomp!</button>
            </div>
            {gameEnded>0 && <button className='playBtn' onClick={replay}>Replay</button>}
            <button onClick={play} className='playBtn' style={playBtnStyle}>Play!</button>
        </div>
    );
};
export default TheGame;