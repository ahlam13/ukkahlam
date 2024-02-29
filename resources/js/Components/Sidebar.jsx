import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { MdOutlineDashboardCustomize, MdOutlineCategory } from "react-icons/md";
import { FiBook, FiUsers } from "react-icons/fi";
import { GoLog } from "react-icons/go";
import { Link } from "@inertiajs/react";

const Sidebar = ({ className }) => {
    const [open, setOpen] = useState(true);

    const Menus = [
        { title: "Dashboard", routes: route("petugas-dashboard") },
        { title: "Buku", icon: <FiBook />, routes: route("petugas-book") },
        {
            title: "Kategori",
            icon: <MdOutlineCategory />,
            routes: route("petugas-category"),
        },
        { title: "Pengguna", icon: <FiUsers />, routes: route("petugas-user") },
        {
            title: "Log Peminjaman",
            icon: <GoLog />,
            routes: route("petugas-rentlog"),
        },
    ];

    return (
        <div
            className={`bg-nav fixed h-screen p-5 pt-8 ${
                open ? "w-72" : "w-20"
            } duration-300 relative ${className}`}
        >
            <FiArrowLeft
                className={`bg-white text-nav text-3xl rounded-full absolute -right-3 top-9 border border-nav cursor-pointer ${
                    !open && "rotate-180"
                }`}
                onClick={() => setOpen(!open)}
            />
            <div className="inline-flex mt-2 cursor-pointer">
                <img
                    src="/img/logo1.png"
                    className={`w-44 duration-500 ${
                        open && "rotate-[360deg]"
                    } `}
                />
            </div>
            <ul className="pt-2">
                {Menus.map((menu, index) => (
                    <>
                        <Link href={menu.routes}>
                            <li
                                key={index}
                                className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-zinc-900 rounded-md mt-2`}
                            >
                                <span className="text-2xl block float-left">
                                    {menu.icon ? (
                                        menu.icon
                                    ) : (
                                        <MdOutlineDashboardCustomize />
                                    )}
                                </span>
                                <span
                                    className={`text-base font-medium flex-1 duration-200 ${
                                        !open && "hidden"
                                    }`}
                                >
                                    {menu.title}
                                </span>
                            </li>
                        </Link>
                    </>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
