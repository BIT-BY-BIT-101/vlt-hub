import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ParticipantNavMenu from "./ParticipantNavMenu";
import HostNavMenu from "./HostNavMenu";
import VenueNavMenu from "./VenueNavMenu";
import "./Menus.css";

const Menus = () => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser?.data.role === "participant") {
    return <ParticipantNavMenu />;
  }

  if (currentUser?.data.role === "host") {
    return <HostNavMenu />;
  }
  if (currentUser?.data.role === "venue") {
    return <VenueNavMenu />;
  }
};

export default Menus;
