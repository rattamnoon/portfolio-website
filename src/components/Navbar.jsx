import React, { useState } from "react";
import { FaBars, FaTimes, FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsFillPersonLinesFill } from "react-icons/bs";
import Logo from "../assets/logo.png";
import { Link } from "react-scroll";

const social = [
  {
    label: "Linkedin",
    color: "bg-blue-600",
    icon: <FaLinkedin size={30} />,
    linkUrl: "/",
  },
  {
    label: "GitHub",
    color: "bg-[#333333]",
    icon: <FaGithub size={30} />,
    linkUrl: "https://github.com/rattamnoon",
  },
  {
    label: "Email",
    color: "bg-[#6fc2b0]",
    icon: <HiOutlineMail size={30} />,
    linkUrl: "mailto:rattamnoon.kir@gmail.com",
  },
  {
    label: "Resume",
    color: "bg-[#565f69]",
    icon: <BsFillPersonLinesFill size={30} />,
    linkUrl: "/",
  },
];

const page = [
  { label: "Home", to: "home" },
  { label: "About", to: "about" },
  { label: "Skills", to: "skills" },
  { label: "Work", to: "work" },
  { label: "Contact", to: "contact" },
];

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div className="fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#0a192f] text-gray-300">
      <div>
        <img src={Logo} alt="Logo" style={{ width: "50px" }} />
      </div>

      <ul className="hidden md:flex ">
        {page.map(({ label, to }) => (
          <li>
            <Link to={to} smooth={true} duration={500}>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div onClick={handleClick} className="md:hidden z-10">
        {!nav ? <FaBars /> : <FaTimes />}
      </div>

      <ul
        className={
          !nav
            ? "hidden"
            : "absolute top-0 left-0 w-full h-screen bg-[#0a192f] flex flex-col justify-center items-center"
        }
      >
        {page.map(({ label, to }) => (
          <li className="py-6 text-4xl">
            <Link onClick={handleClick} to={to} smooth={true} duration={500}>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden lg:flex fixed flex-col top-[35%] left-0">
        <ul>
          {social.map((fields) => (
            <li
              className={`w-[160px] h-[60px] flex justify-center items-center ml-[-100px] hover:ml-[-10px] duration-300 ${fields.color}`}
            >
              <a
                className="flex justify-between items-center w-full text-gray-300"
                href={fields.linkUrl}
              >
                {fields.label} {fields.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;