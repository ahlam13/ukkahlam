import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { FiEdit } from "react-icons/fi";

const EditCategoryAdmin = ({ status, category }) => {
    const { data, setData, put, reset } = useForm({
        nama: "",
    });
    console.log(category);
    const [openModal, setOpenModal] = useState(false);
    const handleSuccess = () => {
        alert("Kategori berhasil ditambahkan.");
    };

    function onCloseModal() {
        setOpenModal(false);
    }
    const submit = (e) => {
        e.preventDefault();

        post(route("addcategory"), {
            onSuccess: () => {
                onCloseModal();
                reset();
            },
        });
    };

    return (
        <div>
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
                        {status && (
                            <div className="alert alert-success">{status}</div>
                        )}
                        <form onSubmit={submit}>
                            <div>
                                <div className="mb-2 block">
                                    <Label
                                        htmlFor="nama"
                                        value="Nama Kategori"
                                    />
                                </div>
                                <TextInput
                                    id="nama"
                                    name="nama"
                                    value={data.nama}
                                    onChange={(e) =>
                                        setData("nama", e.target.value)
                                    }
                                    type="text"
                                    required
                                />
                            </div>

                            <div className="w-full pt-5">
                                <Button
                                    className="bg-nav"
                                    type="submit"
                                    onClick={handleSuccess}
                                >
                                    Tambah
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default EditCategoryAdmin;
