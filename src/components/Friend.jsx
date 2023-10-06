import Button from "./Button";
export default function Friend({ friend, onSelect, selectfriend }) {
    let isSelected = selectfriend?.id === friend.id;

    return (
        <li className={isSelected ? 'selected' : ''}>
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
            <Button onClick={() => onSelect(friend)}>{isSelected ? 'close' : 'select'}</Button>
        </li>
    );
}
