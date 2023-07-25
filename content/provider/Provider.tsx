import { FinProvider } from '@actav/floating-icon-navigation';
import { ChannelProvider } from './ChannelProvider';

function Provider(props: { children: React.ReactNode }) {
  // prop destruction
  const { children } = props;

  // lib hooks

  // state, ref, querystring hooks

  // form hooks

  // query hooks

  // calculated values

  // effects

  // handlers
  return (
    <FinProvider>
      <ChannelProvider>{children}</ChannelProvider>
    </FinProvider>
  );
}

export default Provider;
