import React from 'react';
import { useState } from 'react';
import './Calculator.css';

const Calculator: React.FC = () => {
    const [investment, setInvestment] = useState<number>();
    const [multiplier, setMultiplier] = useState<number>();

    const checkAndSetInvestment = (value: string) => {
        const valueAsNumber = Number(value);
        setInvestment(!isNaN(valueAsNumber) ? valueAsNumber : undefined);
    };

    const checkAndSetMultiplier = (value: string) => {
        const valueAsNumber = Number(value);
        setMultiplier(!isNaN(valueAsNumber) ? valueAsNumber : undefined);
    };

    let burnPercent = !!multiplier && !isNaN(multiplier) && multiplier >= 1 ? 40 / multiplier : 40;
    burnPercent = burnPercent < 1 ? 1 : burnPercent > 40 ? 40 : burnPercent;

    const gopRecieved = !!investment && !isNaN(investment) && investment > 0 ? investment * 15000 : 0;
    const gopBurned = (burnPercent / 100) * gopRecieved;
    const ethRecieved =
        !!investment && !isNaN(investment) && investment > 0 && !!multiplier && !isNaN(multiplier) && multiplier > 0
            ? (investment * multiplier * (100 - burnPercent)) / 100
            : 0;

    const showData =
        !!investment && !isNaN(investment) && investment > 0 && !!multiplier && !isNaN(multiplier) && multiplier > 0;

    return (
        <div className='calculator'>
            <p className='calculator__reminder'>
                This is how burn will impact your profits. Just a reminder not to sell too low!
            </p>

            <div className='calculator__input-wrapper'>
                <div className='calculator__block calculator__block--half'>
                    <label className='calculator__label'>Investment in ETH</label>
                    <input value={investment} onChange={(e) => checkAndSetInvestment(e.target.value)} />
                </div>

                <div className='calculator__block calculator__block--half'>
                    <label className='calculator__label'>Multiplier</label>
                    <input value={multiplier} onChange={(e) => checkAndSetMultiplier(e.target.value)} />
                </div>
            </div>

            {showData && (
                <div className='calculator__data'>
                    <div className='calculator__block'>
                        <label className='calculator__label'>$GoP recieved</label>
                        <p className='calculator__amount'>{gopRecieved.toFixed(2)}</p>
                    </div>

                    <div className='calculator__block'>
                        <label className='calculator__label'>Burn %</label>
                        <p className='calculator__amount'>{burnPercent.toFixed(2)}</p>
                    </div>

                    <div className='calculator__block'>
                        <label className='calculator__label'>$GoP burned on sell</label>
                        <p className='calculator__amount'>{gopBurned.toFixed(2)} $GoP</p>
                    </div>

                    <div className='calculator__block'>
                        <label className='calculator__label'>ETH recieved on sell</label>
                        <p className='calculator__amount'>{ethRecieved.toFixed(2)}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calculator;
