import Sidebar from "@/Components/Sidebar";
import { Link } from "@inertiajs/react";
import { useEffect } from "react";
import { FiLogOut, FiBook, FiUsers } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import RentLog from "@/Components/RentLog";
import { Table } from "flowbite-react";

const PrintPeminjaman = ({ auth, peminjaman }) => {
    useEffect(() => {
        const handleAfterPrint = () => {
            window.removeEventListener("afterprint", handleAfterPrint);

            if (!document.hidden) {
                window.close();
            }
        };

        window.addEventListener("afterprint", handleAfterPrint);
        window.print();
    }, []);
    let i = 0;
    return (
        <div className="w-screen print-visible">
            <div className="p-7">
                <p className="text-xl pt-5 font-medium">Log Peminjaman</p>

                <div className="pt-3">
                    <div className="overflow-x-auto">
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell>No.</Table.HeadCell>
                                <Table.HeadCell>User</Table.HeadCell>
                                <Table.HeadCell>Judul Buku</Table.HeadCell>
                                <Table.HeadCell>Tgl Dipinjam</Table.HeadCell>
                                <Table.HeadCell>
                                    Tgl Dikembalikan
                                </Table.HeadCell>
                                <Table.HeadCell>Status</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {peminjaman.map((pinjam) => (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="font-medium text-gray-900 dark:text-white">
                                            {++i}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {pinjam.user.nama}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {pinjam.book.judul}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {pinjam.tanggalPeminjaman}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {pinjam.tanggalPengembalian}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {pinjam.statusPeminjaman}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrintPeminjaman;
