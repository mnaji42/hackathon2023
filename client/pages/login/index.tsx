import React from 'react';
import { walletConnectV2ProjectId } from '../../config';
import { routeNames } from '../../routes';
import { AuthRedirectWrapper } from '../../components/AuthRedirectWrapper';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Button, Card, CardContent, Container } from '@mui/material';
import { Stack } from '@mui/system';

const ExtensionLoginButton = dynamic(
  async () => {
    return (
      await import('@multiversx/sdk-dapp/UI/extension/ExtensionLoginButton')
    ).ExtensionLoginButton;
  },
  { ssr: false }
);

const WalletConnectLoginButton = dynamic(
  async () => {
    return (
      await import(
        '@multiversx/sdk-dapp/UI/walletConnect/WalletConnectLoginButton'
      )
    ).WalletConnectLoginButton;
  },
  { ssr: false }
);

const LedgerLoginButton = dynamic(
  async () => {
    return (await import('@multiversx/sdk-dapp/UI/ledger/LedgerLoginButton'))
      .LedgerLoginButton;
  },
  { ssr: false }
);

const WebWalletLoginButton = dynamic(
  async () => {
    return (
      await import('@multiversx/sdk-dapp/UI/webWallet/WebWalletLoginButton')
    ).WebWalletLoginButton;
  },
  { ssr: false }
);

const UnlockPage = () => {
  const commonProps = {
    callbackRoute: routeNames.dashboard,
    buttonClassName: 'loginButton',
    nativeAuth: true // optional
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <Container maxWidth='md' sx={{ mt: 5 }}>
        <Card>
          <CardContent sx={{ textAlign: 'center' }}>
            <h4 className='mb-4'>Login</h4>
            <p className='mb-4'>pick a login method</p>

            <Stack direction='row' spacing={2} justifyContent='center'>
              <Button variant='contained'>
                <ExtensionLoginButton
                  loginButtonText='Extension'
                  {...commonProps}
                />
              </Button>

              <Button variant='contained'>
                <WebWalletLoginButton
                  loginButtonText='Web wallet'
                  {...commonProps}
                />
              </Button>

              <Button variant='contained'>
                <LedgerLoginButton
                  loginButtonText='Ledger'
                  className='test-class_name'
                  {...commonProps}
                />
              </Button>

              <Button variant='contained'>
                <WalletConnectLoginButton
                  loginButtonText='Maiar'
                  {...commonProps}
                  {...(walletConnectV2ProjectId
                    ? {
                        isWalletConnectV2: true
                      }
                    : {})}
                />
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default function Unlock() {
  return (
    <AuthRedirectWrapper>
      <UnlockPage />
    </AuthRedirectWrapper>
  );
}
