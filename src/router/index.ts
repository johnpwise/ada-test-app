import { createElement } from "react";
import { createBrowserRouter, type RouteObject } from "react-router-dom";

import App from "../App";
import AboutView from "../views/about/AboutView";
import ContactView from "../views/contact/ContactView";
import HomeView from "../views/home/HomeView";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: createElement(App),
    children: [
      {
        index: true,
        element: createElement(HomeView),
      },
      {
        path: "about",
        element: createElement(AboutView),
      },
      {
        path: "contact",
        element: createElement(ContactView),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
