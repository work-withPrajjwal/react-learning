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
];

function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const[friends, setFriends] = useState(initialFriends)
  const[selectedFriend, setSelectedFriend]= useState(null);
  const[]
  function handleShowAddFriend() {
    setShowAddFriend((currShow) => !currShow);
    
  }

  function handleAddFriend(friend){
    setFriends((friends)=>[...friends, friend]);
    setShowAddFriend(false);
  }
  function handleSelectFriend(friend){
    setSelectedFriend((curr)=>(curr?.id===friend.id? null:friend))
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} onSelectFriend={handleSelectFriend} selectedFriend={selectedFriend}/>
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "close" : "AddFriend"}
        </Button>
      </div>
      {selectedFriend &&<FormSplitBill  selectedFriend={selectedFriend}/>}
    </div>
  );
}

function FriendList({friends, onSelectFriend, selectedFriend}) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} onSelectFriend={onSelectFriend} selectedFriend={selectedFriend}/>
      ))}
    </ul>
  );
}

function Friend({ friend, onSelectFriend, selectedFriend}) {

  const isSelected=  selectedFriend?.id === friend.id;
  return (
    <li className={isSelected? 'selected': ''}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe{friend.name} ${Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}

      {friend.balance === 0 && (
        <p className="black">You and {friend.name} are even</p>
      )}
      <Button onClick={()=> onSelectFriend(friend)}>{isSelected? "Close": "Select"}</Button>
    </li>
  );
}

function FormAddFriend({onAddFriend}) {
  const[name,  setName]= useState('')
  const[image, setImage]= useState("https://i.pravatar.cc/48")

  function handleSubmit(e){
    e.preventDefault()
    if(!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend={
      id, name, image:`${image}?=${id}`, balance:0
    };
    onAddFriend(newFriend)
    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👩‍❤️‍👨 Friend Name</label>
      <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
      <label>🌆 Image URL</label>
      <input type="text" value={image} onChange={(e)=>setImage(e.target.value)} />
      <Button>Add</Button>
    </form>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormSplitBill({selectedFriend}) {
  const[bill, setBill] = useState("")
  const[paidByUser, setPaidByUser] = useState("");
  const[whoIsPaying, setWhoIsPaying]= useState('')
  const paidByFriend = bill ? bill - paidByUser: '' ;

  function handleSubmit(e){
    e.preventDefault();
    if(!bill || !paidByUser) return;
    if(whoIsPaying === "user"){
      
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>SPLIT A BILL WITH {selectedFriend.name}</h2>
      <label>💰Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>🧔Your Expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) => setPaidByUser(
          Number(e.target.value)> bill? paidByUser: Number(e.target.value))}
      />
      <label>🙍‍♀️{selectedFriend.name}'s Expense</label>
      <input type="text" disabled value={paidByFriend} />
      <label>🤑Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
export default App;
