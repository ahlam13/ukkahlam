import React from "react";
import { useState } from "react";
import { FiTriangle } from "react-icons/fi";

const DropDownCategory = ({ placeholder, values }) => {
    const [isDropped, setIsDropped] = useState(false);

    const handleClick = () => {
        setIsDropped(!isDropped);
    };

    return (
        <div className="flex flex-col relative z-10">
            <button
                onClick={handleClick}
                className={`${
                    isDropped
                        ? "border-b-2 rounded-b-none"
                        : "shadow-lg shadow-slate-100"
                } relative hover:bg-slate-100 border border-slate-100 flex items-center justify-between p-[20px] rounded-lg`}
            >
                <p className="hidden lg:flex lg:text-[1.15rem] text-zinc-500">{placeholder}</p>
                <FiTriangle
                    className="lg:text-zinc-500 text-black"
                    fill="#71717a"
                    size={12}
                    style={{ rotate: isDropped ? "" : "180deg" }}
                />
            </button>
            <div
                className={`${
                    isDropped ? "" : "hidden"
                } absolute top-[70px] w-full bg-white flex flex-col py-[20px] rounded-t-none rounded-b-lg border-t-0 border border-slate-100 drop-shadow-lg shadow-slate-100`}
            >
                {values.map((value) => {
                    return (
                        <button className="text-[1.15rem] lg:py-[10px] py-[7px] hover:bg-slate-100 flex justify-center items-center">
                            {value}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default DropDownCategory;
