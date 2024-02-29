import { Dropdown } from "flowbite-react";
import { Link } from "@inertiajs/react";

const DropDownNav = () => {
    return (
        <Dropdown dismissOnClick={false}>
            <Dropdown.Item>
                <Link href={route("bookmark")}>Bookmark</Link>
            </Dropdown.Item>
            <Dropdown.Item>
                <Link href={route("profile.edit")}>Profile</Link>
            </Dropdown.Item>
            <Dropdown.Item>
                <Link method="POST" href={route("logout")}>
                    Log out
                </Link>
            </Dropdown.Item>
        </Dropdown>
    );
};

export default DropDownNav;
