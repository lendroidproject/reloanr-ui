import moment from 'moment'

export function FormInputs(isLend) {
  return [
    {
      key: 'loanAmountOffered',
      label: 'Amount',
      width: 150,
      output: val => val.toString(),
      inputs: [
        {
          precision: 3,
          suffix: isLend ? 'DAI' : 'DAI',
          unit: 1
        }
      ],
      required: true,
      validation: (contracts, rate = 1) =>
        contracts.loanAmountOffered / (isLend ? 1 : rate) <=
        (contracts.allowances
          ? contracts.allowances[isLend ? 'DAI' : 'WETH'] || 0
          : 0),
      warning: {
        check: (contracts, value, currentDAIExchangeRate) => {
          if (isLend) {
            if (parseFloat(value) > parseFloat(contracts.allowances['DAI']))
              return true
          } else {
            if (
              parseFloat(value) >
              parseFloat(contracts.allowances['WETH']) * currentDAIExchangeRate
            )
              return true
          }
          return false
        },
        message: isLend
          ? 'Please set DAI allowance from the Allowance tab'
          : 'Please set WETH allowance from the Allowance tab'
      }
    },
    {
      key: 'interestRatePerDay',
      label: 'Daily Rate',
      width: 150,
      output: val => val.toString(),
      inputs: [
        {
          precision: 3,
          arrow: true,
          step: 0.1,
          unit: 1
        }
      ],
      required: true
    },
    {
      key: 'loanDuration',
      label: 'Length',
      width: 150,
      output: val => (val * 24 * 3600).toString(),
      inputs: [
        {
          precision: 0,
          step: 1,
          suffix: 'days',
          unit: 1 // 24 * 3600,
        }
      ],
      required: true
    },
    {
      key: 'offerExpiry',
      label: 'Order Expires',
      width: 150,
      output: val => {
        let ret = new moment.utc()
        ret.add(val * 60, 'm')
        return ret.format('x')
      },
      inputs: [
        {
          precision: 0,
          step: 1,
          suffix: 'hours',
          unit: 1 // 60
        }
      ]
    }
  ]
}

export const FeeFormInputs = [
  {
    key: 'relayerFeeLST',
    label: 'Relayer Fee',
    width: 150,
    output: val => val.toString(),
    inputs: [
      {
        precision: 3,
        suffix: 'LST',
        unit: 1
      }
    ],
    readOnly: true,
    warning: {
      feature: true,
      check: () => false,
      message: 'Coming soon in v2'
    }
  },
  {
    key: 'monitoringFeeLST',
    label: 'Monitoring Fee',
    width: 150,
    output: val => val.toString(),
    inputs: [
      {
        precision: 3,
        suffix: 'LST',
        unit: 1
      }
    ],
    warning: {
      check: (contracts, value) => {
        console.log(contracts, value)
        if (parseFloat(value) > parseFloat(contracts.allowances['LST']))
          return true
        return false
      },
      message: 'Please set LST allowance from the Allowance tab'
    }
  },
  {
    key: 'rolloverFeeLST',
    label: 'RollOver Fee',
    width: 150,
    output: val => val.toString(),
    inputs: [
      {
        precision: 3,
        suffix: 'LST',
        unit: 1
      }
    ],
    readOnly: true,
    warning: {
      feature: true,
      check: () => false,
      message: 'Coming soon in v2'
    }
  },
  {
    key: 'closureFeeLST',
    label: 'Closure Fee',
    width: 150,
    output: val => val.toString(),
    inputs: [
      {
        precision: 3,
        suffix: 'LST',
        unit: 1
      }
    ],
    readOnly: true,
    warning: {
      feature: true,
      check: () => false,
      message: 'Coming soon in v2'
    }
  }
]

export const WrapETHFormInputs = [
  {
    key: 'ETHBalance',
    label: 'ETH Balance',
    width: 150,
    output: val => val.toString(),
    inputs: [
      {
        precision: 5,
        suffix: 'ETH',
        unit: 1
      }
    ],
    readOnly: true,
    value: contracts => (contracts.balances ? contracts.balances.ETH || 0 : 0),
    loading: 'wrapping'
  },
  {
    key: 'wETHBalance',
    label: 'WETH Balance',
    width: 150,
    output: val => val.toString(),
    inputs: [
      {
        precision: 5,
        suffix: 'WETH',
        unit: 1
      }
    ],
    readOnly: true,
    value: contracts => (contracts.balances ? contracts.balances.WETH || 0 : 0),
    loading: 'wrapping'
  },
  {
    key: 'operation',
    label: 'Operation',
    width: 150
  },
  {
    key: 'amount',
    label: 'Amount',
    width: 150,
    output: val => val.toString(),
    inputs: [
      {
        precision: 3,
        unit: 1
      }
    ],
    required: true
  }
]

export const AllowanceFormInputs = [
  {
    key: 'token',
    label: 'Token',
    width: 150
  },
  {
    key: 'tokenBalance',
    label: 'Token Balance',
    width: 150,
    output: val => val.toString(),
    inputs: [
      {
        precision: 3,
        unit: 1
      }
    ],
    readOnly: true,
    value: contracts =>
      contracts.balances ? contracts.balances[contracts.token] || 0 : 0,
    loading: 'wrapping'
  },
  {
    key: 'tokenAllowance',
    label: 'Token Allowance',
    width: 150,
    output: val => val.toString(),
    inputs: [
      {
        precision: 3,
        unit: 1
      }
    ],
    readOnly: true,
    value: contracts =>
      contracts.allowances ? contracts.allowances[contracts.token] || 0 : 0,
    loading: 'allowance'
  },
  {
    key: 'newAllowance',
    label: 'New Allowance',
    width: 150,
    output: val => val.toString(),
    inputs: [
      {
        precision: 3,
        unit: 1
      }
    ],
    required: true
  }
]

export const MakerDAIFormInputs = [
  {
    key: 'ethBalance',
    label: 'ETH Balance',
    width: 150,
    output: val => val.toString(),
    inputs: [
      {
        precision: 3,
        unit: 1
      }
    ],
    readOnly: true,
    value: contracts => (contracts.balances ? contracts.balances.ETH || 0 : 0),
    loading: 'making'
  },
  {
    key: 'daiBalance',
    label: 'DAI Balance',
    width: 150,
    output: val => val.toString(),
    inputs: [
      {
        precision: 3,
        unit: 1
      }
    ],
    readOnly: true,
    value: contracts => (contracts.balances ? contracts.balances.DAI || 0 : 0),
    loading: 'making'
  },
  {
    key: 'lockETH',
    label: 'Amount to Lock(ETH)',
    width: 150,
    output: val => val.toString(),
    inputs: [
      {
        precision: 3,
        unit: 1
      }
    ],
    required: true
  },
  {
    key: 'amountInDAI',
    label: 'Amount to Buy(DAI)',
    width: 150,
    output: val => val.toString(),
    inputs: [
      {
        precision: 3,
        unit: 1
      }
    ],
    readOnly: true,
    required: true
  }
]
