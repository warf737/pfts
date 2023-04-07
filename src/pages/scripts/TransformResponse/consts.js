// export const rule = {
//   "item.number": "item.number",
//   "item.iban": "item.iban",
//   "item.currency": "item.currencyTest",
//   "item.contract": "item.contract",
//   "item.contractName": "item.contractName",
//   "item.branchCode": "item.branchCode",
//   "item.branchName": "item.branchName",
//   "item.openDate": "item.openDate",
//   "item.closeDate": "item.closeDate",
//   "item.balance": "item.balance",
//   "item.balanceClass": "item.balanceClass",
//   "item.availableBalance": "item.availableBalance",
//   "item.availableBalanceClass": "item.availableBalanceClass",
//   "item.overdraft": "item.overdraft",
//   "item.pcBalance": "item.pcBalance",
//   "item.pcBalanceClass": "item.pcBalanceClass",
//   "item.status": "item.status",
//   "item.lastMoveDate": "item.lastMoveDate",
//   "item.loans": "item.loans",
//   "item.blocks": "item.blocks"
// };
export const rule = {
  "status.code": "status.codeTest",
  "status.error": "status.errorText",
  // 1 - ничего не отображается
  "item.number": "number",
  "item.iban": "iban",
  "item.currency": "currencyTest"
  // 2 - отображается только один элемент
  // "items.number": "number",
  // "items.iban": "iban",
  // "items.currency": "currencyTest"
  // 3 - отображается все, но в метод трансформации надо передавать массив с данными, а не весь объект респонса
  // number: "number",
  // iban: "iban",
  // currency: "currencyTest"
  // end
  // contract: "contract",
  // contractName: "contractName",
  // branchCode: "branchCode",
  // branchName: "branchName",
  // openDate: "openDate",
  // closeDate: "closeDate",
  // balance: "balance",
  // balanceClass: "balanceClass",
  // availableBalance: "availableBalance",
  // availableBalanceClass: "availableBalanceClass",
  // overdraft: "overdraft",
  // pcBalance: "pcBalance",
  // pcBalanceClass: "pcBalanceClass",
  // status: "status",
  // lastMoveDate: "lastMoveDate",
  // loans: "loans",
  // blocks: "blocks"
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
