import s from "./Sidebar.module.scss";
import { SiTask } from "react-icons/si";
import { BiCategory } from "react-icons/bi";
import { LiaHashtagSolid } from "react-icons/lia";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <aside className={s.sidebar}>
      <div className={s.header}>
        <span>
          <SiTask />
        </span>
        <h1 onClick={() => navigate("/")}>Task Managment</h1>
      </div>
      <nav>
        <NavLink to="/categories">
          <i>
            <BiCategory />
          </i>
          <p>Category</p>
        </NavLink>
        <NavLink to="/tags">
          <i>
            <LiaHashtagSolid />
          </i>
          <p>Tags</p>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
