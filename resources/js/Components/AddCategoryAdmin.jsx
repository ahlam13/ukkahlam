import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { useForm } from "@inertiajs/react";

const AddCategory = ({ status }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        nama: "",
    });
    const [openModal, setOpenModal] = useState(false);
    const handleSuccess = () => {
        alert("Kategori berhasil ditambahkan.");
    };

    function onCloseModal() {
        setOpenModal(false);
    }
    const submit = (e) => {
        e.preventDefault();

        post(route("addcategoryAdmin"), {
            onSuccess: () => {
                onCloseModal();
                reset();
            },
        });
    };

    return (
        <>
            <Button onClick={() => setOpenModal(true)} className="bg-nav">
                Tambah Kategori
            </Button>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                            Tambah Kategori
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
        </>
    );
};

export default AddCategory;
