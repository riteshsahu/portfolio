import Image from "next/image";
import React from "react";

function Logo() {
  return (
    <>
      <Image width={30} height={30} src={"/favicon.svg"} alt="Logo" />
      <span className="sr-only">Ritesh</span>
    </>
  );
}

export default Logo;
