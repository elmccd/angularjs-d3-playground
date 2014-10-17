'use strict';

angular.module('stockApp').factory('companies', function () {
    return {
        getAll: function () {
            return [
                {
                    id: 1,
                    name: "Cisco Systems, Inc.",
                    stockId: 'CSCO',
                    visible: true,
                    details: {
                        employers: 74043,
                        about: "Cisco Systems, Inc. is an American multinational corporation headquartered in San Jose," +
                            " California, that designs, manufactures, and sells networking equipment. The stock was" +
                            " added to the Dow Jones Industrial Average on June 8, 2009, and is also included in the S&P" +
                            " 500 Index, the Russell 1000 Index, NASDAQ-100 Index and the Russell 1000 Growth Stock Index."
                    },
                    data: []
                },
                {
                    id: 2,
                    name: "Microsoft Corporation",
                    stockId: 'MSFT',
                    visible: true,
                    details: {
                        employers: 128000,
                        about: "Microsoft Corporation is an American multinational corporation headquartered in Redmond, " +
                            "Washington, that develops, manufactures, licenses, supports and sells computer software, " +
                            "consumer electronics and personal computers and services. Its best known software products " +
                            "are the Microsoft Windows line of operating systems, Microsoft Office office suite, and " +
                            "Internet Explorer web browser. Its flagship hardware products are Xbox game console and " +
                            "the Microsoft Surface series of tablets."
                    },
                    data: []
                },
                {
                    id: 3,
                    name: "ABB Ltd.",
                    stockId: 'ABB',
                    visible: true,
                    details: {
                        employers: 150000,
                        about: "ABB is a multinational corporation headquartered in Zurich, Switzerland, operating " +
                            "mainly in robotics and the power and automation technology areas. It ranked 158th in the " +
                            "Forbes Ranking (2013). ABB is one of the largest engineering companies as well as one of " +
                            "the largest conglomerates in the world. ABB has operations in around 100 countries, with " +
                            "approximately 150,000 employees in November 2013,[3] and reported global revenue of " +
                            "$40 billion for 2011.[1]"
                    },
                    data: []
                }
            ];
        }
    };
});
