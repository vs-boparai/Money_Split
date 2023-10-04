import { useState } from "react";
import Friendlist from "./components/Friendlist";
import Button from "./components/Button";
import FormAddFriend from "./components/FormAddFriend";
import FormSplitBill from "./components/FormSplitBill";
import { initialFriends } from "./initialFriends";

export default function App() {
  const [show, setShow] = useState(false);
  const [friends, newFriends] = useState([...initialFriends]);
  const [selectfriend, setSelect] = useState(null);
  const [amount, setAmount] = useState();

  const handleShow = () => {
    setShow((show) => !show);
  };
  const handleData = (friendData) => {
    newFriends([...initialFriends, friendData]);
  };

  const handleSelect = (friend) => {
    setSelect((cur) => (cur?.id === friend.id ? null : friend));
    setShow(false);
  };
  const handleAmount = () => {
    setAmount();
  };

  return (
    <div className="app">
      <div className="sidebar">
        <Friendlist
          friends={friends}
          onSelect={handleSelect}
          selectfriend={selectfriend}
        ></Friendlist>
        {show && <FormAddFriend onsubmitdata={handleData}></FormAddFriend>}
        <Button onClick={handleShow}>{show ? "Close" : "Add friend"}</Button>
      </div>
      <div>
        {selectfriend && (
          <FormSplitBill
            selectfriend={selectfriend}
            balanceAmount={handleAmount}
          ></FormSplitBill>
        )}
      </div>
    </div>
  );
}
