import { useState } from "react";

// Initial friend data
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
];

export default function App() {
  // Controls add friend form visibility
  const [showAddFriend, setShowAddFriend] = useState(false);

  // Stores all friends
  const [friends, setFriends] = useState(initialFriends);

  // Stores currently selected friend
  const [selectedFriend, setSelectedFriend] = useState(null);

  // Toggle add friend form
  function handleShowAddFriend() {
    setShowAddFriend((Curshow) => !Curshow);
  }

  // Add new friend to state
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }
  // Select or deselect a friend
  function handleSelectFriend(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
  }

  // Update friend's balance after splitting bill
  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend,
      ),
    );
    // Close bill form after splitting
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelectFriend={handleSelectFriend}
          selectedFriend={selectedFriend}
        />
        {/* Show add friend form only when state is true */}
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        {/* Toggle button */}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>

      {/* Show split bill form only if friend is selected */}
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}

// Component for rendering all friends
function FriendList({ friends, onSelectFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

// Single friend component
function Friend({ friend, onSelectFriend, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => onSelectFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

// Form for adding a new friend
function FormAddFriend({ onAddFriend }) {
  // Friend name state
  const [name, setName] = useState("");

  // Friend image URL state
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  // Handle form submit
  function handleSubmit(e) {
    e.preventDefault();

    // Prevent empty input
    if (!name || !image) return;

    // Generate unique id
    const id = crypto.randomUUID();

    // Create new friend object
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    // Send friend data to parent component
    onAddFriend(newFriend);

    // Reset inputs
    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🌇 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

// Reusable button component
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

// Form for splitting bills
function FormSplitBill({ selectedFriend, onSplitBill }) {
  // Total bill amount
  const [bill, SetBill] = useState("");
  // Amount paid by user
  const [paidByUser, SetPaidByUser] = useState("");
  // Stores who paid the bill
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  // Friend's share calculation
  const paidByFriend = bill ? bill - paidByUser : "";

  // Handle bill split submit
  function handleSubmit(e) {
    e.preventDefault();

    // Prevent empty values
    if (!bill || !paidByUser) return;

    // Update balance based on who paid
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2> Split a bill with {selectedFriend.name}</h2>

      {/* Bill amount input */}
      <label>💰 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => SetBill(Number(e.target.value))}
      />

      {/* User expense input */}
      <label>🧍‍♀️ Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          SetPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value),
          )
        }
      />

      {/* Friend expense display */}
      <label>👫 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      {/* Select who paid */}
      <label>🤑 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      {/* Submit button */}
      <Button>Split bill</Button>
    </form>
  );
}
