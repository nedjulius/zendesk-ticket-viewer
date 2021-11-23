import React from 'react';
import {render, screen} from '@testing-library/react';
import {TicketItem} from './ticket-item';
import {getDateString} from '../../../lib/utils/get-date-string';
import {TicketStatus} from '../../../lib/typings';
import testIDs from '../../../lib/test-ids';

jest.mock('react-router-dom', () => ({
  Link: (props: {to: string; children: React.ReactNode}) => (
    <a href={props.to}>{props.children}</a>
  ),
}));

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

    render(<TicketItem {...props} />);

    expect(getByTestId(testIDs.TICKET_ITEM_ID)).toBe(props.id);
    expect(getByTestId(testIDs.TICKET_ITEM_SUBJECT_AND_DATE)).toBe(
      `${props.subject} (${getDateString(props.createdAt)})`
    );
    expect(getByTestId(testIDs.STATUS_TAG)).toBe(TicketStatus.OPEN.toString());
    expect(getByTestId(testIDs.TICKET_ITEM_TAGS)).toBe(tags);
  });
});
