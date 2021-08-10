import React, {useState, useEffect} from "react";
import {useHistory, Link, useParams} from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";

function EditCard() {
    const history = useHistory();
    const params = useParams();

    const [currDeck, setCurrDeck] = useState(null);
    const [currCard, setCurrCard] = useState(null);
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");

    useEffect(() => {
        async function loadDeck() {
            try {
                const eventDeck = await readDeck(params.deckId);
                const eventCard = await readCard(params.cardId);
                setCurrDeck(eventDeck);
                setCurrCard(eventCard);
                setFront(eventCard.front);
                setBack(eventCard.back);
            } catch (error) {
                console.log(error);
            }
        }
        loadDeck();
    },[params])

    const handleFront = (event) => {
        setFront(event.target.value);
    }

    const handleBack = (event) => {
        setBack(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const cardEdit = {
            ...currCard,
            front,
            back
        }
        updateCard(cardEdit)
            .then(event => {
                setCurrCard(event)
                history.push(`/decks/${params.deckId}`)
            })
    }

    const handleCancel = (event) => {
        event.preventDefault();
        history.push(`/decks/${params.deckId}`);
    }

    return (
        <div>
            <div>
                <Link to={"/"}>Home</Link> / {`insert deckname here`}
            </div>
            <h2>Edit Card</h2>
            <br />
            <form className="editCardForm" onSubmit={handleSubmit}>
                <label>Front</label>
                <br />
                    <textarea
                        type="text"
                        required
                        name="front"
                        onChange={handleFront}
                    />
                <br />
                <label>Back</label>
                <br />
                    <textarea
                        type="text"
                        required
                        name="back"
                        onChange={handleBack}
                    />
                <br />
                <button onClick={handleCancel}>Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default EditCard; 