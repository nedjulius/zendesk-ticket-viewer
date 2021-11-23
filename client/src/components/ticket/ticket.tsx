import React from 'react';
import {useParams, useNavigate} from 'react-router';
import {Link} from 'react-router-dom';
import {useTicket} from '../../lib/hooks/use-ticket';
import {getDateString} from '../../lib/utils/get-date-string';
import {ErrorMessage} from '../error-message';
import {Loader} from '../loader';
import {StatusTag} from '../status-tag';
import styles from './ticket.module.css';
import testIDs from '../../lib/test-ids';

const UNKNOWN = 'Unknown';

export const Ticket: React.FC = () => {
  const {id} = useParams();
  const {data, isLoading, isError} = useTicket(Number(id));
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const shouldShowBackButton = window.history.state?.idx !== 0;

  const checkValueValidity = (value: unknown): string =>
    value ? String(value) : UNKNOWN;

  if (isError) {
    return <ErrorMessage />;
  }

  if (isLoading) {
    return <Loader />;
  }

  const mapTicketFields = [
    {
      title: 'ID',
      testID: testIDs.TICKET_ROW_ITEM_ID,
      value: data?.id,
    },
    {
      title: 'Subject',
      testID: testIDs.TICKET_ROW_ITEM_SUBJECT,
      value: data?.subject,
    },
    {
      title: 'Description',
      testID: testIDs.TICKET_ROW_ITEM_DESCRIPTION,
      value: data?.description,
    },
    {
      title: 'Created at',
      testID: testIDs.TICKET_ROW_ITEM_CREATED_AT,
      value: null,
      customRender: () =>
        data?.created_at ? getDateString(data.created_at) : UNKNOWN,
    },
    {
      title: 'Status',
      testID: testIDs.TICKET_ROW_ITEM_STATUS_TAG,
      value: null,
      customRender: () =>
        data?.status ? <StatusTag status={data.status} /> : UNKNOWN,
    },
    {
      title: 'Organization ID',
      testID: testIDs.TICKET_ROW_ITEM_ORG_ID,
      value: data?.organization_id,
    },
    {
      title: 'Group ID',
      testID: testIDs.TICKET_ROW_ITEM_GROUP_ID,
      value: data?.group_id,
    },
    {
      title: 'Submitter ID',
      testID: testIDs.TICKET_ROW_ITEM_SUBMITTER_ID,
      value: data?.submitter_id,
    },
    {
      title: 'Assignee ID',
      testID: testIDs.TICKET_ROW_ITEM_ASSIGNEE_ID,
      value: data?.assignee_id,
    },
  ].map(({title, testID, value, customRender}, index) => (
    <div className={styles.row} key={index}>
      <strong>{title}</strong>
      <span data-testid={testID}>
        {customRender ? customRender() : checkValueValidity(value)}
      </span>
    </div>
  ));

  return (
    <>
      {mapTicketFields}
      {shouldShowBackButton ? (
        <button
          onClick={goBack}
          className={styles.goBackButton}
          data-testid={testIDs.TICKET_GO_BACK_BUTTON}
        >
          ← Go back
        </button>
      ) : (
        <Link to="/">
          <button
            className={styles.goBackButton}
            data-testid={testIDs.TICKET_NAVIGATE_HOME_BUTTON}
          >
            Navigate to home
          </button>
        </Link>
      )}
    </>
  );
};
