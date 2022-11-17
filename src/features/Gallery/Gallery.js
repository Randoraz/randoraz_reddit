import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Gallery.css';

export const Gallery = ({imgArray}) => {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [prevDisabled, setPrevDisabled] = useState(true);
    const [nextDisabled, setNextDisabled] = useState(false);
    const [slideHeight, setSlideHeight] = useState({height: '100%'});
    const [imgElArray, setImgElArray] = useState([]);

    const slideEl = useRef(null);

    useEffect(() => {
        const newImgArray = Array.from(slideEl.current.childNodes);
        setImgElArray(newImgArray);

        const setHeight = () => {
            let newHeight = 0;
            newImgArray.forEach(img => {
                if(img.offsetHeight > newHeight)
                    newHeight = img.offsetHeight;
            })
            setSlideHeight({height: newHeight});
        }

        newImgArray.forEach((img, index) => {
            const styles = controlImgPos(index);
            img.style.left = styles.left;
            img.style.transform = styles.transform;
            img.style.position = styles.position;
        });
        
        window.addEventListener("resize", setHeight);
        
        if (newImgArray[0].complete) {
            setHeight();
          } else {
            newImgArray[0].addEventListener('load', setHeight);
            return () => newImgArray[0].removeEventListener('load', setHeight);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const nextButton = () => {
        if(currentImgIndex === imgArray.length - 1)
            return;

        setCurrentImgIndex(currentImgIndex + 1);
        setPrevDisabled(false);

        if(currentImgIndex + 1 === imgArray.length - 1)
            setNextDisabled(true);
        else
            setNextDisabled(false);

        handleIndexChange('plus');
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

        handleIndexChange('minus');
    }

    const handleIndexChange = operation => {
        switch(operation) {
            case 'plus':
                imgElArray[currentImgIndex].style.left = '-101%';
                imgElArray[currentImgIndex].style.transform = 'translateX(0)';

                imgElArray[currentImgIndex + 1].style.left = '50%';
                imgElArray[currentImgIndex + 1].style.transform = 'translateX(-50%)';
                return;
            case 'minus':
                imgElArray[currentImgIndex].style.left = '101%';
                imgElArray[currentImgIndex].style.transform = 'translateX(0)';

                imgElArray[currentImgIndex - 1].style.left = '50%';
                imgElArray[currentImgIndex - 1].style.transform = 'translateX(-50%)';
                return;
            default:
                return;
        }
    }

    const controlImgPos = index => {
        if(index === currentImgIndex) {
            return {
                left: '50%',
                transform: 'translateX(-50%)',
                position: 'absolute'
            }
        } else if(index < currentImgIndex) {
            return {
                left: `-101%`,
                transform: 'translateX(0)',
                position: 'absolute'
            }
        } else {
            return {
                left: `101%`,
                transform: 'translateX(0)',
                position: 'absolute'
            }
        }
    }

    return (
        <div className="gallery">
            <figure className="slide" ref={slideEl} style={slideHeight}>
                {imgArray.map((img, index) => {
                    return <img className="gallery-img" alt="" src={img} key={index} />
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