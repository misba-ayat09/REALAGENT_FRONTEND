import { useState, useEffect } from 'react';
import { ConnectedResponse } from '../store/features/authentication/userApi';
import { SocialMedia } from '../common/enum';
import { useAppDispatch, useAppSelector } from '../store';
import { getConnectedAccounts } from '../store/features/authentication';

type SocialMediaRecord = Record<SocialMedia, ConnectedResponse[]>;

const useConnectedAccounts = (shouldFetch = true) => {
  const dispatch = useAppDispatch();

  const connectedAccountsList = useAppSelector((state) => state.authentication.connectedAccounts);

  const [connectedAccounts, setConnectedAccounts] = useState<SocialMediaRecord>({
    [SocialMedia.TWITTER]: [],
    [SocialMedia.FACEBOOK]: [],
    [SocialMedia.LINKEDIN]: [],
    [SocialMedia.INSTAGRAM]: [],
    [SocialMedia.GOOGLE]: [],
    [SocialMedia.META]: [],
  });

  const fetchAccountInformation = async () => {
    try {
      if (connectedAccountsList) {
        // Initialize an empty record
        const categorizedAccounts: SocialMediaRecord = {
          [SocialMedia.TWITTER]: [],
          [SocialMedia.FACEBOOK]: [],
          [SocialMedia.LINKEDIN]: [],
          [SocialMedia.INSTAGRAM]: [],
          [SocialMedia.GOOGLE]: [],
          [SocialMedia.META]: [],
        };

        // Categorize each account based on its icon
        connectedAccountsList.forEach((account) => {
          switch (account.icon.toLowerCase()) {
            case SocialMedia.TWITTER:
              categorizedAccounts[SocialMedia.TWITTER].push(account);
              break;
            case SocialMedia.FACEBOOK:
              categorizedAccounts[SocialMedia.FACEBOOK].push(account);
              break;
            case SocialMedia.LINKEDIN:
              categorizedAccounts[SocialMedia.LINKEDIN].push(account);
              break;
            case SocialMedia.INSTAGRAM:
              categorizedAccounts[SocialMedia.INSTAGRAM].push(account);
              break;
            case SocialMedia.GOOGLE:
              categorizedAccounts[SocialMedia.GOOGLE].push(account);
              break;
            case SocialMedia.META:
              categorizedAccounts[SocialMedia.META].push(account);
              break;
            default:
              console.warn(`Unknown icon: ${account.icon}`);
              break;
          }
        });

        setConnectedAccounts(categorizedAccounts);
      } else {
        // Reset if no result
        setConnectedAccounts({
          [SocialMedia.TWITTER]: [],
          [SocialMedia.FACEBOOK]: [],
          [SocialMedia.LINKEDIN]: [],
          [SocialMedia.INSTAGRAM]: [],
          [SocialMedia.GOOGLE]: [],
          [SocialMedia.META]: [],
        });
      }
    } catch (err) {
      //
    } finally {
      //
    }
  };

  useEffect(() => {
    if (connectedAccountsList?.length === 0 && shouldFetch) {
      dispatch(getConnectedAccounts());
    }
    fetchAccountInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedAccountsList, shouldFetch]);

  return { connectedAccounts, refetch: fetchAccountInformation };
};

export default useConnectedAccounts;
