import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {createDeck} from "../utils/api/index";

function CreateDeck() {
    const history = useHistory();
    const [name, setName] = useState("Deck Name");
    const [description, setDescription] = useState("Brief description of the deck");

    const initialFormData = {
        name: "",
        description: "",
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleFormChange = (event) => {
        setFormData({
            ...formData, 
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = (event) => {
        // event.preventDefault();
        // function Submit() {
        //     let name = [formData.name];
        //     let description = [formData.description];
        //     const createNewDeck = createDeck({name, description});
        //     return createNewDeck;
        // }
        // Submit();
        // history.push(`decks/${Submit().id}`);
        event.preventDefault();
        let formName = formData.name;
        let formDescription = formData.description;
        const newDeck = {formName, formDescription}
        let createNewDeck = createDeck(newDeck)
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
                        onChange={handleFormChange}
                        value={formData.name}
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
                        onChange={handleFormChange}
                        value={formData.description}
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
