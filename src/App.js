import { useState } from "react";
import Friendlist from "./components/Friendlist";
import Button from "./components/Button";
import FormAddFriend from "./components/FormAddFriend";
import FormSplitBill from "./components/FormSplitBill";
import { initialFriends } from "./initialFriends";

export default function App() {
  const [show, setShow] = useState(false); //state handle the show/hide functionality of Add friend
  const [friends, newFriends] = useState([...initialFriends]); //state handle the updated(new added friends)list of friends
  const [selectfriend, setSelect] = useState(null); //state handle the current selected friend from list
  //function used for hide/show for add form
  const handleShow = () => {
    setShow((show) => !show);
  };

  //function handle new friend added from the add form
  const handleData = (friendData) => {
    newFriends([...initialFriends, friendData]);
  };

  //function handle the current selection of friend and functionality
  const handleSelect = (friend) => {
    setSelect((cur) => (cur?.id === friend.id ? null : friend));
    setShow(false);
  };
  
  //function handle the split bill balance information and added to the selected friend balance
  const handleAmount = (value) => {
    console.log(value);
    newFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectfriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelect(null);
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
            handleAmount={handleAmount}
          ></FormSplitBill>
        )}
      </div>
    </div>
  );
}
