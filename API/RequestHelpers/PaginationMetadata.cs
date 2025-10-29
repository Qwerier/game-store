using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.RequestHelpers
{
    // data meant for client use
    public class PaginationMetadata<T>
    {
        public int RowCount { get; set; }
        public int PageSize { get; set; }
        public int CurrentPage { get; set; }
        public int PageCount { get; set; }


        public PaginationMetadata(IQueryable<T> query, int pageSize, int currentPage)
        {
            RowCount = query.Count();
            PageSize = pageSize;
            CurrentPage = currentPage;
            PageCount = (int)Math.Ceiling(RowCount / (double) PageSize);
        }
    }
}