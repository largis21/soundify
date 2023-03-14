import { Routes, UserDataType, PlaylistDataType } from "utils/types";

const sidebarItems: {
    imgSrc: string,
    itemText: string,
    route: Routes
}[] = [
  { imgSrc: "../public/icons/home.svg", itemText: "Hjem", route: "home" },
  { imgSrc: "../public/icons/search.svg", itemText: "Søk", route: "search" },
  { imgSrc: "../public/icons/library.svg", itemText: "Bibliotek", route: "library" },
  { imgSrc: "../public/icons/plus.svg", itemText: "Ny Spilleliste", route: "playlist" },
]


export default function Sidebar({ 
  route,
  setRoute,
  setCurrentPlaylist,
  playlists
}: { 
  route: Routes,
  setRoute: (newRoute: Routes) => any,
  setCurrentPlaylist: (playlist: PlaylistDataType) => any,
  playlists: UserDataType["playlists"]
}) {
  return (
    <div className="w-[250px] pl-[25px] pr-[25px] text-white bg-black overflow-x-hidden">
      <ul className="mt-[25px]">
        {sidebarItems.map((item) => (
          <SidebarItem 
            imgSrc={item.imgSrc}
            itemText={item.itemText}
            active={route === item.route}
            onClick={() => setRoute(item.route)}
          />
        ))}
      </ul>
      <ul className="mt-5 pt-3 border-t-neutral-500 border-t-[1px]">
        {
          playlists.map((playlist) => (
            <li 
              className="flex items-center h-10 cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
              onClick={() => {
                setCurrentPlaylist(playlist)
                setRoute("playlist")
              }}
            >
              <p className="font-bold text-sm">{playlist.playlist_name}</p>
            </li>
          ))
        }
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
