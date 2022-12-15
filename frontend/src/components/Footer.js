import React, { Component } from "react";
import { SocialIcon } from "react-social-icons";

export class Footer extends Component {
  render() {
    return (
      <div class="footer_links">
        <SocialIcon
          url="https://twitter.com/"
          network="twitter"
          fgColor="#fff"
        />
        <SocialIcon url="https://discord.gg/" fgColor="#fff" />
      </div>
    );
  }
}

export default Footer;
