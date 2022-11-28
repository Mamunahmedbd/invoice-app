import React from "react";
import Image from "next/image";
import mamun from "../assets/img/mamun-ahmed.jpg";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <div className="sidebar__header">
          <div className="sidebar__logo">
            <h2>Mamun</h2>
          </div>
        </div>

        <div className="sidebar__bottom">
          <Image src={mamun} alt="avatar" width="50" height="50" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
