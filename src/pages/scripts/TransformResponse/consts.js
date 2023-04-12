export const rule = {
  "status.code": "status.codeTest",
  "status.error": "status.errorText",
  "items[].number": "items[].number",
  "items[].iban": "items[].iban",
  "items[].currency": "items[].currencyTest"
};

export const data = {
  status: {
    code: 200,
    error: ""
  },
  items: [
    {
      key: "40817810100020000252     @002",
      number: "40817810100020000252",
      iban: "RU7100000000140817810100020000252",
      currency: "RUR",
      contract: "Òåêóù",
      contractName: "Òåêóùèé ñ÷åòà",
      name: "",
      branchCode: "002",
      branchName: '"Ìîñêâà"',
      openDate: "2020-07-24T00:00:00.000Z",
      closeDate: "",
      balance: 2317252.51,
      balanceClass: "passiv",
      availableBalance: 384700.8,
      availableBalanceClass: "passiv",
      overdraft: 0,
      pcBalance: 0,
      pcBalanceClass: "passiv",
      status: "Àêòèâåí",
      lastMoveDate: "2023-04-06T00:00:00.000Z"
      // loans: [],
      // blocks: []
    },
    {
      key: "40817810200020000372     @002",
      number: "40817810200020000372",
      iban: "RU9100000000140817810200020000372",
      currency: "RUR",
      contract: "",
      contractName: "Ñ÷¸ò",
      name: "",
      branchCode: "002",
      branchName: '"Ìîñêâà"',
      openDate: "2022-10-31T00:00:00.000Z",
      closeDate: "",
      balance: 0,
      balanceClass: "passiv",
      availableBalance: 10,
      availableBalanceClass: "activ",
      overdraft: 0,
      pcBalance: 0,
      pcBalanceClass: "passiv",
      status: "Àêòèâåí",
      lastMoveDate: ""
      // loans: [],
      // blocks: []
    },
    {
      key: "40817810100030000006     @002",
      number: "40817810100030000006",
      iban: "RU0500000000140817810100030000006",
      currency: "RUR",
      contract: "",
      contractName: "Ñ÷¸ò",
      name: "",
      branchCode: "003",
      branchName: "Ïñêîâ",
      openDate: "2022-01-19T00:00:00.000Z",
      closeDate: "",
      balance: 600,
      balanceClass: "passiv",
      availableBalance: 450,
      availableBalanceClass: "passiv",
      overdraft: 0,
      pcBalance: 0,
      pcBalanceClass: "passiv",
      status: "Áëîêèðîâàí",
      lastMoveDate: "2022-01-19T00:00:00.000Z"
      // loans: [],
      // blocks: [
      //   {
      //     begDate: "2022-01-19T06:53:00.000Z",
      //     endDate: "",
      //     type: "ÁëîêÄá",
      //     name: "Ñ÷åò çàáëîêèðîâàí äëÿ äåáåòîâûõ îïåðàöèé",
      //     ruling: " ",
      //     since: "",
      //     typeOrgan: "",
      //     nameOrgan: "",
      //     paymentOrder: "4",
      //     amount: 0
      //   },
      //   {
      //     begDate: "2022-01-19T06:52:00.000Z",
      //     endDate: "",
      //     type: "ÁëîêÑóìì",
      //     name: "Áëîêèðîâàí ïî èñïîëíèòåëüíîìó äîêóìåíòó",
      //     ruling: " ",
      //     since: "",
      //     typeOrgan: "",
      //     nameOrgan: "",
      //     paymentOrder: "1,2,3,4,5",
      //     amount: 150
      //   }
      // ]
    }
  ]
};
