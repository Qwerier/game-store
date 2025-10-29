using System.Text.Json;
using API.Entities;
using API.RequestHelpers;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Net.Http.Headers;

namespace API.Extensions;

public static class RequestExtensions
{
    private static readonly JsonSerializerOptions jsonOptions = new() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
    public static void AddPaginationHeader(this HttpResponse response, PaginationMetadata metadata)
    {
        response.Headers.Append("Pagination", JsonSerializer.Serialize(metadata, jsonOptions));
        // makes it CORS compliant
        response.Headers.Append(HeaderNames.AccessControlExposeHeaders, "Pagination");
    }
}