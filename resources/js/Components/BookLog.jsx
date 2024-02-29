import { Link } from "@inertiajs/react";
import { Table } from "flowbite-react";
import { FiEdit, FiTrash } from "react-icons/fi";

const BookLog = () => {
    return (
        <div className="overflow-x-auto">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>No.</Table.HeadCell>
                    <Table.HeadCell>Sampul</Table.HeadCell>
                    <Table.HeadCell>Judul Buku</Table.HeadCell>
                    <Table.HeadCell>Penulis</Table.HeadCell>
                    <Table.HeadCell>Kategori</Table.HeadCell>
                    <Table.HeadCell>Aksi</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="">{"01"}</Table.Cell>
                        <Table.Cell>
                            <img
                                src="/img/namakualam.png"
                                className="w-40 h-40 rounded-md"
                            />
                        </Table.Cell>
                        <Table.Cell>Namaku Alam</Table.Cell>
                        <Table.Cell>Leila S. Chudori</Table.Cell>
                        <Table.Cell>Novel</Table.Cell>
                        <Table.Cell className="flex pt-20 justify-around">
                            <Link href={route("petugas-editbook")}>
                                <FiEdit className="text-2xl" />
                            </Link>
                            <button>
                                <FiTrash className="text-2xl text-red-400" />
                            </button>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
};

export default BookLog;
