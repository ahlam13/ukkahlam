import { Table } from "flowbite-react";

const RentLog = ({
    namaUser,
    judulBuku,
    tglDipinjam,
    tglDikembalikan,
    statusPeminjaman,
}) => {
    let i = 0;
    return (
        <div className="overflow-x-auto">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>No.</Table.HeadCell>
                    <Table.HeadCell>User</Table.HeadCell>
                    <Table.HeadCell>Judul Buku</Table.HeadCell>
                    <Table.HeadCell>Tgl Dipinjam</Table.HeadCell>
                    <Table.HeadCell>Tgl Dikembalikan</Table.HeadCell>
                    <Table.HeadCell>Status</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {++i}
                        </Table.Cell>
                        <Table.Cell>{namaUser}</Table.Cell>
                        <Table.Cell>{judulBuku}</Table.Cell>
                        <Table.Cell>{tglDipinjam}</Table.Cell>
                        <Table.Cell>{tglDikembalikan}</Table.Cell>
                        <Table.Cell>{statusPeminjaman}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
};

export default RentLog;
