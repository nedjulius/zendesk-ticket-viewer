import React from 'react';
import {render, screen} from '@testing-library/react';
import {TicketItem} from './ticket-item';
import {getDateString} from '../../../lib/utils/get-date-string';
import {TicketStatus} from '../../../lib/typings';
import {BrowserRouter as Router} from 'react-router-dom';
import testIDs from '../../../lib/test-ids';

const {getByTestId} = screen;

describe('TicketItem', () => {
  it('should render with appropriate formatting', () => {
    const tags = 'a, tag';
    const props = {
      id: 1,
      status: TicketStatus.OPEN,
      subject: 'Subject!',
      createdAt: '2010-10-11',
      tags: tags.split(', '),
    };

    render(
      <Router>
        <TicketItem {...props} />
      </Router>
    );

    expect(getByTestId(testIDs.TICKET_ITEM_ID)).toHaveTextContent(
      String(props.id)
    );
    expect(getByTestId(testIDs.TICKET_ITEM_SUBJECT_AND_DATE)).toHaveTextContent(
      `${props.subject} (${getDateString(props.createdAt)})`
    );
    expect(getByTestId(testIDs.STATUS_TAG)).toHaveTextContent(
      TicketStatus.OPEN.toString()
    );
    expect(getByTestId(testIDs.TICKET_ITEM_TAGS)).toHaveTextContent(tags);
  });
});
