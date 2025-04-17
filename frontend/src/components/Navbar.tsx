import React from "react";
import { Link } from "react-router-dom";

import { FacebookIcon, InstagramIcon, YoutubeIcon } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Importing assets
import { logo } from "@/assets";
import Container from "@/components/Container";
import Header from "@/components/Header";

const Navbar: React.FC<{ viewNav?: boolean }> = ({ viewNav }) => {
  return (
    <Container className="mb-0 pb-0">
      <nav className="w-full text-lg flex flex-col items-start md:flex-row md:items-center justify-between py-5">
        <div className="flex items-center space-x-5 justify-between w-full md:w-fit ">
          <Link
            to={"/"}
            className="flex flex-col space-y-2 w-fit cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <img
                src={logo}
                alt="Logo"
                width={100}
                height={100}
                className="w-10 h-10"
              />
              <h3 className="font-bold text-4xl">PCN</h3>
            </div>
            <p className="text-sm italic text-neutral-500 text-nowrap">
              We Prosper Together
            </p>
          </Link>

          {/* <Link
            to={"/donate"}
            className="py-3 px-5 border-2 text-orange-500 border-accent "
          >
            <h4 className="text-orange-500">Donate</h4>
          </Link> */}
        </div>

        <div className="w-fit flex items-center mt-5 md:mt-0">
          <div className="inline-flex items-center space-x-2">
            <span>Say hello! </span>
            <h2>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                to="mailto:prosfygas.christian.network@gmail.com"
                className="bold"
              >
                <div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="cursor-pointer">
                        <span className="text-orange-500">Email Us here </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>prosfygas.christian.network@gmail.com</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </Link>
            </h2>
          </div>
        </div>
      </nav>

      <div className="flex items-center">
        <Link
          to={
            "https://www.facebook.com/people/Prosfygas-Christian-Network-Ltd/61571523386663/?rdid=5NX82wab1YA8lolp&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BfQ2Peekz%2F"
          }
          target="_blank"
          className="h-10 w-10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground duration-300"
        >
          <FacebookIcon className="h-4 w-4 stroke-none fill-current" />
        </Link>

        <Link
          to={
            "https://www.instagram.com/prosfygas_christian_network/profilecard/?igsh=YjF3YWR6MXYyb2Z1"
          }
          target="_blank"
          className="h-10 w-10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground duration-300"
        >
          <InstagramIcon className="h-4 w-4 stroke-current fill-none" />
        </Link>

        <Link
          to={"https://www.youtube.com/@prosfygas_christian_network"}
          target="_blank"
          className="h-10 w-10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground duration-300"
        >
          <YoutubeIcon className="h-5 w-5 stroke-current fill-none" />
        </Link>

        {/* <Link
          to={""}
          target="_blank"
          className="h-10 w-10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground duration-300"
        >
          <XIcon className="h-5 w-5 stroke-current fill-none" />
        </Link> */}

        <Link
          to={"https://www.tiktok.com/@prosfygaschristiannet?lang=en"}
          target="_blank"
          className="h-10 w-10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground duration-300"
        >
          <svg
            width="24"
            height="24"
            version="1.1"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill="none"
              fillRule="evenodd"
              className="h-4 w-4 stroke-none fill-current"
            >
              <g transform="translate(-720,-48)">
                <g transform="translate(720,48)">
                  <path
                    id="路径"
                    d="m14 2c1.1046 0 2 0.89543 2 2 0 1.4473 1.03 2.6618 2.3984 2.9399 1.0824 0.22001 1.7815 1.2758 1.5615 2.3583-0.22 1.0824-1.2758 1.7816-2.3583 1.5616-0.561-0.1141-1.0979-0.2952-1.6016-0.5346v5.6748c0 3.3137-2.6863 6-6 6-3.3137 0-6-2.6863-6-6 0-2.7985 1.9141-5.1449 4.5015-5.8109 1.0697-0.27528 2.1601 0.3687 2.4354 1.4384s-0.3687 2.1601-1.4384 2.4354c-0.86305 0.2221-1.4985 1.0079-1.4985 1.9371 0 1.1046 0.89543 2 2 2 1.1046 0 2-0.8954 2-2v-12c0-1.1046 0.8954-2 2-2z"
                  />
                </g>
              </g>
            </g>
          </svg>
        </Link>
      </div>

      {viewNav && (
        <div className="mt-5 sticky top-0 ">
          <Header className="border-b pl-0 md:px-0 lg:px-0 xl:px-0 2xl:px-0 ml-0 " />
        </div>
      )}
    </Container>
  );
};

export default Navbar;
