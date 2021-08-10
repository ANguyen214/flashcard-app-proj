import React, {useEffect, useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {deleteCard, deleteDeck, readDeck} from "../utils/api/index";

function Deck() {
    const history = useHistory();
    const params = useParams();
    const [newDeck, setNewDeck] = useState(null);
    const [newCards, setNewCards] = useState(null);

    useEffect(() => {
        async function loadDecks() {
            setNewDeck([]);
            setNewCards([]);
            try {
                const event = await readDeck(params.deckId)
                setNewDeck(event);
                const {cards} = event;
                setNewCards(cards);
            } catch (error) {
                console.log(error);
            }
        }
        loadDecks();
    }, [params])

    if(newDeck && newCards){
        return (
            <div>
                <div>
                    <Link to={"/"}>Home</Link> / {newDeck.name}
                </div>
                <div>
                    <h3>{newDeck.name}</h3>
                    <p>{newDeck.description}</p>
                    <button onClick={() => {history.push(`/decks/${newDeck.id}/edit`)}}>Edit</button>
                    <button onClick={() => {history.push(`/decks/${newDeck.id}/study`)}}>Study</button>
                    <button onClick={() => {history.push(`/decks/${newDeck.id}/cards/new`)}}>Add Cards</button>
                    <button onClick={() => {
                        if(window.confirm("Delete deck?")){
                            deleteDeck(`${newDeck.id}`);
                            history.push("/");
                        }}}>
                        Delete
                    </button>
                </div>
                <div>
                    <h2>Cards</h2>
                    <ul>
                        {newCards.map((card) => (
                            <li key={card.id}>
                                {card.front}
                                <div>{card.back}</div>
                            <button onClick={() => {history.push(`/decks/${newDeck.id}/cards/${card.id}/edit`)}}>Edit</button>
                            <button onClick={() => {
                                if(window.confirm("Delete this card?")){
                                    deleteCard(`${card.id}`);
                                    history.push(`/decks/${params.deckId}`)
                                }}}>
                            Delete
                            </button>
                            </li>
                        ))}
                    </ul>
                </div>    
            </div>
        );

    } else {
        return <p>Please wait.....</p>
    }
}
export default Deck;