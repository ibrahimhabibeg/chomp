import React, { useState } from 'react';
import './TheGame.css';
import Cookie from './Cookie';

function TheGame(){

    const minNoCols = 3;
    const minNoRows = 3;
    const maxNoCols = 5;
    const maxNoRows = 7;
    const maxCookieWidthPx = 150;
    const rowPaddingPx = 15;
    const [noRows, setNoRows] = useState(minNoRows);
    const [noCols, setNoCols] = useState(minNoCols);
    const [titleBtnStyle, setTitleBtnStyle] = useState({});
    const [titleBtnText, setTitleBtnText] = useState("Ch🍪mp!");
    const [gameDivStyle, setGameDivStyle] = useState({transform:"scale(0)", margin:0, padding:0, height:0});
    const [playBtnStyle, setPlayBtnStyle] = useState({});
    const [playBtnText, setPlayBtnText] = useState("Play!");
    const [inputsDivStyle, setInputsDivStyle] = useState({transform:"scale(0)", margin:0, padding:0, height:0});
    const [cookiesStyle, setCookiesStyle] = useState([]);
    const [playerOneTurn, setPlayerOneTurn] = useState(true);
    const [gameEnded, setGameEnded] = useState(0);
    const player1Color = "rgba(200,0,0,1)";
    const player2Color = "rgba(0,0,200,1)";
    

    function handlePlayBtnClick() {
        //if game ended play if not replay
        if (gameEnded === 0) {
            play();
        }else{
            replay();
        }
    }

    function play(){
        // hid playBtn and show inputsDiv
        setPlayBtnStyle({transform:"scale(0)", margin:0, padding:0, height:0});
        setInputsDivStyle({});
    }
    function handleRowsNoChange(event){
        // if number does not fit criteria do nothing
        let newValue = event.target.value;
        if(newValue==='' || (newValue%1===0 && newValue>=minNoRows && newValue<=maxNoRows)){
            setNoRows(newValue);
        }
    }
    function handleColsNoChange(event){
        // if number does not fit criteria do nothing
        let newValue = event.target.value;
        if(newValue==='' || (newValue%1===0 && newValue>=minNoCols && newValue<=maxNoCols)){
            setNoCols(newValue);
        }
    }
    function startGame(){
        // if number does not fit criteria do nothing
        if (noRows>=minNoRows && noRows<=maxNoRows && noCols>=minNoCols && noCols<=maxNoCols) {
            // the number of columns in grid will equal noCols. 
            // Width of each column is auto (all column equal width) but with a max maxCookieWidthPx
            // Width of the game div is the width of all cookies in max width (maxCookieWidthPx) + width of paddings
            // it has a maximmum specified in CSS file. This makes the grid centered and works on all devices
            setGameDivStyle({  
                gridTemplateColumns: "repeat("+noCols+", minmax(auto,"+maxCookieWidthPx+"px))", 
                width:(maxCookieWidthPx*noCols+rowPaddingPx*(noCols-1))+"px"
            });
            // change style and text of title depending on whoose turn (player 1 if first game played)
            if (playerOneTurn) {
                setTitleBtnStyle({color:player1Color, fontSize: "60px"});
                setTitleBtnText("Player 1");
            }else{
                setTitleBtnStyle({color:player2Color, fontSize: "60px"});
                setTitleBtnText("Player 2");
            }
            //hide inputs div
            setInputsDivStyle({transform:"scale(0)", margin:0, padding:0, height:0});
            let newCookiesStyle = [];
            for (let row = 0; row < noRows; row++) {
                for (let col = 0; col < noCols; col++) {
                    if (col === 0 && row === 0) {
                        newCookiesStyle.push({row:row, col:col , style:{filter:"hue-rotate(90deg)"}});
                    }else{
                        newCookiesStyle.push({row:row, col:col , style:{}});
                    }
                }
            }
            setCookiesStyle(newCookiesStyle);
        }
    }
    function handleCookieClick(row,col){
        // make clickedCookie and all cookies down it and right it have opacity 0
        console.log("Row: "+row+" Col: "+col);
        let newCookiesStyle = cookiesStyle;
        for (let currentRow = row; currentRow < noRows; currentRow++) {
            for (let currentCol = col; currentCol < noCols; currentCol++) {
                console.log(newCookiesStyle[currentRow*noCols+currentCol]);
                let newCookieStyle = newCookiesStyle[currentRow*noCols+currentCol].style;
                newCookieStyle={...newCookieStyle, opacity:0};
                newCookiesStyle[currentRow*noCols+currentCol].style = newCookieStyle;
            }
        }
        setCookiesStyle(newCookiesStyle);
        if (playerOneTurn) {
            setTitleBtnStyle({color:player2Color, fontSize: "60px"});
            setTitleBtnText("Player 2");
        }else{
            setTitleBtnStyle({color:player1Color, fontSize: "60px"});
            setTitleBtnText("Player 1");
        }
        //if clicked cookie is the poisoned then endGame 
        if (row===0 && col===0) {
            endGame();
        }else{
            setPlayerOneTurn(!playerOneTurn);
        }
    }
    function endGame(){
        // show playBtn and change its text. hide gameDiv
        setPlayBtnStyle({});
        setPlayBtnText("Replay");
        setGameDivStyle({transform: "scale(0)", height:0})
        // make title  declare winner
        if (playerOneTurn) {
            setTitleBtnStyle({color:player2Color, fontSize: "40px"});
            setTitleBtnText("🎊Player 2 Wins🎊");
            setGameEnded(2);
        }else{
            setTitleBtnStyle({color:player1Color, fontSize: "40px"});
            setTitleBtnText("🎉Player 1 Wins🎉");
            setGameEnded(1)
        }
    }
    function replay() {
        // set the game as not ended ant play
        setGameEnded(0);
        play();
    }
    return(
        <div id="landingPage">
            <h1 className='title' style={titleBtnStyle}>{titleBtnText}</h1>
            <div className='theGame' style={gameDivStyle}>
                {cookiesStyle.map(cookie=>{
                    return(
                        <Cookie key={"row-"+cookie.row+"-col-"+cookie.col} row={cookie.row} col={cookie.col} 
                        style={cookie.style} handleClick={handleCookieClick}/>           
                    );
                })}
            </div>
            <div className='inputsDiv' style={inputsDivStyle}>
                <label>Number of rows:</label>
                <p>Number must be between {minNoRows} and {maxNoRows}</p>
                <input type="number" value={noRows} onChange={handleRowsNoChange}></input>
                <label>Number of columns:</label>
                <p>Number must be between {minNoCols} and {maxNoCols}</p>
                <input type="number" value={noCols} onChange={handleColsNoChange}></input>
                <button onClick={startGame}>Start Chomp!</button>
            </div>
            <button onClick={handlePlayBtnClick} className='playBtn' style={playBtnStyle}>{playBtnText}</button>
        </div>
    );
};
export default TheGame;