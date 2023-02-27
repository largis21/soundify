export default function Sidebar() {
  return (
    <div className="w-[250px] text-white bg-black overflow-x-hidden">
      <ul className="pl-[25px] mt-14">
          <li className="flex items-center h-10 cursor-pointer">
            <img src="/icons/home.svg" width="20"/>
            <p className="ml-[17px] font-bold text-sm">Hjem</p>
          </li>
          <li className="flex items-center h-10 cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
            <img src="/icons/search.svg" width="20"/>
            <p className="ml-[17px] font-bold text-sm">Søk</p>
          </li>
          <li className="flex items-center h-10 cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
            <img src="/icons/library.svg" width="20"/>
            <p className="ml-[17px] font-bold text-sm">Bibliotek</p>
          </li>
      </ul>

    </div>
  );
}
