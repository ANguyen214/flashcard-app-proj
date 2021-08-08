import React, {useState, useEffect} from "react";
import {useHistory, Link} from "react-router-dom";
import { readDeck, readCard } from "../utils/api/index";

function EditCard() {
    const history = useHistory();

    const initialFormData = {
        front: "",
        back: "",
    }

    const[formData, setFormData] = useState(initialFormData)

    const handleChange = (event) => {
        event.preventDefault();
        setFormData({
            ...formData, 
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        async function loadDeck() {
            try {
                const event = await readDeck()
            } catch (error) {
                console.log(error);
            }
        }
        loadDeck();
    },[])

    const handleSubmit = (event) => {
        event.preventDefault();

    }

    const handleCancel = (event) => {
        event.preventDefault();
        history.push("/");
    }

    return (
        <div>
            <div>
                <Link to={"/"}>Home</Link> / {`insert deckname here`}
            </div>
            <h2>Edit Card</h2>
            <br />
            <form className="editCardForm" onSubmit={handleSubmit}>
                <label>Front
                    <input
                        type="text"
                        required
                        name="front"
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>Back
                    <input
                        type="text"
                        required
                        name="back"
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button onClick={handleCancel}>Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default EditCard; 