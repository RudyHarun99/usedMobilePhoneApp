import type { Route } from "./+types/dashboard";
import { Outlet } from "react-router";
import { useState } from "react";
import { Navbar } from "~/components/navbar";
import type { OptionProps } from "~/types";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Admin Dashboard" },
    { name: "description", content: "Admin Dashboard for Used Mobile Phone Store" },
  ];
}

export default function Dashboard() {
  const [inputSearch, setInputSearch] = useState('');
  const [inputMinPrice, setInputMinPrice] = useState(0);
  const [inputMaxPrice, setInputMaxPrice] = useState(0);
  const [inputMinOrder, setInputMinOrder] = useState(0);

  const [option, setOption] = useState<OptionProps>({
    search: '',
    minPrice: 0,
    maxPrice: 0,
    minimumOrderQuantity: 0,
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        option={option}
        setOption={setOption}
        inputSearch={inputSearch}
        setInputSearch={setInputSearch}
        setInputMinPrice={setInputMinPrice}
        setInputMaxPrice={setInputMaxPrice}
        setInputMinOrder={setInputMinOrder}
      />
      <main className="p-8">
        <Outlet
          context={{
            option, setOption,
            inputMinPrice, setInputMinPrice,
            inputMaxPrice, setInputMaxPrice,
            inputMinOrder, setInputMinOrder
          }}
        />
      </main>
    </div>
  );
}