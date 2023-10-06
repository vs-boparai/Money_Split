import { useState } from "react";
import Button from "./Button";

export default function FormSplitBill({ selectfriend, handleAmount }) {
    const [bal, setbal] = useState();
    const [total, setTotal] = useState();
    const [person, setPerson] = useState("You");

    function handleBal(e) {
        e.preventDefault();
        setbal(Number(e.target.value) > total ? bal : Number(e.target.value));

    }
    let otherPersonBalance = bal ? total - bal : "";

    function handleSubmit(e){
        e.preventDefault();
        if (!bal || !total )return;
        handleAmount(person==='You' ? otherPersonBalance : -bal);


    }

    return (
        <form className="form-split-bill" onSubmit={handleSubmit}>
            <h2>Split bill with {selectfriend.name}</h2>
            <label>💵Bill value</label>
            <input value={total} onChange={(e) => { setTotal(e.target.value) }} type="text"></input>
            <label>🙍Your expense</label>
            <input value={bal} onChange={(e) => handleBal(e)} type="text"></input>
            <label>🙍{selectfriend.name} expense</label>
            <input value={otherPersonBalance} type="text" disabled></input>
            <label>🧑‍🤝‍🧑Who is paying?</label>
            <select value={person} onChange={(e) => setPerson(e.target.value)} className="select">
                <option value="You">You</option>
                <option value={selectfriend.name}>{selectfriend.name}</option>
            </select>
            <Button>Split bill</Button>
        </form>
    );
}
