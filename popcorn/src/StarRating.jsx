function StarRating({maxRating=5}) {
    const containerStyle={
        display:"flex",
        alignItem:"center",
        gap:"16px"
    }
  return (
    <div style={containerStyle}>
      <div>
        {
            Array.from({length:maxRating}, (_,i)=><span>
                S{i+1}
            </span>)
        }
      </div>

      <p>10</p>
    </div>
  );
}

export default StarRating;
