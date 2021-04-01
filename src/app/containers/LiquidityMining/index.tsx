import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl, currentChainId } from '../../../utils/classifiers';
import { PoolData } from './components/PoolData';
import {
  getContractNameByAddress,
  getContract,
} from 'utils/blockchain/contract-helpers';
import { useAccount, useIsConnected } from '../../hooks/useAccount';

export function LiquidityMining() {
  // Get total weighted liquidity and user liquidity
  const [totals, setTotals] = useState([
    {
      asset: getContract('USDT_token').address,
      pool: getContract('USDT_amm').address,
      weightedAmount: 100,
    },
    {
      asset: getContract('RBTC_token').address,
      pool: getContract('USDT_amm').address,
      weightedAmount: 100,
    },
  ]);
  const [userData, setUserData] = useState([
    {
      asset: getContract('USDT_token').address,
      pool: getContract('USDT_amm').address,
      txList: [],
      weightedAmount: 0,
    },
    {
      asset: getContract('RBTC_token').address,
      pool: getContract('USDT_amm').address,
      txList: [],
      weightedAmount: 0,
    },
  ]);
  const url = backendUrl[currentChainId];
  const userAddress = useAccount();
  const isConnected = useIsConnected();

  useEffect(() => {
    axios
      .get(url + '/amm/liquidity-mining')
      .then(res => setTotals(res.data))
      .catch(e => console.error(e));
  }, [url]);

  useEffect(() => {
    if (isConnected) {
      axios
        .get(url + '/amm/liquidity-mining/' + userAddress)
        .then(res => setUserData(res.data))
        .catch(e => console.error(e));
    }
  }, [url, userAddress, isConnected]);

  const combinedData = userData.map(i => {
    const weightedTotal = totals.find(
      j => j.asset === i.asset && j.pool === i.pool,
    );
    const percentage = () => {
      if (weightedTotal) {
        return (i.weightedAmount / weightedTotal.weightedAmount) * 100;
      }
    };
    const output = {
      ...i,
      weightedTotal: weightedTotal?.weightedAmount,
      percentage: percentage(),
    };
    return output;
  });

  const rows = combinedData.map((item, key) => {
    if (getContractNameByAddress(item.pool)?.includes('USDT')) {
      return <PoolData key={key} data={item} isConnected={isConnected} />;
    } else {
      return null;
    }
  });

  return (
    <div className="">
      <h1 className="w-100 text-center mb-3">
        Liquidity Mining: USDT/BTC Pool
      </h1>
      <div className="d-flex flex-wrap mb-5"></div>
      <div className="d-flex flex-wrap justify-content-around">{rows}</div>
      {!isConnected && (
        <div className="w-100 my-5 text-center font-family-montserrat font-weight-bold">
          Connect your wallet to see your liquidity mining history.
        </div>
      )}
      <div className="row w-100 text-center p-2">
        <p className="w-100 text-center font-family-montserrat font-italic">
          *This number may go up or down depending on how much liquidity other
          liquidity providers add to or remove from the pool
        </p>
      </div>
    </div>
  );
}
