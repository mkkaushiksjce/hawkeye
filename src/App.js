import React from "react";
import "./style.less";

// Import Components
import FloatingMenu from "./Components/floatingMenu/FloatingMenu.js";
import Calendar from "./Components/calendar/Calendar.js";
import SideNavbar from "./Components/sideNavbar/SideNavbar.js";

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      {/* <FloatingMenu /> */}
      <SideNavbar />
    </div>
  );
}
