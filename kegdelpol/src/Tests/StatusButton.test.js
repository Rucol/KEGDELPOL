import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StatusButton from '../Components/StatusButton';

describe('StatusButton Component', () => {
  it('renders correctly and calls onStatusChange with correct value', () => {
    const mockOnStatusChange = jest.fn();
    const currentStatus = 'Pending';

    render(
      <StatusButton 
        currentStatus={currentStatus} 
        onStatusChange={mockOnStatusChange} 
      />
    );

    const changeStatusButton = screen.getByText('Change Status');
    expect(changeStatusButton).toBeInTheDocument();

    fireEvent.click(changeStatusButton);

    const pendingOption = screen.getByText('Pending');
    expect(pendingOption).toBeInTheDocument();

    const deliveredOption = screen.getByText('Delivered');
    expect(deliveredOption).toBeInTheDocument();

    const cancelledOption = screen.getByText('Cancelled');
    expect(cancelledOption).toBeInTheDocument();

    fireEvent.click(cancelledOption);
    expect(mockOnStatusChange).toHaveBeenCalledWith('Cancelled');
  });
});
