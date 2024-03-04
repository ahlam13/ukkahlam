import React, { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import { Inertia } from "@inertiajs/inertia";
import TextInput from "@/Components/TextInput";
import Sidebar from "@/Components/Sidebar";
import { useForm } from "@inertiajs/react";
import axios from "axios";

const AddBookAdmin = ({ categories }) => {
    const { data, setData, post } = useForm({
        judul: "",
        cover: null,
        penulis: "",
        penerbit: "",
        tahunTerbit: "",
        category_id: "",
        jumlahHalaman: "",
        bahasa: "",
        deskripsi: "",
        content: null,
    });

    const [selectedCategory, setSelectedCategory] = useState("");

    const handleSelect = (categoryId) => {
        setSelectedCategory(categoryId);
        setData("category_id", categoryId);
        console.log(categoryId);
    };
    const handleImageChange = (e) => {
        setData("cover", e.target.files[0]);
    };
    const handleContentChange = (e) => {
        setData("content", e.target.files[0]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await post("/admin-book/addbook", {
                onSuccess: () => {},
            });
        } catch (error) {
            console.error("Error creating book:", error.message);
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="p-7">
                <div className="w-[1300px] flex justify-between">
                    <p className="text-2xl font-bold pt-3">Tambah Buku</p>
                </div>
                <form
                    className="mt-7 ms-9 gap-5 flex justify-between flex-wrap w-[1024px]"
                    onSubmit={handleSubmit}
                    method="POST"
                >
                    <div>
                        <InputLabel htmlFor="judul" value="Judul Buku" />

                        <input
                            id="judul"
                            name="judul"
                            className="mt-1 w-[500px] border-gray-300 rounded-md shadow-sm"
                            value={data.judul}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="cover" value="Cover" />

                        <input
                            id="cover"
                            name="cover"
                            className="mt-1 border-2 w-[500px] border-gray-300 rounded-md shadow-sm"
                            type="file"
                            onChange={handleImageChange}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="penulis" value="Penulis" />

                        <input
                            id="penulis"
                            name="penulis"
                            className="mt-1 w-[500px] border-gray-300 rounded-md shadow-sm"
                            value={data.penulis}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <InputLabel htmlFor="penerbit" value="Penerbit" />

                        <input
                            id="penerbit"
                            name="penerbit"
                            className="mt-1 w-[500px] border-gray-300 rounded-md shadow-sm"
                            value={data.penerbit}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <InputLabel
                            htmlFor="tahunTerbit"
                            value="Tahun Terbit"
                        />

                        <input
                            id="tahunTerbit"
                            name="tahunTerbit"
                            className="mt-1 w-[500px] border-gray-300 rounded-md shadow-sm"
                            value={data.tahunTerbit}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <div className="flex justify-center">
                            <div className="w-[500px]">
                                <h4 className="text-sm font-bold text-black pb-[5px]">
                                    Kategori
                                </h4>
                                <select
                                    id="category_id"
                                    name="category_id"
                                    className="w-[500px] border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text"
                                    onChange={(e) =>
                                        handleSelect(e.target.value)
                                    }
                                >
                                    <option value={""}>Kategori</option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.nama}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="jumlahHalaman"
                            value="Jumlah Halaman"
                        />

                        <input
                            id="jumlahHalaman"
                            name="jumlahHalaman"
                            className="mt-1 w-[500px] border-gray-300 rounded-md shadow-sm"
                            value={data.jumlahHalaman}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="bahasa" value="Bahasa" />

                        <input
                            id="bahasa"
                            name="bahasa"
                            className="mt-1 w-[500px] border-gray-300 rounded-md shadow-sm"
                            value={data.bahasa}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="content" value="Content" />

                        <input
                            id="content"
                            name="content"
                            className="mt-1 border-2 w-[500px] border-gray-300 rounded-md shadow-sm"
                            type="file"
                            onChange={handleContentChange}
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="deskripsi"
                            value="Deskripsi Buku"
                        />

                        <textarea
                            id="deskripsi"
                            name="deskripsi"
                            className="mt-1 w-[1024px] h-[200px] border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            type="text"
                            value={data.deskripsi}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="ms-[895px]">
                        <button
                            className="bg-nav text-white w-32 h-9 rounded-md"
                            type="submit"
                        >
                            Tambah Buku
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBookAdmin;
