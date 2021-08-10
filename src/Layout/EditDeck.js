import React, {useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";

function EditDeck() {
    const history = useHistory();
    const params = useParams();

    const [currDeck, setCurrDeck] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        async function loadDeck() {
            setCurrDeck([]);
            try {
                const event = await readDeck(params.deckId);
                setCurrDeck(event);
                setName(event.name);
                setDescription(event.description);
            } catch (error) {
                console.log(error);
            }
        }
        loadDeck();
    }, [params])

    const handleCancel = (event) => {
        event.preventDefault();
        history.push(`/decks/${currDeck.id}`);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const editDeck = {
            name, 
            description,
            id:currDeck.id,
        }
        updateDeck(editDeck)
            .then(event => {
                setCurrDeck(event)
                history.push(`/decks/${currDeck.id}`)
            })
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    if(currDeck){
        return (
            <div>
                <div>
                    <Link to={"/"}>Home</Link> / {currDeck.name}
                </div>
                <br />
                <h2>Edit Deck</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name
                        <br />
                        <input 
                            type="text"
                            required
                            value={name}
                            onChange={handleNameChange}
                        />
                    </label>
                    <br />
                    <label>
                        Description
                        <br />
                        <textarea 
                            type="text"
                            required
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                    </label>
                    <button onClick={handleCancel}>Cancel</button>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    } else {
        return <p>Please wait....</p>
    }
    
}

export default EditDeck;