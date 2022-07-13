import {React, useState} from 'react'
import './ScoreBar.css';

function ScoreBar(props) {
    const [barStyle, setBarStyle] = useState({
        width: `${props.score*100}vw`,
        height: "1.4rem",
        background: "#c2f0ff",
        borderRadius: "50px",
        flex: "none",
        order: 1,
        flexGrow: 0,
        textAlign: "center"
    });

  return (
    <div className='bar-container'>
        <img src={`${props.url.slice(0,props.url.length-11)}.jpg`} alt={props.name} className='bar-image'></img>
        <div className='bar' style={barStyle}>{Math.round(props.score*100)}%</div>
        <p className='bar-score'> <span>{props.name}</span></p>   
    </div>
  )
}

export default ScoreBar