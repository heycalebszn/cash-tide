const Navbar = () => {

  return (
    <nav className="fixed top-0 flex justify-center bg-transparent w-full z-50">
      <div className="flex items-center justify-between w-full px-4 sm:px-6 md:px-10 lg:px-[50px] py-6">
        <h1 className="text-white text-4xl font-semibold">Jeton</h1>

        <ul className="flex items-center gap-4">
          <li className="relative z-10">
            <a 
              href="https://portal.jeton.com/login" 
              target="_blank" 
              className="px-7 py-3 border border-white text-white rounded-xl navbar-hover-animation"
            >
              Log in
            </a>
          </li>
          <li className="relative z-10">
            <a 
              href="https://portal.jeton.com/signup" 
              target="_blank" 
              className="px-7 py-3 bg-white text-red-500 rounded-xl hover:bg-gray-100 navbar-hover-animation"
            >
              Sign up
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;