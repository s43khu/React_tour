import React from "react";
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillApple
} from "react-icons/ai";
import { FaGooglePlay } from "react-icons/fa";
import "./foot.scss";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <div>
          <div className="footer-content">
            <h3
              style={{
                fontFamily: "Trebuchet MS",
                fontSize: "2em"
              }}
            >
              <em>Penta</em>Gon
            </h3>
            <p>PentaGon is a registered company under niceview Tech Pvt. Ltd.</p>
            <div className="sub">
              <div>
                <b>Company</b>
                <p><a href="https://github.com/s43khu">About me</a></p>
                <p>Blog</p>
              </div>
              <div>
                <b>For Info</b>
                <p>Code of conduct</p>
                <p>Community</p>
              </div>
              <div>
                <b>Tourist spot</b>
                <p>Facilities</p>
                <p>Business</p>
              </div>
              <div>
                <b>For You</b>
                <p>Privacy</p>
                <p>Security</p>
                <p>Terms</p>
              </div>
              <div>
                <b>Social links</b>
                <div>
                  <AiFillFacebook />
                  <AiFillTwitterCircle />
                  <AiFillInstagram />
                </div>
                <div>
                  <AiFillApple />
                  <FaGooglePlay />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
