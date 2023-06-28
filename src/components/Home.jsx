import React, { useEffect, useState, useRef } from "react";
import avatarImage from "../img/cute-astronaut-cartoon-icon-illustration-free-vector-removebg-preview.png";
import { Link, useNavigate } from "react-router-dom";

import holeC from "../img/Testo_del_paragrafo-removebg-preview.png";
import holeU from "../img/Testo_del_paragrafo__1_-removebg-preview.png";

const Avatar = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const linkContainerRefs = useRef([]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { keyCode } = event;

      const LEFT_ARROW = 37;
      const UP_ARROW = 38;
      const RIGHT_ARROW = 39;
      const DOWN_ARROW = 40;

      const newPosition = { ...position };
      switch (keyCode) {
        case LEFT_ARROW:
          newPosition.x -= 10;
          break;
        case UP_ARROW:
          newPosition.y -= 10;
          break;
        case RIGHT_ARROW:
          newPosition.x += 10;
          break;
        case DOWN_ARROW:
          newPosition.y += 10;
          break;
        default:
          break;
      }

      setPosition(newPosition);

      const linkContainers = linkContainerRefs.current;
      const avatarRect = document
        .getElementById("avatar")
        .getBoundingClientRect();

      linkContainers.forEach((container, index) => {
        const containerRect = container.getBoundingClientRect();

        if (isPositionOverlap(avatarRect, containerRect)) {
          const { pathname } = container;

          if (pathname === "/contact") {
            navigate("/contact");
          } else if (pathname === "/unknow") {
            navigate("/unknow");
          }
        }
      });
    };

    // Add event listener for keydown events
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [position, navigate]);

  const { x, y } = position;

  const isPositionOverlap = (rect1, rect2) => {
    return !(
      rect1.right < rect2.left ||
      rect1.left > rect2.right ||
      rect1.bottom < rect2.top ||
      rect1.top > rect2.bottom
    );
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const avatarWidth = 100;
      const avatarHeight = 100;

      const initialX = (screenWidth - avatarWidth) / 2;
      const initialY = (screenHeight - avatarHeight) / 2;

      setPosition({ x: initialX, y: initialY });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="home">
      <div
        id="avatar"
        style={{
          position: "absolute",
          left: x,
          top: y,
        }}>
        <img
          src={avatarImage}
          alt="Avatar"
          style={{ width: "100px", height: "100px" }}
        />
      </div>
      <section id="navbar">
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "37vh",
          }}>
          <Link
            to="/contact"
            className="link-container"
            ref={(el) => (linkContainerRefs.current[0] = el)}>
            <img className="hole" src={holeC} alt="" />
          </Link>
          <Link
            to="/unknow"
            className="link-container"
            ref={(el) => (linkContainerRefs.current[1] = el)}>
            <img className="hole" src={holeU} alt="" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Avatar;
