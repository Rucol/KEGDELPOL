import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DropDownInput from '../Components/DropDownInput';


describe('DropDownInput Component', () => {
  it('renders correctly and calls onChange with correct value', () => {
    const mockOnChange = jest.fn();
    const options = [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' }
    ];

    render(<DropDownInput label="Test Label" options={options} onChange={mockOnChange} />);

    const labelElement = screen.getByText('Test Label');
    expect(labelElement).toBeInTheDocument();

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue('');

    // Initially, the first option should be 'Choose an option'
    const defaultOption = screen.getByText('Choose an option');
    expect(defaultOption).toBeInTheDocument();

    // Verify all provided options are rendered
    options.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });

    // Select 'Option 1' from dropdown
    fireEvent.change(selectElement, { target: { value: 'option1' } });
    expect(selectElement).toHaveValue('option1');
    expect(mockOnChange).toHaveBeenCalledWith('option1');

    // Select 'Option 2' from dropdown
    fireEvent.change(selectElement, { target: { value: 'option2' } });
    expect(selectElement).toHaveValue('option2');
    expect(mockOnChange).toHaveBeenCalledWith('option2');

    // Select 'Option 3' from dropdown
    fireEvent.change(selectElement, { target: { value: 'option3' } });
    expect(selectElement).toHaveValue('option3');
    expect(mockOnChange).toHaveBeenCalledWith('option3');
  });
});
