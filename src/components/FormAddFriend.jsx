import Button from "./Button";
import { useState } from "react";
export default function FormAddFriend({ onsubmitdata }) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("https://i.pravatar.cc/48");

    function handledata(e) {
        e.preventDefault();
        if (!name || !image) return;
        let id = crypto.randomUUID();
        const friendData = {
            id,
            name,
            image: `${image}?u=${id}`,
            balance: 0,
        };
        console.log(friendData);
        onsubmitdata(friendData);
        setName("");
        setImage("https://i.pravatar.cc/48");
    }

    return (
        <form className=".form-add-friend" onSubmit={handledata}>
            <label>🙍Friend Name</label>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
            ></input>

            <label>📷Image Url</label>
            <input
                value={image}
                alt={name}
                onChange={(e) => setImage(e.target.value)}
                type="text"
            ></input>

            <Button>Add</Button>
        </form>
    );
}
