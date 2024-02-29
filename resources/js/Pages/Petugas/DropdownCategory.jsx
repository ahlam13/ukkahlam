import React, { useEffect, useState } from "react";

const DropdownCategory = () => {
    const [value, setValue] = useState("");
    const categories = [
        { name: "Novel", value: "Novel" },
        { name: "Fisika", value: "Fisika" },
        { name: "Sejarah", value: "Sejarah" },
        { name: "Psikologi", value: "Psikologi" },
    ];

    const handleSelect = () => {
        setValue(target.value);
    };
    return (
        <div className="flex justify-center">
            <div className="w-[500px]">
                <h4 className="text-sm font-bold text-black pb-[5px]">
                    Kategori
                </h4>
                <select
                    className="w-[500px] border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text"
                    onChange={handleSelect}
                >
                    {categories.map((category) => (
                        <option value={category.value}>{category.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default DropdownCategory;
