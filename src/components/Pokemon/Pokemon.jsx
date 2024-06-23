// import "./Pokemon.css";
// import { Link } from "react-router-dom";

// function Pokemon({ name, image, id }) {
//   return (
//     <div className="pokemon">
//       <Link to={`pokemon/${id}`}>
//         <div className="card">
//           <div className="name">{name}</div>
//           <div className="image">
//             <img className="pokemon-img" src={image} />
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// }

// export default Pokemon;
import "./Pokemon.css";
import { Link } from "react-router-dom";

function Pokemon({ name, image, id }) {
  return (
    <div className="pokemon">
      <Link to={`pokemon/${id}`}>
        <div className="card">
          <div className="image">
            <img className="pokemon-img" src={image} alt={name} />
          </div>
          <div className="name">{name}</div>
        </div>
      </Link>
    </div>
  );
}

export default Pokemon;
