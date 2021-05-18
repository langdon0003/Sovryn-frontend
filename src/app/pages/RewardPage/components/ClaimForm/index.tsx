/**
 *
 * ClaimForm
 *
 */

import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/i18n';
import { Input } from 'form/Input';
import { AssetRenderer } from 'app/components/AssetRenderer';
import { Asset } from 'types';
import { Button } from 'app/components/Button';
import { useSendContractTx } from '../../../../hooks/useSendContractTx';
import { TxType } from 'store/global/transactions-store/types';
import { useCacheCallWithValue } from 'app/hooks/useCacheCallWithValue';
import { weiToFixed } from 'utils/blockchain/math-helpers';
import { TxDialog } from 'app/components/Dialogs/TxDialog';
interface Props {
  className?: object;
  address: string;
}
export function ClaimForm({ className, address }: Props) {
  const { t } = useTranslation();
  const { send, ...tx } = useSendContractTx(
    'lockedSov',
    'createVestingAndStake',
  );

  const { value: lockedBalance } = useCacheCallWithValue(
    'lockedSov',
    'getLockedBalance',
    '',
    address,
  );

  const handleSubmit = () => {
    send(
      [],
      {
        from: address,
      },
      {
        type: TxType.LOCKED_SOV_CLAIM,
      },
    );
  };
  return (
    <div
      className={cn(
        className,
        'tw-trading-form-card tw-bg-black tw-rounded-3xl tw-p-8 tw-mx-auto xl:tw-mx-0 tw-flex tw-flex-col',
      )}
    >
      <div className="text-center tw-text-xl">
        {t(translations.rewardPage.claimForm.title)}
      </div>
      <div className="tw-px-8 tw-mt-6 tw-flex-1 tw-flex tw-flex-col tw-justify-center">
        <div>
          <div className="tw-text-sm tw-mb-1">
            {t(translations.rewardPage.claimForm.availble)}
          </div>
          <Input
            value={
              lockedBalance !== ''
                ? weiToFixed(lockedBalance, 4)
                : lockedBalance
            }
            readOnly={true}
            appendElem={<AssetRenderer asset={Asset.SOV} />}
          />
        </div>
        <div>
          <Button
            disabled={parseFloat(lockedBalance) === 0 || !lockedBalance}
            onClick={handleSubmit}
            className="tw-w-full tw-mt-10"
            text={t(translations.rewardPage.claimForm.cta)}
          />

          <div className="tw-text-xs tw-mt-4">
            {t(translations.rewardPage.claimForm.note) + ' '}
            <a href="/">{t(translations.rewardPage.claimForm.learn)}</a>
          </div>
        </div>
      </div>
      <TxDialog tx={tx} />
    </div>
  );
}