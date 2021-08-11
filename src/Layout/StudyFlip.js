import React,{useEffect, useState} from "react";
import { useHistory, useParams } from "react-router-dom";

export default ({currCard}) => {
    const params = useParams();
    const history = useHistory();

    const [count, setCount] = useState(1);
    const [side, setSide] = useState(null);
    const [studyCount, setStudyCount] = useState(0);
    const [studyCard, setStudyCard] = useState(null);

        useEffect(() => {
            if(currCard.length > 2){
                setSide(true);
            }
            setStudyCard(currCard[studyCount]);
        },[currCard])

        const handleNextCard = (event) => {
            event.preventDefault();
            setSide(!side);
            setCount((currentCard) => currentCard + 1);
            setStudyCount((currentCard) => currentCard + 1);
            setStudyCard(currCard[studyCount + 1])
            if(currCard.length <= count){
                if(window.confirm("Restart Cards?")){
                    setCount(1);
                    setStudyCount(0);
                    history.push(`/decks/${params.deckId}/study`)
                } else {
                    history.push("/");
                }
            }
        }

        const handleAdd = (event) => {
            event.preventDefault();
            history.push(`/decks/${params.deckId}/cards/new`)
        }
    
        const handleCardFlip = (event) => {
            event.preventDefault();
            setSide(!side);
        }

        if((side === true) && studyCard) {
            return (
                <div>
                    <h4>Card {count} of {currCard.length}</h4>
                    {studyCard.front}
                    <br />
                    <button onClick={handleCardFlip}>Flip</button>
                </div>
            );
        }
        if((side === false) && studyCard){
            return(
                <div>
                    <h4>Card {count} of {currCard.length}</h4>
                    {studyCard.back}
                    <br />
                    <button onClick={handleCardFlip}>Flip</button>
                    <button onClick={handleNextCard}>Next</button>
                </div>
            );
        } else {
            return (
                <div>
                    <h4>Not enough cards</h4>
                    <p>You need at least 3 cards to study. There are {currCard.length} in this deck</p>
                    <button onClick={handleAdd}>+Add Cards</button>
                </div>
            );
        }
    }
