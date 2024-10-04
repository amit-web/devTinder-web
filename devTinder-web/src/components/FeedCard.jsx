

const FeedCard = ({ user }) => {
  const { firstName, lastName, age, gender, skills, about, photoUrl } = user
  // console.log(feed[0]);

  return (
    <div className="card bg-base-100 w-96 shadow-xl m-auto">
      <figure>
        <img className="h-full w-full" src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName+" "+lastName}</h2>
        <p>{about}</p>
       {age&&gender&& <p>{age+" "+gender}</p>}
        <div className="card-actions justify-around">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Intrested</button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
