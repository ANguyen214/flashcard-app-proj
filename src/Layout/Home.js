import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {listDecks, deleteDeck} from "../utils/api/index";


function Home() {
    const [deckList,setDeckList] = useState(null);

    useEffect(() => {
        async function loadAllDecks() {
            setDeckList([]);
            try {
                const response = await listDecks();
                setDeckList(response);
            } catch (error) {
                console.log(error);
            }
        }
        loadAllDecks();
    }, [])

    const history = useHistory();
    const handleNewDeck = () => {
        history.push("/decks/new");
    }

    return (
        <div>
            <button onClick={handleNewDeck}>+Create Deck</button>
            {deckList ? (
                <div>  
                    <ul>
                        {deckList.map((deck) => {
                            <li key={deck.id}>
                                <h2>{deck.name}</h2>
                                <h5>{deck.cards.length} cards</h5>
                                <p>{deck.description}</p>
                                <Link to={`/decks/${deck.id}`}>View</Link>
                                <Link to={`/decks/${deck.id}/study`}>Study</Link> 
                                <button 
                                    onClick={(event) => {
                                        if(window.confirm("Delete this deck?")){
                                            deleteDeck(`${deck.id}`);
                                            history.go("/");
                                        }
                                    }}>
                                Delete
                                </button>
                            </li>
                        })}
                    </ul>
                </div>
        ) : (
            <h3>Please create a deck and enjoy!</h3>
        )}
        </div>
        
    );
    
}

export default Home;