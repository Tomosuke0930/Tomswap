// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TomSwap {
  IERC20 public constant TFT =
    IERC20(0x38C8c9C309e1644a64eff6073a97a0a6B3ca8995);
  IERC20 public constant XTFT =
    IERC20(0x0D163b70b6237fCFA75352a75ca9e989490E59d0);
  IERC20 public constant TSLPT =
    IERC20(0xB87f7EfAE16C845cc2ec49720cdB7286281DAF13);
  mapping(address => uint256) userLiq;
  mapping(address => bool) public isStaking;
  mapping(address => uint256) public claimableAmount;
  mapping(address => uint256) public stakingBalance;
  mapping(address => uint256) public startTime;

  // totalSupplyは毎回、更新するくらいでいいかもしれない！

  // 量を入れてもらう！そしたらこっちで計算をする！そしたらレート計算をする　そしたらレートを取得してそれに応じた量を出す！
  address owner;

  constructor() payable {
    owner = msg.sender;
  }

  function getRate(uint256 tokenIn, bool tft) private view returns (uint256) {
    uint256 tokenOut;
    uint256 X;
    uint256 Y;
    uint256 Z;
    uint256 K;
    // ここを配列とかにもできそうだね

    if (tft) {
      X = XTFT.totalSupply();
      Y = TFT.totalSupply();
    } else {
      X = TFT.totalSupply();
      Y = XTFT.totalSupply();
    }
    Z = X + tokenIn;
    K = X + Y;
    tokenOut = K / Z - K / X;
    return tokenOut;
  }

  function swap(address tokenInAddr, uint256 tokenInAmount) external {
    bool tft;
    uint256 tokenOut;
    if (address(TFT) == tokenInAddr) {
      tft = true;
    } else {
      tft = false;
    }
    tokenOut = getRate(tokenInAmount, tft);
    //別に出す分はいい！
    if (tft) {
      XTFT.transfer(msg.sender, tokenOut);
    } else {
      TFT.transfer(msg.sender, tokenOut);
    }
  }

  //addLiqudityする前にapproveする必要性がわかったぞ！！！
  // 事前にapproveをしてもらう！でもどうやってるんだろう？絶対に最初にapproveが必要なのかな？
  // おそらくそうだ！ではちゃんとやれるようにフロントでも実装しよう！

  function addLiquidity(uint256 tftAmount, uint256 xtftAmount) public {
    require(
      tftAmount * 1000 == xtftAmount,
      "Please input ratio 1:1000 = TFT:XTFT"
    );
    TFT.transferFrom(msg.sender, address(this), tftAmount);
    XTFT.transferFrom(msg.sender, address(this), xtftAmount);
    userLiq[msg.sender] += tftAmount;
    TSLPT.transfer(msg.sender, tftAmount);
  }

  function removeLiquidity(uint256 removeAmount) public {
    require(
      TSLPT.balanceOf(msg.sender) >= removeAmount,
      "Insufficiet of your blance of TSLPT"
    );
    TSLPT.transferFrom(msg.sender, address(this), removeAmount);
    userLiq[msg.sender] -= removeAmount;
    TFT.transfer(msg.sender, removeAmount);
    XTFT.transfer(msg.sender, removeAmount * 1000);
  }

  function stake(uint256 amount) public {
    require(
      amount > 0 && TSLPT.balanceOf(msg.sender) >= amount,
      "You cannot stake zero tokens"
    );

    if (isStaking[msg.sender] == true) {
      uint256 toTransfer = calculateYieldTotal(msg.sender);
      //ここで一旦、今のところの計算をしている(時間はおそらくblock.timestampで見ていると考えられる
      // こいつはどれくらいclaimできるんだ？みたいなことだと考える！だからclaimの時にここで出たやつが関わる！
      claimableAmount[msg.sender] += toTransfer;
    }

    TSLPT.transferFrom(msg.sender, address(this), amount);
    stakingBalance[msg.sender] += amount;
    startTime[msg.sender] = block.timestamp;
    isStaking[msg.sender] = true;
    // emit Stake(msg.sender, amount);
  }

  function calculateYieldTime(address user) public view returns (uint256) {
    uint256 end = block.timestamp;
    uint256 totalTime = end - startTime[user]; //1秒！
    return totalTime;
  }

  function calculateYieldTotal(address user) public view returns (uint256) {
    uint256 time = calculateYieldTime(user) * 10**18;
    uint256 rate = 86400; //ここで1日秒数と同じということは1日に1トークンもらえるということ！
    uint256 timeRate = time / rate; //86400 = 1日の秒数！ 1日に1トークンもらえるということ！
    uint256 rawYield = (stakingBalance[user] * timeRate) / 10**18;
    // 目標：1 Token を 1年預けてくれたら365トークンをあげるよ！

    return rawYield;
  }

  function claim() public {
    uint256 toTransfer = calculateYieldTotal(msg.sender);

    require(
      toTransfer > 0 || claimableAmount[msg.sender] > 0,
      "Nothing to withdraw"
    );

    if (claimableAmount[msg.sender] != 0) {
      uint256 oldBalance = claimableAmount[msg.sender];
      claimableAmount[msg.sender] = 0;
      toTransfer += oldBalance;
      // pmknをここで預けてもらった分を+にしているってことね
    }

    startTime[msg.sender] = block.timestamp;
    XTFT.transfer(msg.sender, toTransfer);
    // emit YieldWithdraw(msg.sender, toTransfer);
  }

  function unstake(uint256 amount) public {
    require(
      isStaking[msg.sender] = true && stakingBalance[msg.sender] >= amount,
      "Nothing to unstake"
    );
    uint256 yieldTransfer = calculateYieldTotal(msg.sender);
    startTime[msg.sender] = block.timestamp;
    uint256 balTransfer = amount;
    amount = 0;
    stakingBalance[msg.sender] -= balTransfer;
    TSLPT.transfer(msg.sender, balTransfer);
    claimableAmount[msg.sender] += yieldTransfer;
    if (stakingBalance[msg.sender] == 0) {
      isStaking[msg.sender] = false;
    }
    // emit Unstake(msg.sender, balTransfer);
  }
}
