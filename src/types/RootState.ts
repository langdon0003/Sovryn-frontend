import { WalletProviderState } from 'app/containers/WalletProvider/types';
import { FastBtcFormState } from 'app/containers/FastBtcForm/types';
import { LendBorrowSovrynState } from 'app/containers/LendBorrowSovryn/types';
import { EventsStoreState } from '../store/global/events-store/types';
import { TransactionsStoreState } from '../store/global/transactions-store/types';
import { MaintenanceStoreState } from '../store/global/maintenance-store/types';
import { FastBtcDialogState } from 'app/containers/FastBtcDialog/types';
import { MarginTradePageState } from 'app/pages/MarginTradePage/types';
import { SpotTradingPageState } from 'app/pages/SpotTradingPage/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/*
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  walletProvider?: WalletProviderState;
  fastBtcForm?: FastBtcFormState;
  lendBorrowSovryn?: LendBorrowSovrynState;
  eventsState?: EventsStoreState;
  transactionsState?: TransactionsStoreState;
  maintenanceState?: MaintenanceStoreState;
  fastBtcDialog?: FastBtcDialogState;
  marginTradePage?: MarginTradePageState;
  spotTradingPage?: SpotTradingPageState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
