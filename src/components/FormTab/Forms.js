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
          ? value => `Please set DAI allowance of ${value} on the Allowance Tab`
          : (value, currentDAIExchangeRate) =>
              `Please set WETH allowance of ${(
                value / currentDAIExchangeRate
              ).toFixed(2)} on the Allowance Tab`
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
          step: 1,
          unit: 1
        }
      ],
      required: true
    },
    {
      key: 'loanDuration',
      label: 'Loan Term',
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
      label: 'Order Expiry',
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

export function FeeFormInputs(isLend) {
  return [
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
      required: true,
      validation: (contracts, value) => {
        if (isLend) {
          return parseFloat(value) <= parseFloat(contracts.allowances['LST'])
        } else {
          return parseFloat(value) > 0
        }
      },
      warning: {
        check: (contracts, value) => {
          if (parseFloat(value) <= 0) return true
          if (isLend) {
            return parseFloat(value) > parseFloat(contracts.allowances['LST'])
          } else {
            return parseFloat(value) <= 0
          }
        },
        message: isLend
          ? value =>
              parseFloat(value) > 0
                ? `Please set LST allowance of ${value} on the Allowance Tab`
                : `Monitoring fee cannot be 0`
          : value => `Monitoring fee cannot be 0`
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
}

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
