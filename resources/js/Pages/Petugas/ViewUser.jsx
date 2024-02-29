import { Link } from "@inertiajs/react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";

const ViewUSer = ({ users }) => {
    const [openModal, setOpenModal] = useState(false);
    console.log(users);
    const Menus = [
        { title: "Nama", body: "ahlam" },
        { title: "Username", body: "Ahlam13" },
        { title: "Alamat", body: "Medan" },
        { title: "Email", body: "violet@gmail.com" },
        { title: "Tgl Bergabung", body: "13 Juni 2023" },
    ];

    return (
        <>
            <Link onClick={() => setOpenModal(true)}>
                <IoEyeOutline className="text-3xl text-black hover:text-white hover:bg-zinc-400 rounded-md" />
            </Link>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>User Profile</Modal.Header>
                <Modal.Body>
                    <ul className="">
                        {Menus.map((menu, index) => (
                            <>
                                <li key={index} className="flex py-1">
                                    <span className="text-base font-medium w-48 ">
                                        {menu.title}
                                    </span>

                                    <span className="text-base w-5">:</span>

                                    <span className="text-base">
                                        {menu.body}
                                    </span>
                                </li>
                            </>
                        ))}
                    </ul>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ViewUSer;
