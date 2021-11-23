import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {render, screen, waitFor} from '@testing-library/react';
import {Ticket} from './ticket';
import testIDs from '../../lib/test-ids';
import {getDateString} from '../../lib/utils/get-date-string';
import {GetTicketResponse, TicketStatus} from '../../lib/typings';

const {getByTestId, queryAllByTestId} = screen;

const response = {
  id: 1,
  subject: 'test-subject',
  description: 'test-description',
  created_at: '2020-01-01',
  status: TicketStatus.OPEN,
  organization_id: 1,
  group_id: 2,
  submitter_id: 3,
  assignee_id: 4,
};

const renderIndividualTicketView = () =>
  render(
    <Router>
      <Ticket />
    </Router>
  );

const mockFetch = (
  response: Partial<GetTicketResponse>,
  shouldFail = false
) => {
  (global.fetch as jest.Mock) = jest.fn(() =>
    Promise.resolve({
      json: () =>
        shouldFail ? Promise.reject('Error') : Promise.resolve(response),
    })
  );
};

const pushWindowHistoryId = () => window.history.pushState({idx: 10}, 'state');

const clearWindowHistory = () => window.history.replaceState({}, 'state');

describe('Ticket', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should correctly render server response without any exceptions', async () => {
    mockFetch(response);
    renderIndividualTicketView();

    expect(getByTestId(testIDs.LOADER)).toBeDefined();

    await waitFor(() => {
      expect(getByTestId(testIDs.TICKET_ROW_ITEM_ID)).toHaveTextContent(
        response.id.toString()
      );
      expect(getByTestId(testIDs.TICKET_ROW_ITEM_SUBJECT)).toHaveTextContent(
        response.subject
      );
      expect(
        getByTestId(testIDs.TICKET_ROW_ITEM_DESCRIPTION)
      ).toHaveTextContent(response.description);
      expect(getByTestId(testIDs.TICKET_ROW_ITEM_CREATED_AT)).toHaveTextContent(
        getDateString(response.created_at)
      );
      expect(getByTestId(testIDs.TICKET_ROW_ITEM_STATUS_TAG)).toHaveTextContent(
        response.status
      );
      expect(getByTestId(testIDs.TICKET_ROW_ITEM_ORG_ID)).toHaveTextContent(
        response.organization_id.toString()
      );
      expect(getByTestId(testIDs.TICKET_ROW_ITEM_GROUP_ID)).toHaveTextContent(
        response.group_id.toString()
      );
      expect(
        getByTestId(testIDs.TICKET_ROW_ITEM_SUBMITTER_ID)
      ).toHaveTextContent(response.submitter_id.toString());
      expect(
        getByTestId(testIDs.TICKET_ROW_ITEM_ASSIGNEE_ID)
      ).toHaveTextContent(response.assignee_id.toString());
      expect(getByTestId(testIDs.TICKET_NAVIGATE_HOME_BUTTON)).toBeDefined();
    });
  });

  it('should render error message if server rejects', async () => {
    mockFetch({}, true);
    renderIndividualTicketView();

    expect(getByTestId(testIDs.LOADER)).toBeDefined();

    await waitFor(() => {
      expect(getByTestId(testIDs.ERROR_MESSAGE)).toBeDefined();
    });
  });

  it('should render go back button if window.history contains non-zero id', async () => {
    pushWindowHistoryId();
    mockFetch(response);
    renderIndividualTicketView();

    expect(getByTestId(testIDs.LOADER)).toBeDefined();

    await waitFor(() => {
      expect(getByTestId(testIDs.TICKET_GO_BACK_BUTTON)).toBeDefined();
      expect(
        queryAllByTestId(testIDs.TICKET_NAVIGATE_HOME_BUTTON)
      ).toHaveLength(0);
    });

    clearWindowHistory();
  });

  it('should render defaults for missing values in the response', async () => {
    const UNKNOWN = 'Unknown';

    mockFetch({});
    renderIndividualTicketView();

    expect(getByTestId(testIDs.LOADER)).toBeDefined();

    await waitFor(() => {
      expect(getByTestId(testIDs.TICKET_ROW_ITEM_ID)).toHaveTextContent(
        UNKNOWN
      );
      expect(getByTestId(testIDs.TICKET_ROW_ITEM_SUBJECT)).toHaveTextContent(
        UNKNOWN
      );
      expect(
        getByTestId(testIDs.TICKET_ROW_ITEM_DESCRIPTION)
      ).toHaveTextContent(UNKNOWN);
      expect(getByTestId(testIDs.TICKET_ROW_ITEM_CREATED_AT)).toHaveTextContent(
        UNKNOWN
      );
      expect(getByTestId(testIDs.TICKET_ROW_ITEM_STATUS_TAG)).toHaveTextContent(
        UNKNOWN
      );
      expect(getByTestId(testIDs.TICKET_ROW_ITEM_ORG_ID)).toHaveTextContent(
        UNKNOWN
      );
      expect(getByTestId(testIDs.TICKET_ROW_ITEM_GROUP_ID)).toHaveTextContent(
        UNKNOWN
      );
      expect(
        getByTestId(testIDs.TICKET_ROW_ITEM_SUBMITTER_ID)
      ).toHaveTextContent(UNKNOWN);
      expect(
        getByTestId(testIDs.TICKET_ROW_ITEM_ASSIGNEE_ID)
      ).toHaveTextContent(UNKNOWN);
    });
  });
});
