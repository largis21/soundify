import { Router } from "@/pages/landing";
import { Routes } from "utils/types";

const sidebarItems: {
    imgSrc: string,
    itemText: string,
    route: Routes
}[] = [
  { imgSrc: "/icons/home.svg", itemText: "Hjem", route: "home" },
  { imgSrc: "/icons/search.svg", itemText: "Søk", route: "search" },
  { imgSrc: "/icons/library.svg", itemText: "Bibliotek", route: "library" },
  { imgSrc: "/icons/plus.svg", itemText: "Ny Spilleliste", route: "playlist" },
]

export default function Sidebar({ router }: { router: Router }) {
  return (
    <div className="w-[250px] pl-[25px] pr-[25px] text-white bg-black overflow-x-hidden">
      <ul className="mt-[25px]">
        {sidebarItems.map((item) => (
          <SidebarItem 
            imgSrc={item.imgSrc}
            itemText={item.itemText}
            active={router.getCurrentRoute() === item.route}
            onClick={() => router.setCurrentRoute(item.route)}
          />
        ))}
      </ul>
      <ul className="mt-5 pt-3 border-t-neutral-500 border-t-[1px]">
        <li className="flex items-center h-10 cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
          <p className="font-bold text-sm">Spilleliste #1</p>
        </li>
      </ul>
    </div>
  );
}

function SidebarItem({ 
  imgSrc,
  itemText,
  active,
  onClick 
}: {
  imgSrc: string,
  itemText: string,
  active: boolean,
  onClick: () => any
}) {
  return (
    <li 
      className={`flex items-center h-10 cursor-pointer hover:opacity-100 transition-opacity 
        ${active ? "opacity-100" : "opacity-80"}`}
      onClick={onClick}
    >
      <img src={imgSrc} width="20"/>
      <p className="ml-[17px] font-bold text-sm">{itemText}</p>
    </li>
  ) 
}
