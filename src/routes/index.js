import React, { lazy } from "react";

const AddNewConfig = lazy(() => import("../pages/AddNewConfig"));
const ConfigsList = lazy(() => import("../pages/ConfigsList"));

export const routes = [
  {
    path: "/",
    exact: true,
    component: <ConfigsList />,
    name: "List of configs",
  },
  {
    path: "/add-new-config",
    exact: true,
    component: <AddNewConfig />,
    name: "Add new config",
  },
];
