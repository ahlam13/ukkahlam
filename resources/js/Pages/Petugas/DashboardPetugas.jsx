import Sidebar from "@/Components/Sidebar";
import { Link } from "@inertiajs/react";
import { FiLogOut, FiBook, FiUsers } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import RentLog from "@/Components/RentLog";
import { Table } from "flowbite-react";

const DashboardPetugas = ({
    totalCategory,
    totalUser,
    totalBook,
    petugas,
    peminjaman,
}) => {
    let i = 0;
    return (
        <div className="flex">
            <Sidebar />
            <div className="p-7">
                <div className="w-[1300px] flex justify-between">
                    <p className="text-2xl font-semibold pt-5">
                        Selamat Datang, Petugas
                    </p>
                    <Link method="POST" href={route("logout")}>
                        <FiLogOut className="w-12 h-12 pt-5 text-red-700" />
                    </Link>
                </div>
                <div className="pt-16 flex justify-between">
                    <div className="w-[300px] h-[120px] rounded-xl bg-black flex items-center justify-around gap-10">
                        <FiBook className="text-white w-14 h-14" />
                        <div>
                            <p className="text-2xl text-white">Buku</p>
                            <p className="text-xl text-zinc-300 text-end">
                                {totalBook}
                            </p>
                        </div>
                    </div>
                    <div className="w-[300px] h-[120px] rounded-xl bg-black flex items-center justify-around gap-10">
                        <MdOutlineCategory className="text-white w-14 h-14" />
                        <div className="">
                            <p className="text-2xl text-white">Kategori</p>
                            <p className="text-xl text-zinc-300 text-end">
                                {totalCategory}
                            </p>
                        </div>
                    </div>
                    <div className="w-[300px] h-[120px] rounded-xl bg-black flex items-center justify-around gap-5">
                        <FiUsers className="text-white w-14 h-14" />
                        <div>
                            <p className="text-2xl text-white">Pengguna</p>
                            <p className="text-xl text-zinc-300 text-end">
                                {totalUser}
                            </p>
                        </div>
                    </div>
                </div>
                <p className="text-2xl pt-14 font-black">Log Peminjaman</p>
                <div className="flex justify-end pt-1">
                    <a
                        className="bg-blue-600 text-white w-36 h-9 rounded-md flex items-center justify-center"
                        href={route("petugas-print")}
                        target="_blank"
                    >
                        Cetak Data
                    </a>
                </div>
                <div className="">
                    <div className="pt-2">
                        <div className="overflow-x-auto">
                            <Table hoverable>
                                <Table.Head>
                                    <Table.HeadCell>No.</Table.HeadCell>
                                    <Table.HeadCell>User</Table.HeadCell>
                                    <Table.HeadCell>Judul Buku</Table.HeadCell>
                                    <Table.HeadCell>
                                        Tgl Dipinjam
                                    </Table.HeadCell>
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
        </div>
    );
};

export default DashboardPetugas;
