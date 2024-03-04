import React, { useState } from "react";
import SidebarAdmin from "@/Components/SidebarAdmin";
import { Link } from "@inertiajs/react";
import { FiLogOut, FiTrash } from "react-icons/fi";
import { TextInput, Table, Modal } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import ViewUSer from "@/Pages/Petugas/ViewUser";
import AddPetugasAdmin from "./AddPetugasAdmin";

const PetugasAdmin = ({ users }) => {
    const handleDelete = async (id) => {
        const isConfirmed = window.confirm(
            "Apakah Anda yakin ingin menghapus Petugas ini?"
        );

        if (isConfirmed) {
            try {
                await axios.delete(`/admin-petugas/${id}`);
                location.reload("/admin-petugas");
            } catch (error) {
                console.error("Gagal menghapus data:", error);
            }
        }
    };
    let i = 0;
    return (
        <div className="flex">
            <SidebarAdmin />
            <div className="p-7">
                <div className="w-[1300px] flex justify-between">
                    <p className="text-2xl font-semibold pt-5">
                        Selamat Datang, Admin
                    </p>
                    <Link method="POST" href={route("logout")}>
                        <FiLogOut className="w-12 h-12 pt-5 text-red-700" />
                    </Link>
                </div>
                <div className="flex justify-end pt-20 pb-5">
                    <AddPetugasAdmin />
                </div>
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
                                        <button
                                            onClick={() =>
                                                handleDelete(user.id)
                                            }
                                        >
                                            <FiTrash className="text-2xl text-red-400" />
                                        </button>
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

export default PetugasAdmin;
