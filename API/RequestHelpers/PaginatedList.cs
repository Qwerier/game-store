// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using Microsoft.EntityFrameworkCore;

// namespace API.RequestHelpers
// {
//     // class implementing a Paginated design
//     public class PaginatedList<T> : List<T>
//     {
//         public PaginationMetadata Metadata { get; set; }

//         public PaginatedList(List<T> items, int count, int pageNumber, int pageSize)
//         {
//             Metadata = new PaginationMetadata
//             {
//                 RowCount = count,
//                 PageSize = pageSize,
//                 CurrentPage = pageNumber,
//                 PageCount = (int)Math.Ceiling(count / (double)pageSize)
//             };

//             AddRange(items);
//         }
        
//         public static async Task<PaginatedList<T>> ToPaginatedList(IQueryable<T> query,
//         int pageNumber, int pageSize)
//         {
//             int count = await query.CountAsync();
//             // pageNumber - 1 as pageNumeber is present page while one's we've skipped is one less
//             List<T> items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

//             return new PaginatedList<T>(items, count, pageNumber, pageSize);
//         }
//     }
// }