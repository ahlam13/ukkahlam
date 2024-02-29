import React from "react";
import axios from "axios";
import { useState } from "react";
// import CategoryLog from "@/Components/CategoryLog";
import Sidebar from "@/Components/Sidebar";
import { Link } from "@inertiajs/react";
import { FiLogOut, FiTrash } from "react-icons/fi";
import AddCategory from "@/Components/AddCategory";
import { Table } from "flowbite-react";
import EditCategory from "@/Components/EditCategory";

const CategoryPetugas = ({ categories }) => {
    const handleDelete = async (id) => {
        const isConfirmed = window.confirm(
            "Apakah Anda yakin ingin menghapus kategori ini?"
        );

        if (isConfirmed) {
            try {
                await axios.delete(`/petugas-category/${id}`);
                location.reload("/petugas-category")
            } catch (error) {
                console.error("Gagal menghapus data:", error);
            }
        }
    };
    let i = 1;
    return (
        <div className="flex">
            <Sidebar />
            <div className="p-7">
                <div className="w-[1300px] flex justify-between">
                    <p className="text-2xl font-semibold pt-5">
                        Selamat Datang, Cai Lun
                    </p>
                    <Link method="POST" href={route("logout")}>
                        <FiLogOut className="w-12 h-12 pt-5 text-red-700" />
                    </Link>
                </div>
                <div className="flex justify-end pt-20 pb-5">
                    <AddCategory />
                </div>
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>No.</Table.HeadCell>
                            <Table.HeadCell>Nama</Table.HeadCell>
                            <Table.HeadCell>Aksi</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {categories?.map((category) => (
                                <Table.Row
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    key={category.id}
                                >
                                    <Table.Cell className="">{i++}</Table.Cell>
                                    <Table.Cell>{category.nama}</Table.Cell>
                                    <Table.Cell className="flex gap-1">
                                        <EditCategory />
                                        <button
                                            onClick={() =>
                                                handleDelete(category.id)
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

export default CategoryPetugas;
