export default function PrimaryButton({
    className = "",
    disabled,
    onClick,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                ` px-4 py-2 bg-abu border border-transparent rounded-md font-semibold text-xs uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
