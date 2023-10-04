import Friend from "./Friend";
export default function Friendlist({ friends, onSelect, selectfriend }) {
    return (
        <ul>
            {friends.map((friend) => (
                <Friend friend={friend} key={friend.id} selectfriend={selectfriend} onSelect={onSelect} />
            ))}
        </ul>
    );
}