import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div className="rounded-full w-52 h-24 bg-nav animate-bounce mb-10 flex justify-center items-center">
            <img src="/img/logo1.png" className="h-20" />
            </div>
            <div className="w-[500px] h-[400px] sm:max-w-md  px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
