import { Link } from "react-router-dom"
import "./header.style.scss";
import { onClickSound } from "../../utils/sounds";

function Header() {
  return (
    <div className="header">
       <h3>NASA Mission control 🪐</h3>
       <div>
          <Link onClick={onClickSound} to="/">Launches</Link>
          <Link onClick={onClickSound} to="/upcoming">Upcoming</Link>
         <Link onClick={onClickSound} to="/history">History</Link>
       </div>
    </div>
  )
}
export default Header