import { Link } from "@inertiajs/react";
import { Table } from "flowbite-react";
import { FiEdit, FiTrash } from "react-icons/fi";
import EditCategory from "./EditCategory";
import React from "react";

const CategoryLog = ({ categories }) => {
    return (
        <div className="overflow-x-auto">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>No.</Table.HeadCell>
                    <Table.HeadCell>Nama</Table.HeadCell>
                    <Table.HeadCell>Aksi</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {categories?.map((category) => (
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="">{"01"}</Table.Cell>
                            <Table.Cell>{category.nama}</Table.Cell>
                            <Table.Cell className="flex gap-1">
                                <EditCategory />
                                <button>
                                    <FiTrash className="text-2xl text-red-400" />
                                </button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};

export default CategoryLog;
