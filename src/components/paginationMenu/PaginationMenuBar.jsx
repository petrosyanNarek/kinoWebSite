import "./PaginationMenuBar.scss";

export const PaginationMenuBar = ({
  totalPages,
  activePage,
  setActivePage,
}) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <button
            className="page-link pagination-prev-next"
            onClick={() => {
              if (activePage > 1) {
                setActivePage(activePage - 1);
              } else {
                setActivePage(totalPages.length);
              }
            }}
          >
            Previous
          </button>
        </li>
        <li>
          <ul className="paginatino-item">
            {totalPages.map((item, i) => {
              return (
                <li className="page-item" key={i}>
                  <button
                    className="page-link "
                    id={i + 1 === activePage ? "pagination-active" : ""}
                    onClick={() => {
                      setActivePage(i + 1);
                    }}
                  >
                    {i + 1}
                  </button>
                </li>
              );
            })}
          </ul>
        </li>

        <li className="page-item">
          <button
            className="page-link pagination-prev-next"
            onClick={() => {
              if (activePage < totalPages.length) {
                setActivePage(activePage + 1);
              } else {
                setActivePage(1);
              }
            }}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
