import { logo } from "../assets";

const Header = () => {
  return (
    <div className="p-6 border-b shadow-xl flex justify-center">
      <div className='w-[140px] cursor-progress'>
        <img className='w-full h-full object-cover' src={logo} />
      </div>
    </div>
  );
};
export default Header;
