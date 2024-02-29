import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { FiLogOut, FiUser, FiBookmark } from "react-icons/fi";
import { Dropdown } from "flowbite-react";
import { CgProfile } from "react-icons/cg";
// import Dropdown from "@/Components/Dropdown";
import DropDownNav from "@/Components/DropDownNav";
import NavLink from "@/Components/NavLink";
import SearchBar from "@/Components/SearchBar";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";

export default function Authenticated({ user, header, children, searchBar }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-nav border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/dashboard">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>
                        </div>

                        <div className="flex justify-center items-center">
                            {/* <SearchBar className="" /> */}{searchBar}
                        </div>

                        <div className="justify-center items-center gap-x-5 hidden md:flex">
                            <Link
                                href={route("bookmark")}
                                className="w-10 h-10 flex justify-center items-center rounded-md border-2 border-black bg-white"
                            >
                                <FiBookmark className="w-7 h-7 fill-markBook" />
                            </Link>
                            <Link
                                href={route("profile.edit")}
                                className="w-11 h-11 flex justify-center items-center rounded-full border-2 border-black bg-white"
                            >
                                <FiUser className="w-6 h-6" />
                            </Link>
                            <Link
                                method="POST"
                                href={route("logout")}
                                className="w-10 h-10 flex justify-center items-center rounded-md border-2 border-black bg-white"
                            >
                                <FiLogOut className="w-6 h-6" />
                            </Link>
                        </div>
                        <div className="md:hidden">
                            <DropDownNav className="" />
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") + " "
                    }
                ></div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
