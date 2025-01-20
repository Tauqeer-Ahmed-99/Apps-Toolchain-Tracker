import React from "react";
import { Service } from "@/lib/models";
import UpdateService from "./AddService";

const ServiceTile = ({ service }: { service: Service }) => {
  return <UpdateService service={service} />;
};

export default ServiceTile;
