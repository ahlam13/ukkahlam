import React, { useState } from "react";
import SidebarAdmin from "@/Components/SidebarAdmin";
import { Link } from "@inertiajs/react";
import { FiLogOut, FiTrash } from "react-icons/fi";
import { TextInput, Table, Modal } from "flowbite-react";
import { IoEyeOutline } from "react-icons/io5";

const UserAdmin = ({ users }) => {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const handleViewUser = async (userId) => {
        try {
            const response = await axios.get(`/get-user/${userId}`);
            setUserData(response.data);
            setOpenModal(true);
        } catch (error) {
            console.error("Gagal mengambil data pengguna:", error);
        }
    };
    const handleDelete = async (id) => {
        const isConfirmed = window.confirm(
            "Apakah Anda yakin ingin menghapus User ini?"
        );

        if (isConfirmed) {
            try {
                await axios.delete(`/admin-user/${id}`);
                location.reload("/admin-user");
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
                <div className="overflow-x-auto pt-20">
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
                                                handleViewUser(user.id)
                                            }
                                        >
                                            <IoEyeOutline className="text-3xl text-black hover:text-white hover:bg-zinc-400 rounded-md" />
                                        </button>
                                        {userData && (
                                            <Modal
                                                show={openModal}
                                                onClose={() =>
                                                    setOpenModal(false)
                                                }
                                            >
                                                <Modal.Header>
                                                    User Profile
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <ul className="">
                                                        <li className="flex py-1">
                                                            <span className="text-base font-medium w-48 ">
                                                                Nama
                                                            </span>
                                                            <span className="text-base w-5">
                                                                :
                                                            </span>
                                                            <span className="text-base">
                                                                {userData.nama}
                                                            </span>
                                                        </li>
                                                        <li className="flex py-1">
                                                            <span className="text-base font-medium w-48 ">
                                                                Username
                                                            </span>
                                                            <span className="text-base w-5">
                                                                :
                                                            </span>
                                                            <span className="text-base">
                                                                {
                                                                    userData.username
                                                                }
                                                            </span>
                                                        </li>
                                                        <li className="flex py-1">
                                                            <span className="text-base font-medium w-48 ">
                                                                Alamat
                                                            </span>
                                                            <span className="text-base w-5">
                                                                :
                                                            </span>
                                                            <span className="text-base">
                                                                {
                                                                    userData.alamat
                                                                }
                                                            </span>
                                                        </li>
                                                        <li className="flex py-1">
                                                            <span className="text-base font-medium w-48 ">
                                                                Email
                                                            </span>
                                                            <span className="text-base w-5">
                                                                :
                                                            </span>
                                                            <span className="text-base">
                                                                {userData.email}
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </Modal.Body>
                                            </Modal>
                                        )}
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

export default UserAdmin;
