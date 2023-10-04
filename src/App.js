import { useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
  {
    id: 499474,
    name: "Simon",
    image: "https://i.pravatar.cc/48?u=499449",
    balance: 36,
  },
];

export default function App() {
  const [show, setShow] = useState(false);
  const [friends, newFriends] = useState([...initialFriends]);
  const [selectfriend, setSelect] = useState(null);
  const [amount,setAmount]=useState();
  
  const handleShow = () => {
    setShow((show) => !show);
  };
  const handleData = (friendData) => {
    newFriends([...initialFriends, friendData]);
  };

  const handleSelect = (friend) => {
    setSelect((cur)=>cur?.id===friend.id ? null : friend);
    setShow(false);
  };
  const handleAmount = () => {
    setAmount();
  };

  return (
    <div className="app">
      <div className="sidebar">
        <Friendlist friends={friends} onSelect={handleSelect} selectfriend={selectfriend}></Friendlist>
        {show && <FormAddFriend onsubmitdata={handleData}></FormAddFriend>}
        <Button onClick={handleShow}>{show ? "Close" : "Add friend"}</Button>
      </div>
      <div>{selectfriend && <FormSplitBill selectfriend={selectfriend} balanceAmount={handleAmount}></FormSplitBill>}</div>
    </div>
  );
}

function Friendlist({ friends, onSelect,selectfriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} selectfriend={selectfriend} onSelect={onSelect} />
      ))}
    </ul>
  );
}

function Friend({ friend,onSelect,selectfriend }) {
  let isSelected = selectfriend?.id === friend.id ;
  return (
    

    <li className={isSelected? 'selected':''}>
      <img src={friend.image}></img>
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owe you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p></p>}
      <Button onClick={() => onSelect(friend)}>{isSelected?'close':'select'}</Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

function FormAddFriend({ onsubmitdata }) {
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

function FormSplitBill({selectfriend,balanceAmount}) {
  const[bal,setbal]=useState();
  const[total,setTotal]=useState();
  const[person,setPerson]=useState("You");
  
  function handleBal(e){
    e.preventDefault();
    setbal(Number(e.target.value)>total ? bal : Number(e.target.value));
    
  }
     let otherPersonBalance=bal ? total-bal : "";

  return (
    <form className="form-split-bill">
      <h2>Split bill with {selectfriend.name}</h2>
      <label>💵Bill value</label>
      <input value={total} onChange={(e)=>{setTotal(e.target.value)}} type="text"></input>
      <label>🙍Your expense</label>
      <input value={bal} onChange={(e)=>handleBal(e)}  type="text"></input>
      <label>🙍{selectfriend.name} expense</label>
      <input value={otherPersonBalance} type="text" disabled></input>
      <label>🧑‍🤝‍🧑Who is paying?</label>
      <select value={person}  onChange={(e)=>setPerson(e.target.value)} className="select">
        <option value="You">You</option>
        <option value={selectfriend.name}>{selectfriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
