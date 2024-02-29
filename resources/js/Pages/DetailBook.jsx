import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { FiStar, FiBookmark, FiUser } from "react-icons/fi";
import { IoMdSend } from "react-icons/io";
import PrimaryButton from "@/Components/PrimaryButton";
import CommentColumn from "@/Components/CommentColumn";

export default function DetailBook({
    auth,
    books,
    reviews,
    peminjaman: peminjamanProp,
}) {
    const [isPressed, setIsPressed] = useState(false);
    const [rating, setRating] = useState(0);
    const [ulasan, setUlasan] = useState("");
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [isDownloadCompleted, setIsDownloadCompleted] = useState(
        localStorage.getItem("isDownloadCompleted") === "true"
    );
    const [formAktif, setFormAktif] = useState(false);
    const [keyCounter, setKeyCounter] = useState(0);
    const [peminjaman, setPeminjaman] = useState(peminjamanProp); // Gantilah peminjamanProp dengan nilai default yang sesuai jika diperlukan
    const [isBookBorrowedLocal, setIsBookBorrowedLocal] = useState(
        peminjamanProp && peminjamanProp.statusPeminjaman === "Dipinjam"
    );

    const handlePress = () => {
        setIsPressed(!isPressed);
    };
    console.log(peminjaman);

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
        if (formAktif && !selectedRating) {
            setFormAktif(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const ratingToSend = rating || 0;

        Inertia.post(route("ulasan.store", books.id), {
            ulasan,
            rating: ratingToSend,
        });
    };
    const handleFormFocus = () => {
        setFormAktif(true);
    };
    const handlePinjamClick = () => {
        Inertia.post(
            route("peminjaman.store", books.id),
            {},
            {
                headers: {
                    "X-CSRF-Token": document.querySelector(
                        'meta[name="csrf-token"]'
                    ).content,
                },
                onSuccess: () => {
                    setIsBookBorrowedLocal(true); // Perbarui status peminjaman lokal
                },
            }
        );
    };
    const handleUnduhClick = () => {
        setDownloadProgress(0);
        const interval = setInterval(() => {
            setDownloadProgress((prevProgress) => {
                const newProgress = prevProgress + 10;
                if (newProgress >= 100) {
                    clearInterval(interval);
                    setIsDownloadCompleted(true);
                    localStorage.setItem("isDownloadCompleted", "true");
                }
                return newProgress;
            });
        }, 500);
    };

    const handleKembalikanClick = () => {
        setIsBookBorrowedLocal(false);
        localStorage.setItem("isDownloadCompleted", "false");
        Inertia.put(
            route("peminjaman.kembalikan", { id: peminjaman.id }),
            null,
            {
                onSuccess: () => {
                    Inertia.visit(route("book.get-data", { id: books.id }));
                },
                replace: true,
            }
        );
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            key={peminjaman ? peminjaman.id : `default-${keyCounter}`}
        >
            <div className="py-12 flex flex-wrap gap-20">
                <div className="lg:ms-20 lg:w-[420px]">
                    <img
                        src={`/storage/${books.cover}`}
                        className="lg:w-[420px] lg:h-[550px] rounded-lg"
                    ></img>
                    <div className="mt-5 flex">
                        <FiStar fill="yellow" size={30} />
                        <FiStar fill="yellow" size={30} />
                        <FiStar fill="yellow" size={30} />
                        <FiStar fill="yellow" size={30} />
                        <FiStar size={30} />
                        <p className="text-2xl ms-5">4.0</p>
                    </div>
                    <div className="mt-4 flex justify-between">
                        {isBookBorrowedLocal ? (
                            <div>
                                {isDownloadCompleted ? (
                                    <PrimaryButton
                                        className="w-[420px] h-9 bg-green-500 text-white shadow-lg hover:text-white mt-3"
                                        onClick={handleKembalikanClick}
                                    >
                                        Baca
                                    </PrimaryButton>
                                ) : (
                                    <PrimaryButton
                                        className="w-[420px] h-9 bg-blue-700 text-white"
                                        onClick={handleUnduhClick}
                                    >
                                        {downloadProgress === 0
                                            ? "Unduh"
                                            : `Unduh ${downloadProgress}%`}
                                    </PrimaryButton>
                                )}

                                <PrimaryButton
                                    className="w-[420px] h-9 bg-white text-blue-700 shadow-lg hover:text-white mt-3"
                                    onClick={handleKembalikanClick}
                                >
                                    Kembalikan
                                </PrimaryButton>
                            </div>
                        ) : (
                            <PrimaryButton
                                className="w-[420px] h-9 bg-blue-700 text-white"
                                onClick={handlePinjamClick}
                            >
                                Pinjam
                            </PrimaryButton>
                        )}
                    </div>
                    <div className="mt-4 flex justify-between flex-wrap text-base">
                        <div className="flex flex-col gap-3">
                            <div>
                                <p className="font-black">Penerbit</p>
                                <p>{books.penerbit}</p>
                            </div>
                            <div>
                                <p className="font-black">Tahun Terbit</p>
                                <p>{books.tahunTerbit}</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div>
                                <p className="font-black">Jumlah Halaman</p>
                                <p>{books.jumlahHalaman}</p>
                            </div>
                            <div className="">
                                <p className="font-black">Bahasa</p>
                                <p>{books.bahasa}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-4xl font-black">{books.judul}</p>
                    <p className="text-2xl font-black mt-2 text-gray-500">
                        {books.penulis}
                    </p>
                    <p className="text-lg font-black mt-3 text-gray-500 w-[950px]">
                        {books.deskripsi}
                    </p>
                    <p className="text-2xl font-black mt-5">Ulasan</p>
                    <div className="flex">
                        <div className="w-11 h-11 flex justify-center items-center rounded-full border-2 border-black bg-white mt-5">
                            <FiUser className="w-6 h-6" />
                        </div>

                        <form onSubmit={handleSubmit} onFocus={handleFormFocus}>
                            <input
                                type="text"
                                value={ulasan}
                                onChange={(e) => setUlasan(e.target.value)}
                                className="border-b-black outline-none mt-[18px] h-8 bg-transparent border-t-0 border-l-0 border-r-0 ms-4 w-[900px] focus:ring-0"
                                placeholder="Tambahkan Ulasan Anda"
                            ></input>
                            <button type="submit">
                                <IoMdSend />
                            </button>
                            {formAktif && (
                                <div className="flex mt-4 ms-4">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <FiStar
                                            key={index}
                                            onClick={() =>
                                                handleStarClick(index + 1)
                                            }
                                            size={17}
                                            fill={
                                                index < rating
                                                    ? "yellow"
                                                    : "white"
                                            }
                                            className="cursor-pointer"
                                        />
                                    ))}
                                </div>
                            )}
                        </form>
                    </div>
                    {reviews.map((ul) => (
                        <CommentColumn
                            nama={ul.user.nama}
                            ulasan={ul.ulasan}
                            id={ul.id}
                            rating={Array.from(
                                { length: ul.rating },
                                (_, index) => (
                                    <FiStar
                                        key={index}
                                        fill="yellow"
                                        size={15}
                                    />
                                )
                            ).concat(
                                Array.from(
                                    { length: 5 - ul.rating },
                                    (_, index) => (
                                        <FiStar
                                            key={index + ul.rating}
                                            size={15}
                                        />
                                    )
                                )
                            )}
                        />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
