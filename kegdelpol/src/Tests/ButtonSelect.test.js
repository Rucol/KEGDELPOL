import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ButtonSelect from '../Components/ButtonSelect';

describe('ButtonSelect Component', () => {
  it('toggles active state and calls onSelect with correct value', () => {
    const mockOnSelect = jest.fn();
    render(<ButtonSelect onSelect={mockOnSelect} />);

    const ordersButton = screen.getByText('Orders');
    const usersButton = screen.getByText('Users');
    const vehicleButton = screen.getByText('Vehicle');

    // Initially, no button should be active
    expect(ordersButton).toHaveClass('btn-secondary');
    expect(usersButton).toHaveClass('btn-secondary');
    expect(vehicleButton).toHaveClass('btn-secondary');

    // Click 'Orders' button
    fireEvent.click(ordersButton);
    expect(ordersButton).toHaveClass('btn-primary');
    expect(usersButton).toHaveClass('btn-secondary');
    expect(vehicleButton).toHaveClass('btn-secondary');
    expect(mockOnSelect).toHaveBeenCalledWith('orders');

    // Click 'Users' button
    fireEvent.click(usersButton);
    expect(ordersButton).toHaveClass('btn-secondary');
    expect(usersButton).toHaveClass('btn-primary');
    expect(vehicleButton).toHaveClass('btn-secondary');
    expect(mockOnSelect).toHaveBeenCalledWith('users');

    // Click 'Orders' button again
    fireEvent.click(ordersButton);
    expect(ordersButton).toHaveClass('btn-primary');
    expect(usersButton).toHaveClass('btn-secondary');
    expect(vehicleButton).toHaveClass('btn-secondary');
    expect(mockOnSelect).toHaveBeenCalledWith('orders');
  });
});
