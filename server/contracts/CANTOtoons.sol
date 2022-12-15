// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Boss is ERC721, Ownable {
  using Strings for uint256;
  using Counters for Counters.Counter;

  Counters.Counter private supply;

  string public uriPrefix = "";
  string public uriSuffix = ".json";
  string public hiddenMetadataUri;

  uint256 public cost = 0.2 ether;
  uint256 public maxSupply = 5555;
  uint256 public maxMintAmount = 2;
  uint256 public nftPerAddressLimit = 2;

  bool public paused = false;
  bool public revealed = false;
  bool public onlyWhitelisted = false;
  address[] public whitelistedAddresses;
  mapping(address => uint256) public addressMintedBalance;


  constructor() ERC721("CANTOTOONS", "CNT") {
    setHiddenMetadataUri("ipfs://__CID__/hidden.json");
  }

  modifier mintCompliance(uint256 _mintAmount){
    require(_mintAmount > 0 && _mintAmount <=  maxMintAmount, "invalid mint amount");
    require(supply.current() + _mintAmount <= maxSupply, "maxSupply exceeded" );
    _;
  }

  // public
  function mint(uint256 _mintAmount) public payable mintCompliance(_mintAmount){
    require(!paused, "the contract is paused");
    require(_mintAmount > 0, "need to mint at least 1 NFT");
    require(msg.value >= cost * _mintAmount, "insufficient funds");

    if (msg.sender != owner()) {
        if(onlyWhitelisted == true) {
            require(isWhitelisted(msg.sender), "user is not whitelisted");
            uint256 ownerMintedCount = addressMintedBalance[msg.sender];
            require(ownerMintedCount + _mintAmount <= nftPerAddressLimit, "max NFT per address exceeded");
        }        
    }    
    _mintLoop(msg.sender, _mintAmount);
  }

  function totalSupply() public view returns(uint256){
    return supply.current();
  }

  
  function isWhitelisted(address _user) public view returns (bool) {
    for (uint i = 0; i < whitelistedAddresses.length; i++) {
      if (whitelistedAddresses[i] == _user) {
          return true;
      }
    }
    return false;
  }

  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory ownedTokenIds = new uint256[](ownerTokenCount);
    uint256 currentTokenId = 1;
    uint256 ownedTokenIndex = 0;

    while(ownedTokenIndex < ownerTokenCount && currentTokenId <= maxSupply){
      address currentTokenOwner = ownerOf(currentTokenId);
      if(currentTokenOwner == _owner){
        ownedTokenIds[ownedTokenIndex] = currentTokenId;
        ownedTokenIndex++;
      }currentTokenId++;
    }
    return ownedTokenIds;
  }

  function tokenURI(uint256 _tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(_tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );

    if (revealed == false) {
      return hiddenMetadataUri;
    }

    string memory currentBaseURI = _baseURI();
    return
      bytes(currentBaseURI).length > 0
        ? string(
          abi.encodePacked(currentBaseURI, _tokenId.toString(), uriSuffix)
        )
        : "";
  }

  //only owner
   function setRevealed(bool _state) public onlyOwner {
    revealed = _state;
  }

  function setCost(uint256 _cost) public onlyOwner {
    cost = _cost;
  }


  function setHiddenMetadataUri(string memory _hiddenMetadataUri)
    public
    onlyOwner
  {
    hiddenMetadataUri = _hiddenMetadataUri;
  }

  function setUriPrefix(string memory _uriPrefix) public onlyOwner {
    uriPrefix = _uriPrefix;
  }

  function setUriSuffix(string memory _uriSuffix) public onlyOwner {
    uriSuffix = _uriSuffix;
  }

  function setPaused(bool _state) public onlyOwner {
    paused = _state;
  }
  
  function setOnlyWhitelisted(bool _state) public onlyOwner {
    onlyWhitelisted = _state;
  }
  
  function whitelistUsers(address[] calldata _users) public onlyOwner {
    delete whitelistedAddresses;
    whitelistedAddresses = _users;
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return uriPrefix;
  }
 
  function withdraw() public payable onlyOwner {
    // =============================================================================
    (bool os, ) = payable(owner()).call{value: address(this).balance}("");
    require(os, "withdrawal error");
    // =============================================================================
  }

  function _mintLoop(address _receiver, uint256 _mintAmount) internal{
    for (uint256 i = 0; i < _mintAmount; i++) {
      supply.increment();
      _safeMint(_receiver, supply.current());
    }
  }
}