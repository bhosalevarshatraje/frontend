import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faHome, faUsers } from '@fortawesome/free-solid-svg-icons';

export const SidebarData = [
    {
        title: "Home",
        icon: <FontAwesomeIcon icon={faHome} />,
        link: "/welcome"
    },

    {
        title: "View Bug Details",
        icon: <FontAwesomeIcon icon={faBug} />,
        link: "/adminBug"
    },

    {
        title: "View Staff Details",
        icon: <FontAwesomeIcon icon={faUsers} />,
        link: "/viewStaff" 
    }
]