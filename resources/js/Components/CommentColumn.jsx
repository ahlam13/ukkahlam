import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { FiUser, FiTrash } from "react-icons/fi";

const CommentColumn = ({ nama, ulasan, rating, id }) => {
    const handleDelete = async (id) => {
        const isConfirmed = window.confirm(
            "Apakah Anda yakin ingin menghapus komentar ini?"
        );

        if (isConfirmed) {
            try {
                await axios.delete(`/ulasan/${id}`);
                location.reload("/detailbook/{id]");
            } catch (error) {
                console.error("Gagal menghapus komentar:", error);
            }
        }
    };
    return (
        <div className="flex flex-wrap py-2">
            <div className="w-11 h-11 flex justify-center items-center rounded-full border-2 border-black bg-white mt-5">
                <FiUser className="w-6 h-6" />
            </div>

            <div className="mt-4 ms-3 block w-13">
                <div className="flex justify-between">
                    <p className="font-bold text-lg">{nama}</p>
                    <button onClick={() => handleDelete(id)}>
                        <FiTrash className="text-red-600" />
                    </button>
                </div>
                <div className="flex">{rating}</div>
                <p className="pt-2 w-[800px]">{ulasan}</p>
            </div>
        </div>
    );
};

export default CommentColumn;
