import React, { useEffect, useRef } from "react";

const OutSideTouchCloseComponent = ({ children, toggleVisibility, style, showSideNavbar }) => {
  const refForReference = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        refForReference.current &&
        !refForReference.current.contains(event.target) &&
        showSideNavbar
      ) {
        toggleVisibility();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSideNavbar]);

  return (
    <div ref={refForReference} className={style}>
      {children}
    </div>
  );
};

export default OutSideTouchCloseComponent;
