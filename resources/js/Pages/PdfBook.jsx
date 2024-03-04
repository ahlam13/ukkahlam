import React from "react";

const PdfBook = ({ file }) => {
    const pdfUrl = `/storage/${file}`;
    console.log(pdfUrl);

    return (
        <iframe
            src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
        ></iframe>
    );
};

export default PdfBook;
