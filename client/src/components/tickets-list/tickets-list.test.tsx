import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {render, screen, waitFor, fireEvent} from '@testing-library/react';
import {TicketsList} from './tickets-list';
import testIDs from '../../lib/test-ids';
import {Ticket, TicketStatus} from '../../lib/typings';

const {getByTestId, queryAllByTestId} = screen;

const response = {
  tickets: [
    {
      id: 1,
      subject: 'test-subject',
      created_at: '2020-01-01',
      status: TicketStatus.OPEN,
      tags: ['a', 'b', 'c'],
    },
  ],
  count: 1,
};

const renderTicketsListView = () =>
  render(
    <Router>
      <TicketsList />
    </Router>
  );

const mockFetch = (
  response: Partial<{tickets: Partial<Ticket>[]; count: number}>,
  shouldFail = false
) => {
  (global.fetch as jest.Mock) = jest.fn(() =>
    Promise.resolve({
      json: () =>
        shouldFail ? Promise.reject('Error') : Promise.resolve(response),
    })
  );
};

describe('TicketsList', () => {
  beforeEach(() => {
    global.window.scrollTo = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render error message if server fetch throws an error', async () => {
    mockFetch({}, true);
    renderTicketsListView();

    expect(getByTestId(testIDs.LOADER)).toBeDefined();

    await waitFor(() => {
      expect(getByTestId(testIDs.ERROR_MESSAGE)).toBeDefined();
    });
  });

  it('should render tickets list without exceptions', async () => {
    mockFetch(response);
    renderTicketsListView();

    expect(getByTestId(testIDs.LOADER)).toBeDefined();

    await waitFor(() => {
      expect(global.window.scrollTo).toHaveBeenCalledTimes(1);
      expect(queryAllByTestId(testIDs.TICKET_ITEM)).toHaveLength(
        response.tickets.length
      );
      expect(getByTestId(testIDs.TICKETS_LIST_RESULT_TEXT)).toHaveTextContent(
        `Total tickets: ${response.count}, showing: ${response.tickets.length}`
      );
      expect(queryAllByTestId(testIDs.PAGINATOR_PAGE)).toHaveLength(1);
    });
  });

  it('should render empty message if response is empty', async () => {
    mockFetch({tickets: [], count: 0});
    renderTicketsListView();

    expect(getByTestId(testIDs.LOADER)).toBeDefined();

    await waitFor(() => {
      expect(queryAllByTestId(testIDs.TICKETS_LIST_RESULT_TEXT)).toHaveLength(
        0
      );
      expect(queryAllByTestId(testIDs.PAGINATOR_PAGE)).toHaveLength(0);
      expect(getByTestId(testIDs.TICKETS_LIST_EMPTY_MESSAGE)).toBeDefined();
    });
  });

  it('should paginate through results without exceptions', async () => {
    const totalCount = 26;
    const firstPageRes = {
      tickets: Array.from(Array(totalCount).keys()).map((val) => ({
        ...response.tickets[0],
        id: val,
      })),
      count: totalCount,
    };
    const secondPageRes = {tickets: response.tickets, count: totalCount};

    mockFetch(firstPageRes);
    renderTicketsListView();

    expect(getByTestId(testIDs.LOADER)).toBeDefined();

    await waitFor(() => {
      expect(global.window.scrollTo).toHaveBeenCalledTimes(1);
      expect(queryAllByTestId(testIDs.TICKET_ITEM)).toHaveLength(
        firstPageRes.tickets.length
      );
      expect(getByTestId(testIDs.TICKETS_LIST_RESULT_TEXT)).toHaveTextContent(
        `Total tickets: ${totalCount}, showing: ${firstPageRes.tickets.length}`
      );
      expect(queryAllByTestId(testIDs.PAGINATOR_PAGE)).toHaveLength(2);
    });

    mockFetch(secondPageRes);
    fireEvent.click(queryAllByTestId(testIDs.PAGINATOR_PAGE)[1]);

    expect(getByTestId(testIDs.LOADER)).toBeDefined();

    await waitFor(() => {
      expect(global.window.scrollTo).toHaveBeenCalledTimes(2);
      expect(queryAllByTestId(testIDs.TICKET_ITEM)).toHaveLength(
        secondPageRes.tickets.length
      );
      expect(getByTestId(testIDs.TICKETS_LIST_RESULT_TEXT)).toHaveTextContent(
        `Total tickets: ${totalCount}, showing: ${secondPageRes.tickets.length}`
      );
      expect(queryAllByTestId(testIDs.PAGINATOR_PAGE)).toHaveLength(2);
    });
  });
});
