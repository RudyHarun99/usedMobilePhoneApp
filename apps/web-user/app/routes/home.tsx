import type { Route } from "./+types/home";
import { Outlet } from "react-router";
import { Navbar } from "~/components/navbar";
import { useState } from "react";
import type { OptionProps } from "~/types";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Baba Ali" },
    { name: "description", content: "Welcome to Baba Ali" },
  ];
}

export default function Home() {
  const [ inputSearch, setInputSearch ] = useState('');
  const [ inputMinPrice, setInputMinPrice ] = useState(0);
  const [ inputMaxPrice, setInputMaxPrice ] = useState(0);
  const [ inputMinOrder, setInputMinOrder ] = useState(0);

  const [ option, setOption ] = useState<OptionProps>({
    search: '',
    minPrice: 0,
    maxPrice: 0,
    minimumOrderQuantity: 0,
  });

  return (
    <>
      <Navbar
        option={option}
        setOption={setOption}
        inputSearch={inputSearch}
        setInputSearch={setInputSearch}
        setInputMinPrice={setInputMinPrice}
        setInputMaxPrice={setInputMaxPrice}
        setInputMinOrder={setInputMinOrder}
      />
      <Outlet
        context={{
          option, setOption,
          inputMinPrice, setInputMinPrice,
          inputMaxPrice, setInputMaxPrice,
          inputMinOrder, setInputMinOrder
        }}
      />
    </>
  );
};
