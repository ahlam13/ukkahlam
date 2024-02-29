import React, { useState } from "react";
import SidebarAdmin from "@/Components/SidebarAdmin";
import { Link } from "@inertiajs/react";
import { FiLogOut } from "react-icons/fi";
import { TextInput, Table, Modal } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import ViewUSer from "@/Pages/Petugas/ViewUser";
import BlockUserModal from "@/Components/BlockUserModal";
import { IoEyeOutline } from "react-icons/io5";
import UserLog from "@/Components/UserLog";

const UserAdmin = ({ users }) => {
    let i = 0;

    return (
        <div className="flex">
            <SidebarAdmin />
            <div className="p-7">
                <div className="w-[1300px] flex justify-between">
                    <p className="text-2xl font-semibold pt-5">
                        Selamat Datang, Cai Lun
                    </p>
                    <Link method="POST" href={route("logout")}>
                        <FiLogOut className="w-12 h-12 pt-5 text-red-700" />
                    </Link>
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
                    <Link
                        className="bg-red-600 text-white w-32 h-9 rounded-md flex items-center justify-center"
                        href={route("petugas-listblock")}
                    >
                        Daftar Blokir
                    </Link>
                </div>
                {/* <UserLog /> */}
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>No.</Table.HeadCell>
                            <Table.HeadCell>Nama</Table.HeadCell>
                            <Table.HeadCell>Username</Table.HeadCell>
                            <Table.HeadCell>Aksi</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {users.map((user) => (
                                <Table.Row
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    key={user.id}
                                >
                                    <Table.Cell className="">{++i}</Table.Cell>
                                    <Table.Cell>{user.nama}</Table.Cell>
                                    <Table.Cell>{user.username}</Table.Cell>
                                    <Table.Cell className="flex gap-3">
                                        <ViewUSer />
                                        {/* <Link
                                            onClick={() => setOpenModal(true)}
                                            className=""
                                            href={route("petugas-viewuser")}
                                        >
                                            <IoEyeOutline className="text-3xl text-black hover:text-white hover:bg-zinc-400 rounded-md" />
                                        </Link> */}
                                        <BlockUserModal />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default UserAdmin;
