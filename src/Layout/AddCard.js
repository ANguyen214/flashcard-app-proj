import React, {useState, useEffect} from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index";
import AddEditForm from "./AddEditForm";

function AddCard () {
    const history = useHistory();
    const params = useParams();

    const [front, setFront] = useState("");
    const [back, setBack] = useState("");
    const [currDeck, setCurrDeck] = useState(null);

    useEffect(() => {
        async function loadCurrDeck() {
            setCurrDeck([]);
            try {
                const event = await readDeck(params.deckId);
                setCurrDeck(event);
            } catch (error) {
                console.log(error);
            }
        }
        loadCurrDeck();
    }, [params])

    const handleFront = (event) => {
        setFront(event.target.value);
    }

    const handleBack = (event) => {
        setBack(event.target.value);
    }

    const handleDone = (event) => {
        event.preventDefault();
        history.push(`/decks/${params.deckId}`);
    }

    const handleSave = (event) => {
        event.preventDefault();
        const newCard = {
            front,
            back,
            deckId: params.deckId
        }
        createCard(params.deckId, newCard)
            .then(event => {
                setFront("")
                setBack("")
            })
    }

    if(currDeck) {
        return (
            <div>
                <div>
                    <Link to="/">Home</Link> / <Link to={`/decks/${params.deckId}`}>{currDeck.name}</Link> / {"Add Card"}
                </div>
                <h2>{currDeck.name}: Add Card</h2>
                <br />
                <AddEditForm 
                    handleFront={handleFront}
                    handleBack={handleBack}
                    handleSubmit={handleSave}
                    handleCancel={handleDone}
                    front={front}
                    back={back}
                />
            </div>
        );
    }
    return (
        <h2>Loading Please Wait...</h2>
    );
    
}
export default AddCard;