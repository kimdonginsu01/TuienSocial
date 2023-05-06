import React from "react";

function Image({ src, alt, className, ...props }) {
  if (!src) src = "user.jpg";
  return (
    <img src={"/upload/" + src} alt={alt} className={className} {...props} />
  );
}

export default Image;
