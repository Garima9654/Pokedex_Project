import "./Pokemon.css";

function Pokemon({ name, image }) {
  return (
    <div className="pokemon">
      <div className="card">
        <div className="name">{name}</div>
        <div className="image">
          <img className="pokemon-img" src={image} />
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
