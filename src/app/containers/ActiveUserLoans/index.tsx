/**
 *
 * ActiveUserLoans
 *
 */
import React from 'react';
import { useAccount } from 'app/hooks/useAccount';
import { useGetActiveLoans } from 'app/hooks/trading/useGetActiveLoans';
import { ActiveUserLoan } from 'app/components/ActiveUserLoan';

interface Props {}

export function ActiveUserLoans(props: Props) {
  const account = useAccount();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { value, error, loading } = useGetActiveLoans(
    account,
    0,
    100000,
    0,
    false,
    false,
  );

  if (loading) {
    return <div className="bp3-skeleton">Loading data.</div>;
  }

  if (!value.length) {
    return <>There is no active trades yet.</>;
  }

  return (
    <>
      {value.map(item => (
        <ActiveUserLoan key={item.loanId} item={item} />
      ))}
    </>
  );
}