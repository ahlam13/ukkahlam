import { Link } from "@inertiajs/react";
import { Table } from "flowbite-react";
import { IoBanOutline, IoEyeOutline } from "react-icons/io5";
import { BiLike } from "react-icons/bi";
import ViewUSer from "../Pages/Petugas/ViewUser";
import UnblockUser from "./UnblockUser";

const ListBlockLog = () => {
    return (
        <div className="overflow-x-auto">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>No.</Table.HeadCell>
                    <Table.HeadCell>Nama</Table.HeadCell>
                    <Table.HeadCell>Username</Table.HeadCell>
                    <Table.HeadCell>Tgl Bergabung</Table.HeadCell>
                    <Table.HeadCell>Aksi</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="">{"01"}</Table.Cell>
                        <Table.Cell>Ahlam Radith</Table.Cell>
                        <Table.Cell>Ahlam13</Table.Cell>
                        <Table.Cell>13 Juni 2023</Table.Cell>
                        <Table.Cell className="flex gap-3">
                            <ViewUSer />
                            <UnblockUser />
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
};

export default ListBlockLog;
