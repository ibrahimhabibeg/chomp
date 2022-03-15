import React from "react";
import './Cookie.css';
import cookieImg from '../images/cookie.png';

function Cookie(props){
    function handleClick(){
        if(props.style.opacity!==0){
            props.handleClick(props.row, props.col);
        }
    }
    return(
        <img className='cookie' src={cookieImg} style={props.style} onClick={handleClick}/>
    );
}

export default Cookie;