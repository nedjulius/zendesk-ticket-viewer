import React from 'react';
import {render, screen} from '@testing-library/react';
import {Paginator} from './paginator';
import testIDs from '../../../lib/test-ids';

const {queryAllByTestId} = screen;

jest.mock('react-router-dom', () => ({
  Link: (props: {to: string; children: React.ReactNode}) => (
    <a href={props.to}>{props.children}</a>
  ),
}));

describe('Paginator', () => {
  it('should render correct amount of page navigation buttons', () => {
    const currentPage = 2;
    const itemCount = 100;

    render(<Paginator currentPage={currentPage} itemCount={itemCount} />);

    const paginatorPages = queryAllByTestId(testIDs.PAGINATOR_PAGE);

    expect(paginatorPages).toHaveLength(4);
    expect(paginatorPages[1]).toHaveClass('selectedPage');
  });

  it('should not have a selected page if current page is out ouf bounds', () => {
    const currentPage = 7;
    const itemCount = 100;

    render(<Paginator currentPage={currentPage} itemCount={itemCount} />);

    queryAllByTestId(testIDs.PAGINATOR_PAGE).forEach((page) => {
      expect(page).not.toHaveClass('selectedPage');
    });
  });
});
