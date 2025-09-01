import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        {/* Left side - Global Trotter branding */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">R</span>
          </div>
          <span className="text-lg font-semibold text-gray-900">
            Global Trotter
          </span>
        </div>

        {/* Right side - User avatar and notification */}
        <div className="flex items-center gap-3">
          {/* Download button from design */}
          <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 10L12 15L17 10"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 15V3"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback className="bg-gray-200 text-gray-600 text-sm">
              U
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
