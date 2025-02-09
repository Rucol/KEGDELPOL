import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputQuantity from '../Components/InputQuantity';

describe('InputQuantity Component', () => {
  it('renders correctly and calls onChange with correct value', () => {
    const mockOnChange = jest.fn();
    const label = 'Test Label';
    const id = 'test-input';
    const value = 1;

    render(
      <InputQuantity 
        label={label} 
        id={id} 
        value={value} 
        onChange={mockOnChange} 
      />
    );

    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();

    const inputElement = screen.getByRole('spinbutton');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(value);

    // Simulate changing input value
    const newValue = 5;
    fireEvent.change(inputElement, { target: { value: newValue.toString() } });
    expect(mockOnChange).toHaveBeenCalledWith(newValue);

    // Simulate changing input value to a value less than 1
    fireEvent.change(inputElement, { target: { value: '0' } });
    expect(mockOnChange).toHaveBeenCalledWith(1); // Value should be clamped to 1
  });
});
