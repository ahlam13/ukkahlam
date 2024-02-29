import { MdOutlineClose } from "react-icons/md";
import React from "react";
import CardBook from "./CardBook";

const SearchResultModal = ({ results, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute bg-neutral-400 p-5 max-w-fit w-full  rounded z-50">
                <button onClick={onClose} className="mb-3 text-red-600">
                    <MdOutlineClose className="text-4xl" />
                </button>
                <div className="flex justify-center items-center gap-5">
                    {results.map((result) => (
                        <div key={result.id} className="">
                            <CardBook
                                imgSrc={`/storage/${result.cover}`}
                                title={result.judul}
                                writer={result.penulis}
                                id={result.id}
                                book={result}
                                fill={"white"}
                                pinjam={result}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchResultModal;
