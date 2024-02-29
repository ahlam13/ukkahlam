import Sidebar from "@/Components/Sidebar";
import { Link } from "@inertiajs/react";
import { FiLogOut } from "react-icons/fi";
import { TextInput } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import UserLog from "@/Components/UserLog";
import ListBlockLog from "@/Components/ListBlockLog";

const ListBlockPetugas = ({ auth }) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="p-7">
                <div className="w-[1300px] flex justify-between">
                    <p className="text-3xl font-black pt-5">Daftar Blokir</p>
                </div>
                <div className="flex justify-between pt-20 pb-5">
                    <form className="max-w-md h-10">
                        <TextInput
                            id=""
                            type=""
                            icon={CiSearch}
                            placeholder="Cari Pengguna...."
                            className="w-80 border border-black rounded-lg"
                        />
                    </form>
                </div>
                <ListBlockLog />
            </div>
        </div>
    );
};

export default ListBlockPetugas;
