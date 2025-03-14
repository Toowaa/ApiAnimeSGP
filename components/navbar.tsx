export default function Navbar() {
  return (
    <>
      <div
        className="w-full sticky top-0 z-10 flex items-center justify-center"
        data-sentry-component="NavBar"
        data-sentry-source-file="NavBar.tsx"
      >
        <div
          className="rounded-full bg-[hsla(0,0%,93%,0.72)] backdrop-blur-xl absolute left-1/2 top-6 z-10 -translate-x-1/2 flex items-center gap-x-8 px-6 py-2"
          data-sentry-component="DesktopNavBar"
          data-sentry-source-file="DesktopNavBar.tsx"
        >
          <svg
            width="64"
            height="30"
            viewBox="0 0 128 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M128 28H96V60H128V28Z" fill="black" />
            <path
              d="M0 59.9998V31.8268L31.8268 0H59.9998V28.1731L28.1731 59.9998H0Z"
              fill="black"
            />
            <path
              d="M48 59.9998V31.8268L79.8268 0H108V28.1731L76.1731 59.9998H48Z"
              fill="black"
            />
          </svg>
          <div className="relative w-full">
       
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>

          
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-full bg-gray-100 pl-10 pr-4 py-2 text-gray-700 border-2 border-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <ul className="flex items-center space-x-4">
            <li>
              <a href="#home" className="text-gray-700 hover:text-gray-900">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="text-gray-700 hover:text-gray-900">
                About
              </a>
            </li>
            <li>
              <a href="#services" className="text-gray-700 hover:text-gray-900">
                Services
              </a>
            </li>
            <li className="flex items-center">
              <button className="bg-black rounded-full text-white hover:bg-gray-900 px-6 py-3">
                <a href="#contact" className="text-white hover:text-gray-300">
                  Portafolio
                </a>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
