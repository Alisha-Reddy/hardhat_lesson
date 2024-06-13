//SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract SimpleStorage {
    uint public favNumber; //the variable gets initialized to zero

    struct People {
        uint favNumber;
        string name;
    }

    People[] public people;

    function store(uint256 _favNumber) public virtual {
        favNumber = _favNumber;
    }

    function retrieve() public view returns (uint256) {
        return favNumber;
    }

    mapping(string => uint) public nameTofavNumber;

    function addPerson(string memory _name, uint256 _favNumber) public {
        People memory newPerson = People({favNumber: _favNumber, name: _name});
        people.push(newPerson);

        nameTofavNumber[_name] = _favNumber;
    }
}
