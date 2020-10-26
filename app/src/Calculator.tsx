import React from 'react';
import { useState } from 'react';
import './Calculator.css';

enum InvestmentCurrency {
    ETH = 'eth',
    GOP = 'gop',
}

const Calculator: React.FC = () => {
    const [investment, setInvestment] = useState<string>('');
    const [investmentCurrency, setInvestmentCurrency] = useState<InvestmentCurrency>(InvestmentCurrency.ETH);
    const [multiplier, setMultiplier] = useState<string>('');

    const investmentAsNumber = Number(investment);
    const multiplierAsNumber = Number(multiplier);

    const isInvestmentNumberValid = !isNaN(investmentAsNumber) && investmentAsNumber > 0;
    const isMultiplierNumberValid = !isNaN(multiplierAsNumber) && multiplierAsNumber > 0;
    const displayResults = isInvestmentNumberValid && isMultiplierNumberValid;

    let burnPercent = isMultiplierNumberValid && multiplierAsNumber >= 1 ? 40 / multiplierAsNumber : 40;
    burnPercent = burnPercent < 1 ? 1 : burnPercent > 40 ? 40 : burnPercent;

    const gopSold =
        isInvestmentNumberValid && investmentAsNumber > 0
            ? investmentCurrency === InvestmentCurrency.ETH
                ? investmentAsNumber * 15000
                : investmentAsNumber
            : 0;
    const gopBurned = (burnPercent / 100) * gopSold;
    const ethRecieved =
        isInvestmentNumberValid && investmentAsNumber > 0 && isMultiplierNumberValid && multiplierAsNumber > 0
            ? ((investmentAsNumber / (investmentCurrency === InvestmentCurrency.ETH ? 1 : 15000)) *
                  multiplierAsNumber *
                  (100 - burnPercent)) /
              100
            : 0;

    return (
        <div className='calculator'>
            <p className='calculator__reminder'>
                This is how burn will impact your profits. Just a reminder not to sell too low!
            </p>

            <div className='calculator__input-wrapper'>
                <div className='calculator__block'>
                    <label className='calculator__label'>How much do you want to sell? (1ETH = 15000 $GoP)</label>
                    <input
                        className='calculator__input calculator__input--amount'
                        type='number'
                        min='0'
                        value={investment || ''}
                        onChange={(e) => setInvestment(e.target.value)}
                    />

                    <select
                        className='calculator__input calculator__input--currency'
                        value={investmentCurrency}
                        onChange={(e) => setInvestmentCurrency(e.target.value as InvestmentCurrency)}
                    >
                        <option value={InvestmentCurrency.ETH}>ETH</option>
                        <option value={InvestmentCurrency.GOP}>$GoP</option>
                    </select>
                </div>

                <div className='calculator__block'>
                    <label className='calculator__label'>Multiplier</label>
                    <input
                        className='calculator__input'
                        type='number'
                        min='0'
                        value={multiplier || ''}
                        onChange={(e) => setMultiplier(e.target.value)}
                    />
                </div>
            </div>

            {displayResults && (
                <div className='calculator__data'>
                    <div className='calculator__block'>
                        <label className='calculator__label'>Burn %</label>
                        <p className='calculator__amount'>{burnPercent.toFixed(2)}</p>
                    </div>

                    <div className='calculator__block'>
                        <label className='calculator__label'>$GoP sold</label>
                        <p className='calculator__amount'>{gopSold.toFixed(2)}</p>
                    </div>

                    <div className='calculator__block'>
                        <label className='calculator__label'>$GoP burned on sell</label>
                        <p className='calculator__amount'>{gopBurned.toFixed(2)}</p>
                    </div>

                    <div className='calculator__block'>
                        <label className='calculator__label'>ETH recieved on sell</label>
                        <p className='calculator__amount calculator__amount--bold'>{ethRecieved.toFixed(2)}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calculator;
