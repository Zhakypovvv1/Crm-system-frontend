import ReactPaginate from "react-paginate";

interface PaginationProps {
  onChangePage: ({ selected }: { selected: number }) => void;
  pageCount: number;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  onChangePage,
  pageCount = 0,
  currentPage = 1,
}) => {
  console.log(pageCount);
  
  return (
    <div>
      {pageCount > 1 && (
        <ReactPaginate
          // Метка для кнопки "предыдущая страница"
          previousLabel={"<"}
          // Метка для кнопки "следующая страница"
          nextLabel={">"}
          // Метка для разрыва страниц (многоточие)
          breakLabel={"..."}
          // Класс для элемента разрыва страниц
          breakClassName={"break-me"}
          // Общее количество страниц
          pageCount={pageCount}
          // Количество отображаемых страниц с каждой стороны от текущей страницы
          marginPagesDisplayed={1}
          // Количество отображаемых страниц в диапазоне
          pageRangeDisplayed={3}
          // Функция, вызываемая при смене страницы
          onPageChange={onChangePage}
          // Класс для контейнера пагинации
          containerClassName={"pagination"}
          // Класс для элемента страницы
          pageClassName={"page-item"}
          // Класс для ссылки на страницу
          pageLinkClassName={"page-link"}
          // Класс для активной страницы
          activeClassName={"active"}
          // Класс для кнопки "предыдущая страница"
          previousClassName={"previous"}
          // Класс для кнопки "следующая страница"
          nextClassName={"next"}
          // Класс для ссылки на предыдущую страницу
          previousLinkClassName={"page-link"}
          // Класс для ссылки на следующую страницу
          nextLinkClassName={"page-link"}
          // Принудительно установить текущую страницу (начиная с 0)
          forcePage={currentPage - 1}
        />
      )}
    </div>
  );
};

export default Pagination;
