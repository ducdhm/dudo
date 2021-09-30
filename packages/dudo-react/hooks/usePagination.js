import { useEffect, useState } from 'react';

const range = (start, end) => Array.from({ length: end - start }, (v, k) => k + start);

const createRange = (start, end, currentPage) => {
    return range(start, end).map(index => ({
        active: index === currentPage,
        page: index,
        goPage: index,
    }));
};

const createFirst = () => [
    {
        active: false,
        page: 1,
        goPage: 1,
    },
    {
        active: false,
        disabled: true,
        text: '...',
    },
];

const createLast = (totalPage) => [
    {
        active: false,
        disabled: true,
        text: '...',
    },
    {
        active: false,
        page: totalPage,
        goPage: totalPage,
    },
];

export default function usePagination({ total, pageSize, pageStep = 2, currentPage }) {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        const totalPage = Math.ceil(total / pageSize) || 0;
        let array = [];

        array.push({
            active: currentPage - 1 <= 0,
            disabled: currentPage - 1 === 0,
            text: 'PREV',
            goPage: currentPage - 1,
        });

        if (totalPage < pageStep * 2 + 6) {
            array = array.concat(
                ...createRange(1, totalPage + 1, currentPage),
            );
        } else if (currentPage < pageStep * 2 + 1) {
            array = array.concat(
                ...createRange(1, pageStep * 2 + 4, currentPage),
            );
            array = array.concat(
                ...createLast(totalPage),
            );
        } else if (currentPage > totalPage - pageStep * 2) {
            array = array.concat(
                ...createFirst(),
            );
            array = array.concat(
                ...createRange(totalPage - pageStep * 2 - 2, totalPage + 1, currentPage),
            );
        } else {
            array = array.concat(
                ...createFirst(),
            );
            array = array.concat(
                ...createRange(currentPage - pageStep, currentPage + pageStep + 1, currentPage),
            );
            array = array.concat(
                ...createLast(totalPage),
            );
        }

        array.push({
            active: currentPage - 1 <= 0,
            disabled: total === 0 || currentPage === totalPage,
            text: 'NEXT',
            goPage: currentPage + 1,
        });

        setPages(array);

    }, [total, pageSize, pageStep, currentPage]);

    return pages;
};
