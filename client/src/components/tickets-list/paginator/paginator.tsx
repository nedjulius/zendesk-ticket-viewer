import React from 'react';
import {Link} from 'react-router-dom';
import {PAGE_SIZE} from '../../../lib/constants';
import {PaginatorProps} from './interfaces';
import styles from './paginator.module.css';
import testIDs from '../../../lib/test-ids';

export const Paginator: React.FC<PaginatorProps> = React.memo(
  ({itemCount, currentPage}) => {
    const pageCount = Math.ceil(itemCount / PAGE_SIZE);

    const mapPages = Array.from(Array(pageCount).keys()).map((_, index) => {
      const pageNumber = index + 1;
      const isSelected = currentPage === pageNumber;
      const listItemClassName = `${styles.pagesListItem} ${
        isSelected ? styles.selectedPage : ''
      }`;

      return (
        <Link to={`/?page=${pageNumber}`} key={pageNumber}>
          <li
            className={listItemClassName}
            data-testid={testIDs.PAGINATOR_PAGE}
          >
            {pageNumber}
          </li>
        </Link>
      );
    });

    return <ul className={styles.pagesList}>{mapPages}</ul>;
  }
);
