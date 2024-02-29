import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";

const EditCategory = () => {
    const [openModal, setOpenModal] = useState(false);
    const [email, setEmail] = useState("");

    function onCloseModal() {
        setOpenModal(false);
        setEmail("");
    }

    return (
        <>
            <button onClick={() => setOpenModal(true)} className="bg-white">
                <FiEdit className="text-2xl text-black" />
            </button>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Edit Kategori
                        </h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Nama Kategori" />
                            </div>
                            <TextInput
                                id="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                type="text"
                                required
                            />
                        </div>

                        <div className="w-full">
                            <Button className="bg-nav">Simpan</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default EditCategory;
