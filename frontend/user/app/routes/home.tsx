import type { Route } from "./+types/home";
import { Outlet } from "react-router";
import { Navbar } from "~/components/navbar";
import { useState } from "react";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Baba Ali" },
    { name: "description", content: "Welcome to Baba Ali" },
  ];
}

export default function Home() {
  const [ option, setOption ] = useState({
    search: '',
    minPrice: 0,
    maxPrice: 0,
    minimumOrderQuantity: 0
  });

  return (
    <>
      <Navbar
        option={option}
        setOption={setOption}
      />
      <Outlet context={{ option, setOption }} />
    </>
  );
};
