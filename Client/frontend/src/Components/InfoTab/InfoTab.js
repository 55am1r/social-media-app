import React from "react";
import "./InfoTab.scss";
function InfoTab() {
  return (
    <div className="info">
      <div className="links">
        <ul>
          <li>
            <a
              href="https://help.instagram.com/581066165581870/?locale=en_US"
              target={"_blank"}
              rel="noreferrer"
            >
              Terms
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/privacy/policy"
              target={"_blank"}
              rel="noreferrer"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="https://help.instagram.com/1896641480634370/"
              target={"_blank"}
              rel="noreferrer"
            >
              Cookies Policy
            </a>
          </li>
        </ul>
      </div>
      <p>© 2023 Ditto-Gram By Shaik Sameer</p>
    </div>
  );
}

export default InfoTab;
