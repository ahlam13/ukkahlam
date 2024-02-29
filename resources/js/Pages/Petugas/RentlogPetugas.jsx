import Sidebar from "@/Components/Sidebar";
import { Link } from "@inertiajs/react";
import { FiLogOut, FiBook, FiUsers } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import RentLog from "@/Components/RentLog";
import { Table } from "flowbite-react";

const RentlogPetugas = ({ auth, peminjaman }) => {
    console.log(peminjaman);
    let i = 0;
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
                <p className="text-2xl pt-20 font-black">Log Peminjaman</p>
                <div className="pt-10">
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
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
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

export default RentlogPetugas;
