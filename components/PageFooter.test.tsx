import { render, screen } from '@testing-library/react';
import PageFooter from './PageFooter';

describe('PageFooter', () => {
  it('should render the exchange rates update message', () => {
    render(<PageFooter />);
    
    expect(screen.getByText('Exchange rates are updated hourly')).toBeInTheDocument();
  });

  it('should render copyright notice with current year', () => {
    render(<PageFooter />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Godel Technologies. All rights reserved.`)).toBeInTheDocument();
  });

  it('should not display last updated when timestamp is not provided', () => {
    render(<PageFooter />);
    
    expect(screen.queryByText(/Last updated:/)).not.toBeInTheDocument();
  });

  it('should display last updated when timestamp is provided', () => {
    const timestamp = new Date('2025-01-15T12:00:00Z').getTime();
    render(<PageFooter lastUpdated={timestamp} />);
    
    expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
  });

  it('should display formatted last updated date', () => {
    const timestamp = new Date('2025-01-15T12:00:00Z').getTime();
    render(<PageFooter lastUpdated={timestamp} />);
    
    const formattedDate = new Date(timestamp).toLocaleString();
    expect(screen.getByText(`Last updated: ${formattedDate}`)).toBeInTheDocument();
  });

  it('should have accessible text styling for copyright notice', () => {
    const { container } = render(<PageFooter />);
    
    const currentYear = new Date().getFullYear();
    const copyrightElement = screen.getByText(`© ${currentYear} Godel Technologies. All rights reserved.`);
    
    // Check that the copyright notice is visible
    expect(copyrightElement).toBeVisible();
    
    // Check that it has proper styling classes
    expect(copyrightElement).toHaveClass('mt-4', 'text-gray-500');
  });
});
