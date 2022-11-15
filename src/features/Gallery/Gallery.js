import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Gallery.css';

export const Gallery = ({imgArray}) => {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [prevDisabled, setPrevDisabled] = useState(true);
    const [nextDisabled, setNextDisabled] = useState(false);

    const nextButton = () => {
        if(currentImgIndex === imgArray.length - 1)
            return;

        setCurrentImgIndex(currentImgIndex + 1);
        setPrevDisabled(false);

        if(currentImgIndex + 1 === imgArray.length - 1)
            setNextDisabled(true);
        else
            setNextDisabled(false);
    }

    const prevButton = () => {
        if(currentImgIndex === 0)
            return;
            
        setCurrentImgIndex(currentImgIndex - 1);
        setNextDisabled(false);

        if(currentImgIndex - 1 === 0)
            setPrevDisabled(true);
        else
            setPrevDisabled(false);
    }

    const controlImgPos = index => {
        if(index === currentImgIndex) {
            return {
                left: '50%',
                transform: 'translateX(-50%)',
                position: 'relative'
            }
        } else if(index < currentImgIndex) {
            return {
                left: `-100%`,
                transform: 'translateX(0)'
            }
        } else {
            return {
                left: `100%`,
                transform: 'translateX(0)'
            }
        }
    }

    return (
        <div className="gallery">
            <figure className="slide">
                {imgArray.map((img, index) => {
                    return <img className="gallery-img" alt="" src={img} key={index} style={controlImgPos(index)} />
                })}
            </figure>
            <div className="img-nav-buttons-container">
                <button className="prev-img-button" onClick={() => prevButton()} disabled={prevDisabled}>
                    <FontAwesomeIcon className="img-arrow-icon" icon="fa-regular fa-circle-left" aria-hidden="true" />
                </button>
                <button className="next-img-button" onClick={() => nextButton()} disabled={nextDisabled}>
                    <FontAwesomeIcon className="img-arrow-icon" icon="fa-regular fa-circle-right" aria-hidden="true" />
                </button>
            </div>
        </div>
    )
}