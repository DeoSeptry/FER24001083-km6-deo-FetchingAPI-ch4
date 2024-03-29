import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Quran from "./quran";
import QuranDetails from "./quranDetail";
import Ayat from "./ayat";
import Reminder from "./reminder";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Quran />,
    },
    {
      path: "/quran-details",
      element: <QuranDetails />,
    },

    {
      path: "/ayat",
      element: <Ayat />,
    },
    {
      path: "/reminder",
      element: <Reminder />,
    },
  ]);

  return <RouterProvider router={router} />;
}
