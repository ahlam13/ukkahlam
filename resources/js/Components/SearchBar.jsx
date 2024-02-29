import { TextInput } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import React, { useState } from "react";
import SearchResultModal from "./SearchResultModal";
import { debounce } from "lodash";

export default function SearchBar({ className, onSearch }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleSearch = () => {
        const results = onSearch(searchTerm);
        setSearchResults(results);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <div>
            <form onChange={handleSearch} className="max-w-md">
                <TextInput
                    id=""
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={CiSearch}
                    placeholder="Cari Buku...."
                    className={"w-36 md:w-96 sm:w-60" + className}
                />
                {showModal && (
                    <SearchResultModal
                        results={searchResults}
                        onClose={handleCloseModal}
                    />
                )}
            </form>
        </div>
    );
}
