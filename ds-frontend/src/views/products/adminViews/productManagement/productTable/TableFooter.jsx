const TableFooter = () => {
  return (
    <nav
      className="tw-flex tw-items-center tw-justify-between tw-p-4 tw-bg-white"
      aria-label="Table navigation"
    >
      <span className="tw-text-sm tw-font-normal tw-text-gray-500 tw-dark:text-gray-400">
        Showing <span className="tw-font-semibold tw-text-gray-900 tw-dark:text-white">1-10</span>{' '}
        of <span className="tw-font-semibold tw-text-gray-900 ">1000</span>
      </span>
      <ul className="tw-inline-flex tw-items-center tw--space-x-px">
        <li>
          <a
            href="#"
            className="tw-block tw-px-3 tw-py-2 tw-ml-0 tw-leading-tight tw-text-gray-500 tw-bg-white tw-border tw-border-gray-300 tw-rounded-l-lg tw-hover:bg-gray-100 tw-hover:text-gray-700 "
          >
            <span className="tw-sr-only">Previous</span>
            <svg
              className="tw-w-5 tw-h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="tw-px-3 tw-py-2 tw-leading-tight tw-text-gray-500 tw-bg-white tw-border tw-border-gray-300 tw-hover:bg-gray-100 tw-hover:text-gray-700 tw-dark:bg-gray-800 tw-dark:border-gray-700 tw-dark:text-gray-400 tw-dark:hover:bg-gray-700 tw-dark:hover:text-white"
          >
            1
          </a>
        </li>
        <li>
          <a
            href="#"
            className="tw-px-3 tw-py-2 tw-leading-tight tw-text-gray-500 tw-bg-white tw-border tw-border-gray-300 tw-hover:bg-gray-100 tw-hover:text-gray-700 tw-dark:bg-gray-800 tw-dark:border-gray-700 tw-dark:text-gray-400 tw-dark:hover:bg-gray-700 tw-dark:hover:text-white"
          >
            2
          </a>
        </li>
        <li>
          <a
            href="#"
            aria-current="page"
            className="tw-z-10 tw-px-3 tw-py-2 tw-leading-tight tw-text-blue-600 tw-border tw-border-blue-300 tw-bg-blue-50 tw-hover:bg-blue-100 tw-hover:text-blue-700 tw-dark:border-gray-700 tw-dark:bg-gray-700 tw-dark:text-white"
          >
            3
          </a>
        </li>
        <li>
          <a
            href="#"
            className="tw-px-3 tw-py-2 tw-leading-tight tw-text-gray-500 tw-bg-white tw-border tw-border-gray-300 tw-hover:bg-gray-100 tw-hover:text-gray-700 "
          >
            ...
          </a>
        </li>
        <li>
          <a
            href="#"
            className="tw-px-3 tw-py-2 tw-leading-tight tw-text-gray-500 tw-bg-white tw-border tw-border-gray-300 tw-hover:bg-gray-100 tw-hover:text-gray-700 tw-dark:bg-gray-800 tw-dark:border-gray-700 tw-dark:text-gray-400 tw-dark:hover:bg-gray-700 tw-dark:hover:text-white"
          >
            100
          </a>
        </li>
        <li>
          <a
            href="#"
            className="tw-block tw-px-3 tw-py-2 tw-leading-tight tw-text-gray-500 tw-bg-white tw-border tw-border-gray-300 tw-rounded-r-lg tw-hover:bg-gray-100 tw-hover:text-gray-700 tw-dark:bg-gray-800 tw-dark:border-gray-700 tw-dark:text-gray-400 tw-dark:hover:bg-gray-700 tw-dark:hover:text-white"
          >
            <span className="tw-sr-only">Next</span>
            <svg
              className="tw-w-5 tw-h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default TableFooter
