using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers
{
    // data meant for client use
    public class PaginationMetadata
    {
        public int RowCount { get; set; }
        public int PageSize { get; set; }
        public int CurrentPage { get; set; }
        public int PageCount { get; set; }


        public PaginationMetadata(int rowCount, int pageSize, int currentPage)
        {
            RowCount = rowCount;
            PageSize = pageSize;
            CurrentPage = currentPage;
            PageCount = (int)Math.Ceiling(RowCount / (double) PageSize);
        }
        // public static async Task<PaginationMetadata> CreateAsync(
        //     IQueryable<T> query
        //     , int pageSize
        //     , int currentPage
        // )
        // {
        //     var metadata = new PaginationMetadata<T>
        //     {
        //         RowCount = await query.CountAsync()
        //         ,
        //         PageSize = pageSize
        //         ,
        //         CurrentPage = currentPage
        //     };

        //     metadata.PageCount = (int)Math.Ceiling(metadata.RowCount / (double)metadata.PageSize);

        //     return metadata;
        // }
    }
}