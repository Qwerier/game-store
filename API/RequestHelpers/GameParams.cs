namespace API.RequestHelpers;

public class GameParams : PaginationParams
{
    public string? OrderBy { get; set; }

    public string? SearchTerm { get; set; }

    public string? Genres { get; set; }

    public string? Publishers { get; set; }
}