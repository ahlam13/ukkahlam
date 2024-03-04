import React from "react";
import axios from "axios";
import Sidebar from "@/Components/Sidebar";
import { Link } from "@inertiajs/react";
import {
    FiLogOut,
    FiEdit,
    FiTrash,
    FiChevronsRight,
    FiChevronsLeft,
} from "react-icons/fi";
import { TextInput } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import { Table } from "flowbite-react";
import { Inertia } from "@inertiajs/inertia";

const BookPetugas = ({ books, startNumber }) => {
    const navigateToPage = (url) => {
        console.log(url);
        Inertia.visit(url);
    };

    const previousPageUrl = books.prev_page_url;
    const nextPageUrl = books.next_page_url;

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm(
            "Apakah Anda yakin ingin menghapus buku ini?"
        );

        if (isConfirmed) {
            try {
                await axios.delete(`/petugas-book/${id}`);

                // Jika penghapusan berhasil, sesuaikan dengan logika yang Anda butuhkan
                location.reload("/petugas-book");
            } catch (error) {
                console.error("Gagal menghapus data:", error);
            }
        }
    };
    return (
        <div className="flex">
            <Sidebar className={"fixed h-screen"} />
            <div className="p-7">
                <div className="w-[1300px] flex justify-between">
                    <p className="text-2xl font-semibold pt-5">
                        Selamat Datang, Petugas
                    </p>
                    <Link method="POST" href={route("logout")}>
                        <FiLogOut className="w-12 h-12 pt-5 text-red-700" />
                    </Link>
                </div>
                <div className="flex justify-end pt-10 pb-3">
                    <Link
                        className="bg-nav text-white w-32 h-9 rounded-md flex items-center justify-center"
                        href={route("petugas-addbook")}
                    >
                        Tambah Buku
                    </Link>
                </div>
                {/* <BookLog /> */}
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>No.</Table.HeadCell>
                            <Table.HeadCell>Sampul</Table.HeadCell>
                            <Table.HeadCell>Judul Buku</Table.HeadCell>
                            <Table.HeadCell>Penulis</Table.HeadCell>
                            <Table.HeadCell>Penerbit</Table.HeadCell>
                            <Table.HeadCell>Kategori</Table.HeadCell>
                            <Table.HeadCell>Aksi</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {books.data.map((book, index) => (
                                <Table.Row
                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    key={book.id}
                                >
                                    <Table.Cell className="">
                                        {startNumber + index}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <img
                                            src={`/storage/${book.cover}`}
                                            className="w-26 h-32 rounded-md"
                                        />
                                    </Table.Cell>
                                    <Table.Cell>{book.judul}</Table.Cell>
                                    <Table.Cell>{book.penulis}</Table.Cell>
                                    <Table.Cell>{book.penerbit}</Table.Cell>
                                    <Table.Cell>
                                        {book.category.nama}
                                    </Table.Cell>
                                    <Table.Cell className="flex pt-16 justify-around">
                                        <Link
                                            href={`petugas-book/editbook/${book.id}`}
                                        >
                                            <FiEdit className="text-2xl" />
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(book.id)
                                            }
                                        >
                                            <FiTrash className="text-2xl text-red-400" />
                                        </button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                        <div className="mt-6 flex justify-between items-center">
                            {previousPageUrl && (
                                <Link
                                    className="text-blue-500"
                                    onClick={() =>
                                        navigateToPage(previousPageUrl)
                                    }
                                >
                                    <FiChevronsLeft className="text-3xl" />
                                </Link>
                            )}

                            {nextPageUrl && (
                                <button
                                    className="text-blue-500"
                                    onClick={() => navigateToPage(nextPageUrl)}
                                >
                                    <FiChevronsRight className="text-3xl" />
                                </button>
                            )}
                        </div>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default BookPetugas;
