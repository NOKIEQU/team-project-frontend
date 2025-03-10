import Link from "next/link";


// Sidebar Link Component
function SidebarLink({ href, icon, text }) {
    return (
      <Link href={href} className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-gray-700 p-3 rounded-lg transition">
        {icon}
        <span>{text}</span>
      </Link>
    );
  }

  export default SidebarLink;