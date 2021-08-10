import React from "react";

function AddEditForm({handleSubmit, handleFront, handleBack, 
    front, back, handleCancel}) {

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Front</label>
                <br />
                <textarea
                    value={front}
                    required
                    onChange={handleFront}
                    placeholder="Add to front of flashcard..."
                />
                <br />
                <label>Back</label>
                <br />
                <textarea
                    value={back}
                    required
                    onChange={handleBack}
                    placeholder="Add to back of flashcard..."
                />
                <br />
                <button onClick={handleCancel}>Cancel</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddEditForm;