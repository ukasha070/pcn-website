import React from "react";
import { Link } from "react-router-dom";

import Container from "./Container";
import { cn } from "@/lib/utils";

const Header: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Container className={cn(`sticky top-0 z-50 p-2 bg-white`, className)}>
      <nav className="max-w-full w-full overflow-x-auto">
        <ul className="flex gap-5">
          <li className="block w-fit">
            <Link to={"/blogs/"} className="py-3 px-5 block border rounded-3xl">
              <h5 className="text-nowrap">Blogs</h5>
            </Link>
          </li>

          <li className="block w-fit">
            <Link
              to={"/events/"}
              className="py-3 px-5 block border rounded-3xl"
            >
              <h5 className="text-nowrap">Events</h5>
            </Link>
          </li>
        </ul>
      </nav>
    </Container>
  );
};

export default Header;
