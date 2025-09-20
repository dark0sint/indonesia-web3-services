// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IndonesiaWeb3Services {
    struct TaxPayment {
        address payer;
        uint amount;
        uint timestamp;
    }

    struct RetributionPayment {
        address payer;
        uint amount;
        uint timestamp;
    }

    event TaxPaid(address indexed payer, uint amount, uint timestamp);
    event RetributionPaid(address indexed payer, uint amount, uint timestamp);

    TaxPayment[] public taxPayments;
    RetributionPayment[] public retributionPayments;

    function payTax() external payable {
        require(msg.value > 0, "Payment must be greater than zero");
        taxPayments.push(TaxPayment(msg.sender, msg.value, block.timestamp));
        emit TaxPaid(msg.sender, msg.value, block.timestamp);
    }

    function payRetribution() external payable {
        require(msg.value > 0, "Payment must be greater than zero");
        retributionPayments.push(RetributionPayment(msg.sender, msg.value, block.timestamp));
        emit RetributionPaid(msg.sender, msg.value, block.timestamp);
    }

    function getTaxPaymentsCount() external view returns (uint) {
        return taxPayments.length;
    }

    function getRetributionPaymentsCount() external view returns (uint) {
        return retributionPayments.length;
    }
}
