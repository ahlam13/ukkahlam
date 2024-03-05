import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/react";
import CardBookPinjam from "@/Components/CardBookPinjam";
import CardBook from "@/Components/CardBook";
import { FiArrowRight, FiBookmark } from "react-icons/fi";
import SearchBar from "@/Components/SearchBar";

export default function Bookmark({ auth, bookmarks, peminjaman }) {
    const handlePress = () => {
        Inertia.post(`/bookmarks/${bookmarks.book_id}`);
        setIsPressed(!isPressed);
    };
    return (
        <AuthenticatedLayout user={auth.user} searchBar={<SearchBar />}>
            <Head title="Bookmark" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Buku Dipinjam</div>
                    </div>
                    <div className="ms-4 xl:ms-7 xl:mt-3 pt-10 xl:gap-40 gap-20 flex flex-wrap justify-center items-center lg:justify-start">
                        {peminjaman.map((pinjam) => (
                            <div key={pinjam.id}>
                                <CardBookPinjam
                                    key={pinjam.book.id}
                                    imgSrc={`/storage/${pinjam.book.cover}`}
                                    title={pinjam.book.judul}
                                    writer={pinjam.book.penulis}
                                    id={pinjam.book.id}
                                    fill={"white"}
                                    pinjam={pinjam}
                                    tglPengembalian={pinjam.tanggalPengembalian}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="max-w-7xl mt-20 mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Buku Disimpan</div>
                    </div>
                    <div className="ms-4 xl:ms-7 xl:mt-3 pt-10 xl:gap-40 gap-20 flex flex-wrap justify-center items-center lg:justify-start">
                        {bookmarks.map((bookmark) => (
                            <div key={bookmark.id}>
                                <CardBook
                                    key={bookmark.book.id}
                                    imgSrc={`/storage/${bookmark.book.cover}`}
                                    title={bookmark.book.judul}
                                    writer={bookmark.book.penulis}
                                    id={bookmark.book.id}
                                    book={bookmark}
                                    fill={"yellow"}
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
