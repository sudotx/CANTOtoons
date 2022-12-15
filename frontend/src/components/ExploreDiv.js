import React, { useState, useEffect, useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { UserDataContext } from "./StateContext";
import { Link } from "react-router-dom";

export default function ExploreDiv({ tokenId }) {
  const [updatedMintedNFTs, setUpdatedMintedNFTs] = useState([]);
  const [tokenIdVal, setTokenIdVal] = useState(tokenId);

  const user_Data_Context = useContext(UserDataContext);
  let userData = user_Data_Context.userData;
  let userMintedNFTs = userData.userMintedNFTs;

  // useEffect(() => {
  //     window.location.reload()
  // }, [])
  useEffect(() => {
    let updatedMintedNFTs = userMintedNFTs.map((item) => {
      return parseInt(item._hex);
    });
    setUpdatedMintedNFTs(updatedMintedNFTs);
  }, [userMintedNFTs]);

  console.log("userMintedNFTs", userData.userMintedNFTs);
  console.log("updatedMintedNFTs", updatedMintedNFTs);

  // const shareTweet = () => {
  //   console.log("shareTweet");
  // };
  let handleMinus = () => {
    if (tokenIdVal > 0) {
      setTokenIdVal(Number(tokenIdVal) - 1);
    }
  };
  let handlePlus = () => {
    setTokenIdVal(Number(tokenIdVal) + 1);
  };
  return (
    <div>
      <script
        src="https://platform.twitter.com/widgets.js"
        charset="utf-8"
      ></script>
      <div className="mainDiv explore" id="mint">
        <div className="left">
          <div className="mints">#{tokenId}</div>
          <div className="title">CAnto toons NFT</div>
          <div className="sub_title">Let's just say I'm the boss 🚀</div>

          <button className="connect_button connect_button3 connect_twitter">
            <div class="button_div"></div>
          </button>
        </div>
        <div className="right">
          <div className="right_img">
            <img
              alt="NFT"
              src={`https://gateway.pinata.cloud/ipfs/bafybeihy5t7ofqoyn4byobadtl4gysf6kksbkm6dtimgzzukvbyjp5xas4/${tokenId}.png`}
            />
          </div>
        </div>
      </div>
      <div class="navigation">
        <div className="number mainDiv">
          {tokenIdVal > 1 && tokenIdVal <= 5555 && (
            <Link
              to={`/explore/${Number(tokenIdVal) - 1}`}
              className="minus pumiNav"
              onClick={handleMinus}
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="arrow"
              >
                <path
                  _ngcontent-yty-c14=""
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                ></path>
              </svg>
              &nbsp;<span>#{Number(tokenIdVal) - 1}</span>
            </Link>
          )}
          {tokenIdVal > 0 && tokenIdVal < 5555 && (
            <Link
              to={`/explore/${Number(tokenIdVal) + 1}`}
              className="plus pumiNav"
              onClick={handlePlus}
            >
              <span>#{Number(tokenIdVal) + 1}</span> &nbsp;
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="arrow"
              >
                <path
                  _ngcontent-yty-c14=""
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
