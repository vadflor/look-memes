import Image from "next/image";
import Link from "next/link";

import SearchInput from "./SearchInput";

const Header = () => {
  
  return (
    <header className="border-b border-mem-medium-gray">
      <div className="max-w-6xl mx-auto flex-col md:flex md:flex-row md:items-center px-4 py-2 space-y-2 md:space-y-0 md:h-[76px]">
        
        <Link href={"/"} className="flex items-center justify-center gap-x-2 cursor-pointer">
          <Image src='new-logo.svg' alt='logo' width={100} height={30} />
          <span className="text-white text-2xl md:text-3xl font-medium">Memes</span>
        </Link>
        
        <div className="w-full flex justify-center items-center md:justify-end">
          <SearchInput 
          />
        </div>
      </div>
    </header>
  );
}

export default Header;