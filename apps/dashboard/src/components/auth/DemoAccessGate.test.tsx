import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DemoAccessGate from './DemoAccessGate';
import {
  DEMO_ACCESS_EMAIL,
  DEMO_ACCESS_PASSWORD,
  DEMO_ACCESS_SESSION_KEY,
} from '../../lib/demo-access';

describe('DemoAccessGate', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('shows the demo credentials before access is granted', () => {
    render(<DemoAccessGate><p>Private dashboard</p></DemoAccessGate>);

    expect(screen.getByRole('heading', { name: 'Welcome to OrdoStay' })).toBeInTheDocument();
    expect(screen.getByText(DEMO_ACCESS_EMAIL)).toBeInTheDocument();
    expect(screen.getByText(DEMO_ACCESS_PASSWORD)).toBeInTheDocument();
    expect(screen.queryByText('Private dashboard')).not.toBeInTheDocument();
  });

  it('rejects incorrect credentials', async () => {
    const user = userEvent.setup();
    render(<DemoAccessGate><p>Private dashboard</p></DemoAccessGate>);

    await user.type(screen.getByLabelText('Email address'), 'wrong@example.com');
    await user.type(screen.getByLabelText('Password'), 'incorrect');
    await user.click(screen.getByRole('button', { name: 'Enter demonstration' }));

    expect(screen.getByRole('alert')).toHaveTextContent('do not match');
    expect(sessionStorage.getItem(DEMO_ACCESS_SESSION_KEY)).toBeNull();
  });

  it('grants session access with the published demo credentials', async () => {
    const user = userEvent.setup();
    render(<DemoAccessGate><p>Private dashboard</p></DemoAccessGate>);

    await user.type(screen.getByLabelText('Email address'), DEMO_ACCESS_EMAIL);
    await user.type(screen.getByLabelText('Password'), DEMO_ACCESS_PASSWORD);
    await user.click(screen.getByRole('button', { name: 'Enter demonstration' }));

    expect(screen.getByText('Private dashboard')).toBeInTheDocument();
    expect(sessionStorage.getItem(DEMO_ACCESS_SESSION_KEY)).toBe('granted');
  });
});
