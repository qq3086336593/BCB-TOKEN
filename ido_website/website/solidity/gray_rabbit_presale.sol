pragma solidity >=0.6.0 <0.8.0;
// SPDX-License-Identifier: Unlicensed


// helper methods for interacting with ERC20 tokens and sending ETH that do not consistently return true/false
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(
            abi.encodeWithSelector(0x095ea7b3, to, value)
        );
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            "TransferHelper: APPROVE_FAILED"
        );
    }

    function safeTransfer(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transfer(address,uint256)')));
        (bool success, bytes memory data) = token.call(
            abi.encodeWithSelector(0xa9059cbb, to, value)
        );
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            "TransferHelper: TRANSFER_FAILED"
        );
    }

    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
        (bool success, bytes memory data) = token.call(
            abi.encodeWithSelector(0x23b872dd, from, to, value)
        );
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            "TransferHelper: TRANSFER_FROM_FAILED"
        );
    }

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, "TransferHelper: ETH_TRANSFER_FAILED");
    }
}

/*
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with GSN meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address payable) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes memory) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;
    bool public _swAuth = true;
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor () {
        address msgSender = _msgSender();
        _owner = msgSender;
        emit OwnershipTransferred(address(0), msgSender);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(_owner == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}


contract GreyRabbitPreSale is Ownable {

    //market address
    address public marketAddress = 0xDC40Fe52eD8Ae5d25852F1761205377D5EBdf2C1;
    // token address
    address public tokenAddress ;
    //token decimal
    uint256 public tokenDecimal = 1e18;


    // To receive BNB
    receive() external payable {}

    function updateMarketAddress(address addr) public onlyOwner {
        marketAddress = addr;
    }

    function updateTokenAddress(address addr) public onlyOwner {
        tokenAddress = addr;
    }

    function updateTokenDecimal(uint256 _decimal) public onlyOwner {
        tokenDecimal = _decimal;
    }

    bool private _swSale = true;
	uint256 public bnbTotalPaided;
    address[] public buyers;
    mapping (address => uint256) public referRewards;
    mapping (address => uint256) public unclaim;


	function clearAllETH() public onlyOwner() {
		payable(owner()).transfer(address(this).balance);
	}

    function withdrawToken(address token,uint256 amountOut) public onlyOwner {
		TransferHelper.safeTransfer(token, msg.sender, amountOut);
    }

    uint256 public idx=0;
    function distributionAll(uint256 count) public onlyOwner {
        if (count > buyers.length){
            count = buyers.length;
        }

        for(uint i=1;i<count;i++){
            if (unclaim[buyers[idx]] > 0){
                TransferHelper.safeTransfer(tokenAddress, buyers[idx], unclaim[buyers[idx]]);
            }

            idx++;
            if (idx >= buyers.length) {
                idx = 0;
            }
        }
    }

    function claim() public {
        if(unclaim[msg.sender]>0){
            TransferHelper.safeTransfer(tokenAddress, msg.sender, unclaim[msg.sender]);
        }
    }

    function set(uint8 tag,uint256 value)public onlyOwner returns(bool){
        if(tag==1){
            _swSale = value==1;
        }else if(tag==2){
            _swAuth = value==1;
        }

        return true;
    }

    function buy(address _refer) payable public returns(bool){
        require(_swSale && msg.value >= 0.1 ether,"Transaction recovery");
        uint256 _msgValue = msg.value;

        buyers.push(msg.sender);
        uint256 _token = getTokenAmount(_msgValue);
        unclaim[msg.sender] += _token;
		bnbTotalPaided = bnbTotalPaided + _msgValue;

        uint256 marketAmount = _msgValue;

        TransferHelper.safeTransfer(tokenAddress, _msgSender(), _token);
        if(_msgSender()!=_refer && _refer!=address(0)){
            uint referEth = getReferAmount(_msgValue);
            TransferHelper.safeTransferETH(_refer,referEth);
            marketAmount -= referEth;
        }

        TransferHelper.safeTransferETH(marketAddress,marketAmount);

        return true;
    }

    function getTokenAmount(uint256 amount)  public view returns(uint256){
        uint256 tokenAmount;
        if (amount >= 0.1 ether && amount < 0.2 ether) {
            tokenAmount =  2000 ;
        }else if (amount >= 0.2 ether && amount < 0.3 ether){
            tokenAmount = 4100;
        }else if (amount >= 0.3 ether && amount < 0.4 ether){
            tokenAmount = 6200;
        }else if (amount >= 0.4 ether && amount < 0.5 ether){
            tokenAmount = 8300;
        }else if (amount >= 0.5 ether && amount < 0.6 ether){
            tokenAmount = 10400;
        }else if (amount >= 0.6 ether && amount < 0.7 ether){
            tokenAmount = 12500;
        }else if (amount >= 0.7 ether && amount < 0.8 ether){
            tokenAmount = 14600;
        }else if (amount >= 0.8 ether && amount < 0.9 ether){
            tokenAmount = 16700;
        }else if (amount >= 0.9 ether && amount < 1 ether){
            tokenAmount = 18800;
        }else{
            tokenAmount = 21000;
        }

        return tokenAmount * tokenDecimal /100 * 30;
    }

    function getReferAmount(uint256 amount) public pure returns(uint256){
        if (amount >= 0.1 ether && amount < 0.2 ether) {
            return amount/100;
        }else if (amount >= 0.2 ether && amount < 0.3 ether){
            return amount * 2 /100;
        }else if (amount >= 0.3 ether && amount < 0.4 ether){
            return amount * 3 /100;
        }else if (amount >= 0.4 ether && amount < 0.5 ether){
            return amount * 4 /100;
        }else if (amount >= 0.5 ether && amount < 0.6 ether){
            return amount * 5 /100;
        }else if (amount >= 0.6 ether && amount < 0.7 ether){
            return amount * 6 /100;
        }else if (amount >= 0.7 ether && amount < 0.8 ether){
            return amount * 7 /100;
        }else if (amount >= 0.8 ether && amount < 0.9 ether){
            return amount * 8 /100;
        }else if (amount >= 0.9 ether && amount < 1 ether){
            return amount * 9 /100;
        }else{
            return amount * 10 /100;
        }
    }
}
