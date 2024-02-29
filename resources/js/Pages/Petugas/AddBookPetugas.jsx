import React, { useState } from "react";
import InputLabel from "@/Components/InputLabel";
import { Inertia } from "@inertiajs/inertia";
// import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Sidebar from "@/Components/Sidebar";
import DropdownCategory from "./DropdownCategory";
import { useForm } from "@inertiajs/react";
import axios from "axios";

const AddBookPetugas = () => {
    const { data, setData, post } = useForm({
        judul: "",
        cover: null,
        penulis: "",
        penerbit: "",
        tahunTerbit: "",
        kategori: "",
        jumlahHalaman: "",
        bahasa: "",
        deskripsi: "",
    });

    const handleImageChange = (e) => {
        setData("cover", e.target.files[0]);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await post("/petugas-book/addbook", {
                onSuccess: () => {
                },
            });
        } catch (error) {
            // Handle errors
            console.error("Error creating book:", error.message);
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="p-7">
                <div className="w-[1300px] flex justify-between">
                    <p className="text-2xl font-bold pt-5">Tambah Buku</p>
                </div>
                <form
                    className="mt-14 ms-9 gap-5 flex justify-between flex-wrap w-[1024px]"
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
                        <InputLabel htmlFor="cover" value="cover" />

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
                        <InputLabel htmlFor="kategori" value="kategori" />

                        <input
                            id="kategori"
                            name="kategori"
                            className="mt-1 w-[500px] border-gray-300 rounded-md shadow-sm"
                            value={data.kategori}
                            onChange={handleChange}
                        />
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
                    {/* <DropdownCategory /> */}
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

export default AddBookPetugas;
