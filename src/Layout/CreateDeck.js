import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {createDeck} from "../utils/api/index";

function CreateDeck() {
    const history = useHistory();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleDescription = (event) => {
        setDescription(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newDeck = {name, description}
        createDeck(newDeck)
            .then(event => history.push(`/decks/${event.id}`))  
    }

    const handleCancel = (event) => {
        event.preventDefault();
        history.push("/");
    }

    return (
        <div>
            <div>
                <Link to={"/"}>Home</Link> / {`Create Deck`}
            </div>
            <h1>Create Deck</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <br />
                    <input
                        type="text"
                        name="name"
                        required
                        onChange={handleName}
                        value={name}
                        placeholder="Deck Name"
                    />
                </label>
                <br />
                <label>
                    Description
                    <br />
                    <textarea
                        type="text"
                        name="description"
                        required
                        onChange={handleDescription}
                        value={description}
                        placeholder="Brief description of the deck"
                    />
                </label>
                <br />
                <button onClick={handleCancel}>Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateDeck;
