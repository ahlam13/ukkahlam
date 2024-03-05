import { Link } from "@inertiajs/react";
import { Card } from "flowbite-react";
import { FiArrowRight, FiBookmark } from "react-icons/fi";
import { Inertia } from "@inertiajs/inertia";
import { useState, useEffect } from "react";
import axios from "axios";

const CardBook = ({ imgSrc, title, writer, id, book, fill }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        axios
            .get(`/check-bookmark/${book.id}`)
            .then((response) => {
                setIsBookmarked(response.data.isBookmarked);
            })
            .catch((error) => {
                console.error("Error checking bookmark:", error);
            });
    }, [book.id]);

    const handlePress = () => {
        location.reload();
        Inertia.post(`/bookmarks/${id}`, null, {
            onSuccess: () => {
                reset();
            },
        });
    };
    return (
        <div className="w-[280px] h-[420px] hover:scale-110 duration-100 hover:transition-all bg-white rounded-lg drop-shadow-2xl relative">
            <button
                className="bg-white w-[30px] h-[30px] absolute right-3 top-2 flex justify-center items-center rounded-lg border-2 border-black"
                onClick={handlePress}
            >
                <FiBookmark
                    className="w-[20px] h-[20px]"
                    fill={isBookmarked ? "yellow" : "white" && fill}
                />
            </button>
            <img src={imgSrc} className="w-[280px] h-[350px] rounded-t-lg" />
            <div className="flex justify-between items-center">
                <div className="ms-2 mt-2">
                    <h2 className="font-roboto font-semibold text-xl">
                        {title}
                    </h2>
                    <p>{writer}</p>
                </div>
                <Link
                    className="w-8 h-8 flex justify-center items-center rounded-md border-2 border-black bg-white text-end me-2"
                    href={`/detailbook/${id}`}
                >
                    <FiArrowRight />
                </Link>
            </div>
        </div>
    );
};

export default CardBook;
