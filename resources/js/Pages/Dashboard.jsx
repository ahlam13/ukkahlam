import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CardBook from "@/Components/CardBook";
import { Head, Link } from "@inertiajs/react";
import { Carousel } from 'flowbite-react';
import DropDownCategory from "@/Components/DropDownCategory";
import SearchBar from "@/Components/SearchBar";
import { FaBookOpen } from "react-icons/fa6";

export default function Dashboard({ auth, latestBooks, randomBooks, books, category }) {
    const [filteredBooks, setFilteredBooks] = React.useState(books);
    const [showModal, setShowModal] = React.useState(false);

    const handleSearch = (searchTerm) => {
        const filtered = books.filter(
            (book) =>
                book.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.penulis.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBooks(filtered);
        return filtered;
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            searchBar={<SearchBar onSearch={handleSearch} />}
        >
            {showModal ? (
                <SearchResultModal
                    results={filteredBooks}
                    onClose={() => setShowModal(false)}
                />
            ) : (
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 pb-10">
                            <Carousel slideInterval={3000}>
                                <img src="img/bookbanner7.webp" alt="..." />
                                <img src="img/bannerbook2.jpg" alt="..." />
                                <img src="img/bookbanner3.jpg" alt="..." />
                                <img src="img/bookbanner4.jpg" alt="..." />
                                <img src="img/bookbanner5.jpg" alt="..." />
                            </Carousel>
                        </div>
                        <div className="flex items-center justify-center pb-7 gap-7">
                            {category.map((c) => (
                                <Link href={`/categorybook/${c.id}`}>
                                <div className="rounded-full justify-center items-center">
                                    <div className="flex justify-center">
                                        <FaBookOpen className="animate-bounce text-4xl" />
                                    </div>
                                    <p>{c.nama}</p>
                                </div>
                            </Link>
                            ))}
                            
                        </div>
                        <div className="bg-white flex justify-between shadow-sm sm:rounded-lg">
                            <div className="p-6 font-roboto font-regular text-lg text-gray-900">
                                Rilisan Terbaru
                            </div>
                            <div className="w-[100px] lg:w-[200px] lg:me-7 lg:mt-1 mt:3 me-6">
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center items-center gap-20 pt-9 lg:gap-36">
                            {latestBooks.map((book) => (
                                <div key={book.id} className="">
                                    <CardBook
                                        imgSrc={`/storage/${book.cover}`}
                                        title={book.judul}
                                        writer={book.penulis}
                                        id={book.id}
                                        book={book}
                                        fill={"white"}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mt-16">
                            <div className="p-6 font-roboto font-regular text-lg text-gray-900">
                                Rekomendasi Untukmu
                            </div>
                        </div>

                        <div className="ms-4 xl:ms-7 xl:mt-3 pt-10 xl:gap-40 gap-20 flex flex-wrap justify-center items-center lg:justify-start">
                            {randomBooks.map((book) => (
                                <div key={book.id} className="">
                                    <CardBook
                                        imgSrc={`/storage/${book.cover}`}
                                        title={book.judul}
                                        writer={book.penulis}
                                        id={book.id}
                                        book={book}
                                        fill={"white"}
                                        pinjam={book}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <Head title="Dashboard" />
        </AuthenticatedLayout>
    );
}
