import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios, { Canceler } from 'axios';
import { backendUrl, currentChainId } from '../../../../utils/classifiers';
import { SkeletonRow } from '../../../components/Skeleton/SkeletonRow';
import { AmmBalanceRow } from '../types';
import { Asset } from 'types/asset';
import { useInterval } from 'app/hooks/useInterval';

interface Props {
  rate: number;
}

export function AmmStats(props: Props) {
  const assets = [Asset.DOC, Asset.USDT, Asset.BPRO];

  return (
    <div>
      <table className="w-100">
        <thead>
          <tr>
            <th className="">Pool</th>
            <th className="">Asset</th>
            <th className="text-right">24 Hour Volume</th>
            <th className="text-right">24 Hour Fees</th>
            <th className="text-right">All Time Volume</th>
            <th className="text-right">All Time Fees</th>
          </tr>
        </thead>
        <tbody className="mt-5">
          {assets.map((item, key) => (
            <Row key={key} asset={item} rate={props.rate} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
AmmStats.defaultProps = {
  rate: 30,
};

function Row(props) {
  const url = backendUrl[currentChainId];
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AmmBalanceRow>();
  const cancelDataRequest = useRef<Canceler>();

  const getData = useCallback(() => {
    cancelDataRequest.current && cancelDataRequest.current();

    const cancelToken = new axios.CancelToken(c => {
      cancelDataRequest.current = c;
    });

    axios
      .get(`${url}/amm/pool-balance/${props.asset}`, { cancelToken })
      .then(res => {
        console.log(res);
        setData(res.data);
        setLoading(false);
      })
      .catch(e => console.error(e));
  }, [url, props.asset]);

  useInterval(() => {
    getData();
  }, props.rate * 1e3);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading && <SkeletonRow />}
      {data && (
        <>
          <tr></tr>
        </>
      )}
    </>
  );
}
