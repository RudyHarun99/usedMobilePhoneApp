import { Button } from '~/components/ui/button';

const style = {
  pagination: "flex gap-1 items-center text-sm justify-end min-h-[36px]",
  pageButton: "mx-1 px-3 py-1 border rounded",
  activePage: "bg-black text-white",
};

type PaginationProps = {
  total: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function PageBar({
  total,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const totalPages = total ? Math.ceil(total / 8) : 1;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={style.pagination}>
      <Button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 0}
        className={style.pageButton}
      >&lt;</Button>
      {
        pages.map((page, idx) => (
          <Button
            key={page}
            onClick={() => setCurrentPage(idx)}
            className={`${style.pageButton} ${
              idx === currentPage ? style.activePage : ''
            }`}
          >
            {page}
          </Button>
        ))
      }
      <Button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className={style.pageButton}
      >&gt;</Button>
    </div>
  );
};
