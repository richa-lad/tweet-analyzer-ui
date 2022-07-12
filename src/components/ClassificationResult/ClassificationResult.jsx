import React from 'react';
import './ClassificationResult.css';

function ClassificationResult(props) {
  return (
    <div className='classification'>
        <img src={`${props.url.slice(0,props.url.length-11)}.jpg`} alt={props.name} className="classification-photo"></img>
        <div className='classification-text'>
            <h4 className='classification-name'>{props.name}!</h4>
            <p className='classification-bio'>{props.bio}</p>
        </div>
    </div>
  )
}

export default ClassificationResult