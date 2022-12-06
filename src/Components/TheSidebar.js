import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as DashboardSvg } from "../Assets/svg/DashboardSvg.svg";
import { ReactComponent as DeadlinesSvg } from "../Assets/svg/DeadlinesSvg.svg";
// import { ReactComponent as EventSvg } from "../Assets/svg/EventSvg.svg";
import { ReactComponent as MotiveSvg } from "../Assets/svg/MotivationSvg.svg";
import { ReactComponent as RoutineSvg } from "../Assets/svg/RoutineSvg.svg";
// import { ReactComponent as LogOut } from "../Assets/svg/logOut.svg";
import { SidebarWrap } from "./TheSidebarCss";

function TheSidebar({ logOut }) {
  const navLinks = [
    { path: "/dashboard", name: "Dashboard", svg: <DashboardSvg /> },
    // { path: "/routine", name: "Update Routine", svg: <EventSvg />  },
    { path: "/event", name: "Event", svg: <RoutineSvg /> },
    { path: "/deadline", name: "Deadlines", svg: <DeadlinesSvg /> },
    { path: "/motivation", name: "Positive Motivation", svg: <MotiveSvg /> },
  ];
  return (
    <SidebarWrap>
      <nav>
        <ul>
          {navLinks &&
            navLinks?.map((link, index) => (
              <li key={index}>
                <NavLink to={link.path}>
                  {link.svg}
                  {link.name}
                </NavLink>
              </li>
            ))}
          {/* <li onClick={logOut}>
            <a href="/login">
              <LogOut /> Log Out
            </a>
          </li> */}
        </ul>
      </nav>
    </SidebarWrap>
  );
}

export default TheSidebar;
