import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as DashboardSvg } from "../Assets/svg/DashboardSvg.svg";
// import { ReactComponent as DeadlinesSvg } from "../Assets/svg/DeadlinesSvg.svg";
import { ReactComponent as EventSvg } from "../Assets/svg/EventSvg.svg";
import { ReactComponent as MotivationSvg } from "../Assets/svg/MotivationSvg.svg";
import { ReactComponent as RoutineSvg } from "../Assets/svg/RoutineSvg.svg";
import { SidebarWrap } from "./TheSidebarCss";

function TheSidebar() {
  const navLinks = [
    { path: "/dashboard", name: "Dashboard", svg: <DashboardSvg /> },
    // { path: "/routine", name: "Update Routine", svg: <DeadlinesSvg /> },
    { path: "/event", name: "Event", svg: <EventSvg /> },
    { path: "/deadline", name: "Deadlines", svg: <MotivationSvg /> },
    { path: "/motivation", name: "Positive Motivation", svg: <RoutineSvg /> },
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
        </ul>
      </nav>
    </SidebarWrap>
  );
}

export default TheSidebar;
