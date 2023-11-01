const nodes = [
  {
    value: 'centralnyy',
    label: 'Центральный',
    children: [
      { 
        value: 'Moscow', 
        label: 'Moscow',
        children: [
          { value: "1001", label: "Адрес 1" },
          { value: "1002", label: "Адрес 2" },
          { value: "1003", label: "Адрес 3" },
        ],
      },
      { 
        value: 'Belgorod', 
        label: 'Belgorod',
        children: [
          { value: "1004", label: "Адрес 1" },
          { value: "1005", label: "Адрес 2" },
          { value: "1006", label: "Адрес 3" },
        ],
      },
      { 
        value: 'Vladimir', 
        label: 'Vladimir',
        children: [
          { value: "1007", label: "Адрес 1" },
          { value: "1008", label: "Адрес 2" },
          { value: "1009", label: "Адрес 3" },
        ],
      },
    ],
  },
  {
    value: 'severo-zapadnyy',
    label: 'Северо-Западный',
    children: [
      { 
        value: 'Saint Petersburg', 
        label: 'Saint Petersburg',
        children: [
          { value: "1010", label: "Адрес 1" },
          { value: "1011", label: "Адрес 2" },
          { value: "1012", label: "Адрес 3" },
        ],
      },
      { 
        value: 'Kaliningrad', 
        label: 'Kaliningrad',
        children: [
          { value: "1013", label: "Адрес 1" },
          { value: "1014", label: "Адрес 2" },
          { value: "1015", label: "Адрес 3" },
        ],
      },
      { 
        value: 'Veliky Novgorod', 
        label: 'Veliky Novgorod',
        children: [
          { value: "1016", label: "Адрес 1" },
          { value: "1017", label: "Адрес 2" },
          { value: "1018", label: "Адрес 3" },
        ],
      },
      { 
        value: 'Murmansk', 
        label: 'Murmansk',
        children: [
          { value: "1019", label: "Адрес 1" },
          { value: "1020", label: "Адрес 2" },
          { value: "1021", label: "Адрес 3" },
        ],
      },
    ],
  },
  {
    value: 'yuzhnyy',
    label: 'Южный',
    children: [
      // Astrakhan
      { 
        value: 'Novorossiysk', 
        label: 'Novorossiysk',
        children: [
          { value: "1022", label: "Адрес 1" },
          { value: "1023", label: "Адрес 2" },
          { value: "1024", label: "Адрес 3" },
        ],
      },
      { 
        value: 'Sochi', 
        label: 'Sochi',
        children: [
          { value: "1025", label: "Адрес 1" },
          { value: "1026", label: "Адрес 2" },
          { value: "1027", label: "Адрес 3" },
        ],
      },
      { 
        value: 'Astrakhan', 
        label: 'Astrakhan',
        children: [
          { value: "1028", label: "Адрес 1" },
          { value: "1029", label: "Адрес 2" },
          { value: "1030", label: "Адрес 3" },
        ],
      },
    ],
  },
  {
    value: 'privolzhskiy',
    label: 'Приволжский',
    children: [
      { 
        value: 'Kazan', 
        label: 'Kazan',
        children: [
          { value: "1031", label: "Адрес 1" },
          { value: "1032", label: "Адрес 2" },
          { value: "1033", label: "Адрес 3" },
        ],
      },
      { 
        value: 'Nizhny Novgorod', 
        label: 'Nizhny Novgorod',
        children: [
          { value: "1034", label: "Адрес 1" },
          { value: "1035", label: "Адрес 2" },
          { value: "1036", label: "Адрес 3" },
        ],
      },
      { 
        value: 'Samara', 
        label: 'Samara',
        children: [
          { value: "1037", label: "Адрес 1" },
          { value: "1038", label: "Адрес 2" },
          { value: "1039", label: "Адрес 3" },
        ],
      },
    ],
  },
];

export default nodes;