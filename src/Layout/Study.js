import React, {useState, useEffect} from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import {readDeck} from "../utils/api/index";

function Study(){
    const params = useParams();
    const history = useHistory();
    const [currDeck, setCurrDeck] = useState(null);
    const [currCard, setCurrCard] = useState(null);

    useEffect(() => {
        async function loadDeck(){
            setCurrDeck([]);
            setCurrCard([]);
            try{
                const event = await readDeck(params.deckId);
                setCurrDeck(event);
                const {cards} = event;
                setCurrCard(event);
            } catch (error) {
                console.log(error);
            }
        }
        loadDeck();
    }, [params])

    if(currDeck){
        return(
            <div>
                <div>
                    <Link to="/">Home</Link> / <Link to={`/decks/${currDeck.id}`}>{currDeck.name}</Link> / Study
                </div>
                <div>
                    <h1>{currDeck.name}: Study</h1>
                </div>
    
            </div>
        );
    }
    return<h2>Loading Please Wait...</h2>
}

export default Study;