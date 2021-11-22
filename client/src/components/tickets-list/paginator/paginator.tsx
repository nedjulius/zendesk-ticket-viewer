import React from 'react';
import { Link } from 'react-router-dom';
import {PAGE_SIZE} from '../../../lib/constants';
import {PaginatorProps} from './interfaces';
import styles from './paginator.module.css';

export const Paginator: React.FC<PaginatorProps> = ({
  itemCount,
  currentPage,
}) => {
  const pageCount = Math.ceil(itemCount / PAGE_SIZE);

  const mapPages = Array.from(Array(pageCount).keys()).map((_, index) => {
    const pageNumber = index + 1;
    const listItemClassName = `${styles.pagesListItem} ${
      currentPage === pageNumber ? styles.selectedPage : ''
    }`;

    return (
      <Link to={`/?page=${pageNumber}`} key={pageNumber}>
        <li className={listItemClassName}>
            {pageNumber}
        </li>
      </Link>
    );
  });

  return <ul className={styles.pagesList}>{mapPages}</ul>;
};
