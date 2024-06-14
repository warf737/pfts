const state = {
  internalFilter: [
    {
      id: "compositeFilter",
      value: ["selfOperations"],
      options: [
        {
          text: "Только мои операции",
          value: "selfOperations",
          tooltip: "Только мои операции"
        }
      ],
      conditions: {
        selfOperations: {
          or: [
            {
              id: "status",
              value: ["Введён", "Подпись"],
              operator: "="
            },
            { id: "signaturesInformation", value: "", operator: "!=" }
          ]
        }
      }
    }
  ]
};

const ITEMS = [
  {
    _id: "00001",
    clientId: "6392ee5a73ea9a068c8d5fc4",
    status: "Введён"
  },
  {
    _id: "00002",
    clientId: "6392ee5a73ea9a068c8d5fc4",
    status: "Подпись"
  },
  {
    _id: "00003",
    clientId: "6392ee5a73ea9a068c8d5fc4",
    status: "Принят"
  },
  {
    _id: "00004",
    clientId: "6392ee5a73ea9a068c8d5fc4",
    status: "Принят",
    signaturesInformation:
      "Согласно договору № ДБО14000008 от 26.12.2022 документ подписан:\n13.06.2024 22:38:03 сертификатом: 6F4DA0001EB1EDB34619C1A9FE41CAC1, Горохов Сергей Петрович, специалист главный, Первая подпись (ЭЦП корректна)."
  }
];

export { state, ITEMS };
